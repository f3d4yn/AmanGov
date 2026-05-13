'use client';

import { useState } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import LoadingSpinner from "../components/LoadingSpinner";

interface Vulnerability {
  id: number;
  nom: string;
  severity: string;
  cve_id: string;
  description: string;
  solution: string;
}

interface AnalyseIA {
  analyse: string;
  priorites?: any[];
}

export default function ScannerPage() {
  const [results, setResults] = useState<any>(null);
  const [analyseIA, setAnalyseIA] = useState<AnalyseIA | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const severityColor = (severity: string) => {
    if (severity === "Critique") return { bg: "#fee2e2", text: "#c0392b" };
    if (severity === "Haute") return { bg: "#fef3c7", text: "#d97706" };
    if (severity === "Moyenne") return { bg: "#fef9c3", text: "#b45309" };
    return { bg: "#dcfce7", text: "#166534" };
  };

  const lancerScan = async () => {
    // Réinitialisation complète
    setResults(null);
    setAnalyseIA(null);
    setLoading(true);
    setAnalyzing(false);

    await new Promise(r => setTimeout(r, 2500));

    const res = await fetch('/api/scan/results');
    const data = await res.json();

    setResults(data);
    setLoading(false);

    // Lancer l'analyse IA
    setAnalyzing(true);
    try {
      const aiRes = await fetch('/api/scan/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vulnerabilities: data.vulnerabilities })
      });
      const aiData = await aiRes.json();
      if (aiData.success) setAnalyseIA(aiData.analyseIA);
    } catch (e) {
      console.error(e);
    }
    setAnalyzing(false);
  };

  return (
    <PageLayout title="Module Scanner" currentPath="/scanner">
      <div style={{ padding: "32px" }}>

        <SectionHeader
          title="Scanner de Vulnérabilités"
          badge="Ollama • Analyse IA"
          note="Détection automatique + Priorisation des risques"
        />

        <div className="flex justify-center my-12">
          <button
            onClick={lancerScan}
            disabled={loading}
            style={{
              background: loading ? "#4b5563" : "#1a5c2a",
              color: "white",
              padding: "16px 50px",
              fontSize: "1.25rem",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 6px 20px rgba(26,92,42,0.3)"
            }}
          >
            {loading ? "🔄 Scan en cours..." : "🚀 Lancer le Scan Complet"}
          </button>
        </div>

        {loading && <LoadingSpinner text="Scan en cours..." />}

        {results && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
              <Card topColor="green">
                <p style={{margin:0, fontSize:"0.9rem", color:"#555"}}>TOTAL VULNÉRABILITÉS</p>
                <p style={{fontSize:"3rem", fontWeight:700, color:"#1a5c2a", margin:"8px 0 0"}}>{results.total}</p>
              </Card>
              <Card topColor="gold">
                <p style={{margin:0, fontSize:"0.9rem", color:"#555"}}>CRITIQUES / HAUTES</p>
                <p style={{fontSize:"3rem", fontWeight:700, color:"#c0392b", margin:"8px 0 0"}}>
                  {results.vulnerabilities.filter((v: any) => ["Critique","Haute"].includes(v.severity)).length}
                </p>
              </Card>
            </div>

            <Card topColor="green">
              <SectionHeader title={`Vulnérabilités détectées (${results.total})`} />
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(520px, 1fr))", gap:"20px"}}>
                {results.vulnerabilities.map((v: Vulnerability) => {
                  const color = severityColor(v.severity);
                  return (
                    <div key={v.id} style={{background:"#fff", border:"1px solid #e5e5e5", borderRadius:"12px", padding:"24px"}}>
                      <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:"12px"}}>
                        <h3 style={{margin:0, fontSize:"1.1rem"}}>{v.nom}</h3>
                        <span style={{padding:"4px 14px", borderRadius:"9999px", background:color.bg, color:color.text, fontSize:"0.8rem", fontWeight:600}}>
                          {v.severity}
                        </span>
                      </div>
                      <p style={{color:"#444", lineHeight:1.6}}>{v.description}</p>
                      <p style={{marginTop:"16px", color:"#1a5c2a", fontWeight:600}}>
                        Solution : {v.solution}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card topColor="gold">
              <SectionHeader title="🤖 Analyse IA & Plan de Correction" />
              {analyzing ? (
                <LoadingSpinner text="Ollama analyse les vulnérabilités..." />
              ) : analyseIA ? (
                <div style={{lineHeight:1.7, color:"#333", whiteSpace:"pre-wrap"}}>
                  {analyseIA.analyse}
                </div>
              ) : null}
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  );
}
