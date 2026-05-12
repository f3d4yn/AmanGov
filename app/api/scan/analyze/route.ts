export async function POST(request: Request) {
  try {
    const { vulnerabilities } = await request.json();

    // Réduire les données envoyées à Ollama — seulement l'essentiel
    const vulnResume = vulnerabilities.slice(0, 8).map((v: {nom?: string; name?: string; severity?: string; cve_id?: string}) => ({
      nom: v.nom || v.name,
      severity: v.severity,
      cve: v.cve_id
    }));

    const prompt = `Tu es expert cybersécurité. Analyse ces vulnérabilités en JSON uniquement, sans texte avant ou après.
Format strict :
{"analyse":"résumé court","priorites":[{"niveau":"Critique","actions":["action1"]}],"recommandations_globales":["rec1"]}
Vulnérabilités: ${JSON.stringify(vulnResume)}`;

    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "qwen3:1.7b",
        prompt,
        stream: false,
        temperature: 0.3,
        options: {
          num_predict: 400,
          top_p: 0.8
        }
      })
    });

    const data = await ollamaRes.json();
    let analyseIA;
    try {
      const jsonMatch = data.response.match(/\{[\s\S]*\}/);
      analyseIA = jsonMatch ? JSON.parse(jsonMatch[0]) : { analyse: data.response };
    } catch {
      analyseIA = { analyse: data.response, priorites: [], recommandations_globales: [] };
    }
    return Response.json({ success: true, analyseIA });
  } catch (error) {
    console.error(error);
    return Response.json({ 
      success: false, 
      error: "Erreur lors de l'analyse avec Ollama" 
    }, { status: 500 });
  }
}
