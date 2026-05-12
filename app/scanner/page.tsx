'use client';
import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS, SEVERITY } from '../lib/theme';

export default function ScannerPage() {
  const [results, setResults] = useState(null);
  const [analyseIA, setAnalyseIA] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const lancerScan = async () => {
    setLoading(true);
    setResults(null);
    setAnalyseIA(null);

    await new Promise(resolve => setTimeout(resolve, 2500));

    const res = await fetch('/api/scan/results');
    const data = await res.json();
    
    setResults(data);
    setLoading(false);

    analyserAvecIA(data.vulnerabilities);
  };

  const analyserAvecIA = async (vulnerabilities) => {
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
    }
    setAnalyzing(false);
  };

  return (
    <PageLayout title="Module Scanner" currentPath="/scanner">
      <div style={{ padding: '32px' }}>
        <SectionHeader 
          title="Scanner de Vulnérabilités" 
          badge="15 Vulnérabilités" 
          note="Ollama • Temps réel" 
        />

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Button 
            variant="primary" 
            onClick={lancerScan} 
            disabled={loading}
          >
            {loading ? "🔄 Scan en cours..." : "🚀 Lancer le Scan Complet"}
          </Button>
        </div>

        {loading && <LoadingSpinner text="Analyse des systèmes en cours..." />}

        {results && (
          <div>
            <SectionHeader title={`Vulnérabilités détectées (${results.total})`} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px' }}>
              {results.vulnerabilities.map((vuln) => (
                <Card key={vuln.id} topColor={vuln.severity === 'Critique' ? 'gold' : 'green'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{vuln.nom}</h3>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '3px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      background: vuln.severity === 'Critique' ? '#fee2e2' : '#fef9c3',
                      color: vuln.severity === 'Critique' ? '#991b1b' : '#854d0e'
                    }}>
                      {vuln.severity}
                    </span>
                  </div>
                  <p style={{ color: '#555', lineHeight: '1.6' }}>{vuln.description}</p>
                  <p style={{ marginTop: '16px', color: '#1a5c2a', fontWeight: '600' }}>
                    Solution : {vuln.solution}
                  </p>
                </Card>
              ))}
            </div>

            {analyseIA && (
              <Card topColor="gold" style={{ marginTop: '40px' }}>
                <SectionHeader title="🤖 Analyse IA & Plan de Correction" />
                <div style={{ padding: '20px', background: '#f8f9f8', borderRadius: '4px' }}>
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
