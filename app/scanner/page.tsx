'use client';
import { useState } from 'react';

export default function ScannerPage() {
  const [results, setResults] = useState<any>(null);
  const [analyseIA, setAnalyseIA] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const severityColors: any = {
    Critique: 'bg-red-600 text-white',
    Haute: 'bg-orange-600 text-white',
    Moyenne: 'bg-yellow-600 text-black',
    Faible: 'bg-green-600 text-white',
  };

  const lancerScan = async () => {
    setLoading(true);
    setResults(null);
    setAnalyseIA(null);

    // Simulation de scan
    await new Promise(resolve => setTimeout(resolve, 3000));

    const res = await fetch('/api/scan/results');
    const data = await res.json();
    
    setResults(data);
    setLoading(false);

    analyserAvecIA(data.vulnerabilities);
  };

  const analyserAvecIA = async (vulnerabilities: any[]) => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/scan/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vulnerabilities })
      });

      const data = await res.json();
      if (data.success) {
        setAnalyseIA(data.analyseIA);
      }
    } catch (error) {
      console.error(error);
    }
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">🔍 Module Scanner de Sécurité</h1>
        <p className="text-center text-gray-400 mb-12 text-xl">Détection automatique + Analyse IA Ollama</p>

        <div className="flex justify-center mb-12">
          <button
            onClick={lancerScan}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 px-12 py-5 rounded-2xl text-2xl font-semibold transition-all flex items-center gap-3"
          >
            {loading ? "🔄 Analyse en cours..." : "🚀 Lancer le Scan Complet"}
          </button>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-6 text-xl">Scan du système en cours...</p>
          </div>
        )}

        {results && (
          <div className="space-y-12">
            {/* Vulnérabilités */}
            <div>
              <h2 className="text-3xl font-semibold mb-8">Vulnérabilités détectées ({results.total})</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {results.vulnerabilities.map((vuln: any) => (
                  <div key={vuln.id} className="bg-gray-900 p-7 rounded-3xl border border-gray-700 hover:border-gray-600 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-xl">{vuln.nom}</h3>
                      <span className={`px-5 py-1.5 rounded-full text-sm font-medium ${severityColors[vuln.severity]}`}>
                        {vuln.severity}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{vuln.description}</p>
                    <p className="text-emerald-400 text-sm"><strong>Solution :</strong> {vuln.solution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analyse IA */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-10">
              <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
                🤖 Analyse IA & Plan de Correction
                {analyzing && <span className="text-blue-400">(en cours...)</span>}
              </h2>
              
              {analyseIA && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">{analyseIA.analyse}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
