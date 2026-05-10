'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

// Circular gauge component
function CircularGauge({ score }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = score >= 70 ? '#38a169' : score >= 50 ? '#d69e2e' : '#e53e3e';

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="200" height="200" className="transform -rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none"
          stroke="#2d3748" strokeWidth="16" />
        <circle cx="100" cy="100" r={radius} fill="none"
          stroke={color} strokeWidth="16"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold text-white">{score}</span>
        <span className="text-gray-400 text-sm">/ 100</span>
      </div>
    </div>
  );
}

export default function ConformitePage() {
  const [score, setScore] = useState(null);
  const [controls, setControls] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [benchmark, setBenchmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [scoreRes, controlsRes] = await Promise.all([
        fetch('/api/compliance/score'),
        fetch('/api/compliance/controls')
      ]);
      const scoreData = await scoreRes.json();
      const controlsData = await controlsRes.json();

      setScore(scoreData);
      setControls(controlsData.controls);

      // Mock history + benchmark from JSON
      setHistory([
        { month: 'Déc', score: 45 },
        { month: 'Jan', score: 48 },
        { month: 'Fév', score: 52 },
        { month: 'Mar', score: 55 },
        { month: 'Avr', score: 56 },
        { month: 'Mai', score: scoreData.score }
      ]);

      setBenchmark({ your_admin: scoreData.score, national_average: 52, percentile: 'Top 30%' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function runPrediction() {
    setPredicting(true);
    try {
      const res = await fetch('/api/compliance/predict', { method: 'POST' });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
    } finally {
      setPredicting(false);
    }
  }

  function exportPDF() {
    window.print();
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Chargement du module conformité...</div>
    </div>
  );

  const statusColor = score?.status === 'BON' ? 'text-green-400' :
    score?.status === 'MOYEN' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Module Conformité DGSSI</h1>
            <p className="text-gray-400 mt-1">Évaluation en temps réel — Administration DGI</p>
          </div>
          <button onClick={exportPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
            📄 Exporter rapport
          </button>
        </div>

        {/* Top row: Gauge + Benchmark */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Gauge */}
          <div className="bg-slate-800 rounded-2xl p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Score de Conformité</h2>
            <div className="relative flex items-center justify-center">
              <CircularGauge score={score?.score} />
            </div>
            <span className={`text-xl font-bold mt-2 ${statusColor}`}>{score?.status}</span>
            <p className="text-gray-400 text-sm mt-1">{score?.non_conforme_count} contrôles non conformes sur {score?.total_controls}</p>
          </div>

          {/* Benchmark */}
          <div className="bg-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">📊 Benchmarking National</h2>
            {benchmark && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-400 font-medium">Votre administration</span>
                    <span className="text-white font-bold">{benchmark.your_admin}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${benchmark.your_admin}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Moyenne nationale</span>
                    <span className="text-white font-bold">{benchmark.national_average}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-gray-500 h-3 rounded-full"
                      style={{ width: `${benchmark.national_average}%` }} />
                  </div>
                </div>
                <div className="mt-4 bg-blue-900/40 border border-blue-500/30 rounded-xl p-3 text-center">
                  <span className="text-blue-300 font-bold text-lg">{benchmark.percentile}</span>
                  <p className="text-gray-400 text-xs mt-1">des administrations marocaines</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History Chart */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">📈 Historique 6 mois</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis domain={[0, 100]} stroke="#718096" />
              <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }} />
              <ReferenceLine y={50} stroke="#e53e3e" strokeDasharray="4 4" label={{ value: 'Seuil critique', fill: '#e53e3e', fontSize: 11 }} />
              <Line type="monotone" dataKey="score" stroke="#3182ce"
                strokeWidth={3} dot={{ fill: '#3182ce', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Controls List */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">🛡️ Contrôles DGSSI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {controls.map(control => (
              <div key={control.id}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  control.status === 'conforme'
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-red-900/20 border-red-500/30'
                }`}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{control.status === 'conforme' ? '✅' : '❌'}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{control.name}</p>
                    <p className="text-gray-400 text-xs">{control.domain} · Poids: {control.weight}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  control.status === 'conforme'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {control.status === 'conforme' ? 'CONFORME' : 'NON CONFORME'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-300">🤖 Prédiction IA</h2>
            <button onClick={runPrediction} disabled={predicting}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              {predicting ? 'Analyse en cours...' : 'Lancer prédiction'}
            </button>
          </div>

          {prediction ? (
            <div className={`p-4 rounded-xl border ${
              prediction.risque === 'HIGH'
                ? 'bg-red-900/30 border-red-500/40'
                : prediction.risque === 'MEDIUM'
                ? 'bg-yellow-900/30 border-yellow-500/40'
                : 'bg-green-900/30 border-green-500/40'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">
                  {prediction.risque === 'HIGH' ? '🔴' : prediction.risque === 'MEDIUM' ? '🟡' : '🟢'}
                </span>
                <span className={`font-bold text-lg ${
                  prediction.risque === 'HIGH' ? 'text-red-400' :
                  prediction.risque === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
                }`}>Risque {prediction.risque}</span>
              </div>
              <p className="text-white mb-3">{prediction.prediction}</p>
              {prediction.recommandations && (
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-2">Recommandations :</p>
                  <ul className="space-y-1">
                    {prediction.recommandations.map((r, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">→</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Cliquez sur "Lancer prédiction" pour analyser les risques
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
