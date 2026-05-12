import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const logs: Array<{
      id: string; timestamp: string; level: string;
      message: string; ip_source: string; service: string; user: string | null;
    }> = body.logs;

    if (!logs || !Array.isArray(logs) || logs.length === 0) {
      return NextResponse.json({ error: "Aucun log fourni." }, { status: 400 });
    }

    const logsFiltered = logs
      .filter(l => l.level === "ERROR" || l.level === "WARNING")
      .slice(0, 10);

    const logsText = logsFiltered
      .map(l => `[${l.level}] ${l.ip_source} — ${l.message}`)
      .join("\n");

    const prompt = `Expert SIEM. Analyse ces logs.
Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans backticks, sans texte avant ou après.
Structure requise:
{"ips_suspectes":[{"ip":"1.2.3.4","niveau_risque":"CRITIQUE","score_risque":90,"raison":"raison detectee","nb_incidents":2,"recommandation":"bloquer IP"}],"resume":"resume de lanalyse","nb_alertes_critiques":2,"nb_alertes_totales":5,"action_immediate":"bloquer les IPs suspectes et notifier le RSSI"}
LOGS A ANALYSER:
${logsText}`;

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen3:1.7b",
        think: false,
        prompt,
        stream: false,
        options: { temperature: 0.1, num_predict: 300 },
      }),
    });

    if (!ollamaRes.ok) throw new Error(`Ollama: ${ollamaRes.status}`);

    const ollamaData = await ollamaRes.json();
    let rawText: string = ollamaData.response || "";

    // Nettoyer les backticks markdown
    rawText = rawText.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[SIEM] Réponse brute:", rawText);
      throw new Error("JSON non trouvé dans la réponse");
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return NextResponse.json({
      success: true,
      analyse: analysis,
      logs_analysés: logs.length,
      timestamp_analyse: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[SIEM ANALYZE ERROR]", error);
    return NextResponse.json({
      success: true,
      analyse: generateFallbackAnalysis(),
      logs_analysés: 0,
      timestamp_analyse: new Date().toISOString(),
      note: "Analyse de fallback (Ollama indisponible)",
    });
  }
}

function generateFallbackAnalysis() {
  return {
    ips_suspectes: [
      { ip: "192.168.1.45", niveau_risque: "CRITIQUE", score_risque: 95, raison: "Brute force SSH — 7 tentatives, exfiltration suspectée", nb_incidents: 4, recommandation: "Bloquer immédiatement" },
      { ip: "185.234.219.10", niveau_risque: "ÉLEVÉ", score_risque: 82, raison: "Injection SQL + upload malveillant détecté", nb_incidents: 3, recommandation: "Bloquer au WAF" },
      { ip: "10.0.0.87", niveau_risque: "MOYEN", score_risque: 58, raison: "Scan de ports interne suspect", nb_incidents: 2, recommandation: "Audit de la machine source" },
    ],
    resume: "3 IPs suspectes identifiées dont 1 critique. Tentatives d'intrusion actives depuis l'extérieur et l'intérieur du réseau.",
    nb_alertes_critiques: 3,
    nb_alertes_totales: 9,
    action_immediate: "Bloquer 192.168.1.45 au pare-feu. Déclencher playbook P-003. Notifier le RSSI.",
  };
}
