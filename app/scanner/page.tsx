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
    // Réinitialisation complète pour nouveau scan
    setResults(null);
    setAnalyseIA(null);
    setLoading(true);
    setAnalyzing(false);

    await new Promise(resolve => setTimeout(resolve, 2500));

    const res = await fetch('/api/scan/results');
    const data = await res.json();

    setResults(data);
    setLoading(false);

    analyserAvecIA(data.vulnerabilities);
  };

  const analyserAvecIA = async (vulnerabilities: Vulnerability[]) => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/scan/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vulnerabilities })
      });
      const data = await res.json();
      if (data.success) setAnalyseIA(data.analyseIA);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <PageLayout title="Module Scanner" currentPath="/scanner">
      <div style={{ padding: "32px" }}>
        <SectionHeader
          title="Scanner de Vulnérabilités"
          badge="Ollama • Analyse IA"
          note="Détection automatique + Priorisation des risques"
        />

        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button
            onClick={lancerScan}
            disabled={loading}
            style={{
              background: loading ? "#666" : "#1a5c2a",
              color: "white",
              padding: "16px 50px",
              fontSize: "1.2rem",
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

        {loading && <LoadingSpinner text="Analyse des systèmes en cours..." />}

        {results && (
          <div>
            <SectionHeader title={`Vulnérabilités détectées (${results.total})`} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px' }}>
              {results.vulnerabilities.map((vuln: Vulnerability) => {
                const color = severityColor(vuln.severity);
                return (
                  <Card key={vuln.id} topColor={vuln.severity === 'Critique' ? 'gold' : 'green'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px' }}>{vuln.nom}</h3>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '3px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        background: color.bg,
                        color: color.text
                      }}>
                        {vuln.severity}
                      </span>
                    </div>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>{vuln.description}</p>
                    <p style={{ marginTop: '16px', color: '#1a5c2a', fontWeight: '600' }}>
                      Solution : {vuln.solution}
                    </p>
                  </Card>
                );
              })}
            </div>

            {analyseIA && (
              <Card topColor="gold" style={{ marginTop: '40px' }}>
                <SectionHeader title="🤖 Analyse IA & Plan de Correction" />
                <div style={{ padding: '20px', background: '#f8f9f8', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                  {analyseIA.analyse}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
