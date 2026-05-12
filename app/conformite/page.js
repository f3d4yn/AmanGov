'use client'

import { useEffect, useState } from 'react'
import PageLayout from '@/components/PageLayout'
import { COLORS, scoreColor } from '@/lib/theme'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

function CircularGauge({ score }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const color = scoreColor(score)
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r={radius} fill="none" stroke={COLORS.border} strokeWidth="16" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke={color} strokeWidth="16"
          strokeDasharray={`${progress} ${circumference}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s ease' }} />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '2.8rem', fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: '0.8rem', color: COLORS.hint }}>/100</span>
      </div>
    </div>
  )
}

function AlertBanner({ status, nonConformeCount }) {
  if (status === 'BON') return null
  const isCritique = status === 'CRITIQUE'
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '14px 20px', borderRadius: '12px', marginBottom: '24px',
      backgroundColor: isCritique ? '#fee2e2' : COLORS.gold.bg,
      border: `1px solid ${isCritique ? '#fca5a5' : COLORS.gold.border}`,
      color: isCritique ? '#991b1b' : COLORS.gold.dark,
      fontWeight: 600, fontSize: '0.95rem',
    }}>
      <span style={{ fontSize: '1.4rem' }}>{isCritique ? '🔴' : '🟡'}</span>
      <span>
        {isCritique
          ? `Score critique — ${nonConformeCount} contrôles non conformes. Action immédiate requise.`
          : `Score moyen — ${nonConformeCount} contrôles à corriger pour atteindre la conformité.`}
      </span>
    </div>
  )
}

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      backgroundColor: COLORS.white, borderRadius: '14px', padding: '20px',
      border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${color}`,
      display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <span style={{ fontSize: '1.8rem', fontWeight: 800, color }}>{value}</span>
      <span style={{ fontSize: '0.8rem', color: COLORS.muted }}>{label}</span>
    </div>
  )
}

export default function ConformitePage() {
  const [score, setScore] = useState(null)
  const [controls, setControls] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [predicting, setPredicting] = useState(false)
  const [filter, setFilter] = useState('tous')

  const history = [
    { month: 'Déc', score: 45 }, { month: 'Jan', score: 48 },
    { month: 'Fév', score: 52 }, { month: 'Mar', score: 55 },
    { month: 'Avr', score: 56 }, { month: 'Mai', score: 58 },
  ]
  const radarData = [
    { axis: 'Gouvernance', value: 70 }, { axis: 'Protection', value: 55 },
    { axis: 'Détection', value: 60 },  { axis: 'Réponse', value: 45 },
    { axis: 'Récupération', value: 50 }, { axis: 'Conformité', value: 58 },
  ]

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    try {
      const [scoreRes, controlsRes] = await Promise.all([
        fetch('/api/compliance/score'),
        fetch('/api/compliance/controls')
      ])
      setScore(await scoreRes.json())
      setControls((await controlsRes.json()).controls)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  async function runPrediction() {
    setPredicting(true)
    try {
      const res = await fetch('/api/compliance/predict', { method: 'POST' })
      setPrediction(await res.json())
    } catch (err) { console.error(err) }
    finally { setPredicting(false) }
  }

  const filteredControls = controls.filter(c =>
    filter === 'tous' ? true : c.status === filter
  )
  const statusColor = score ? scoreColor(score.score) : COLORS.green.main
  const statusLabel = score?.status || '...'

  if (loading) return (
    <PageLayout title="Conformité DGSSI / CNDP" currentPath="/conformite">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <div style={{ color: COLORS.green.main, fontSize: '1.1rem', fontWeight: 600 }}>
          Chargement du module conformité...
        </div>
      </div>
    </PageLayout>
  )

  return (
    <PageLayout title="Conformité DGSSI / CNDP" currentPath="/conformite">
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: COLORS.green.main, margin: 0 }}>
              🛡️ Conformité DGSSI / CNDP
            </h1>
            <p style={{ color: COLORS.muted, marginTop: '4px', fontSize: '0.9rem' }}>
              Évaluation en temps réel · Administration DGI · ISO 27001
            </p>
          </div>
          <button onClick={() => window.print()} data-print="hide" style={{
            backgroundColor: COLORS.gold.main, color: '#fff', border: 'none',
            borderRadius: '10px', padding: '10px 20px', fontWeight: 700,
            cursor: 'pointer', fontSize: '0.9rem',
          }}>
            📄 Exporter rapport
          </button>
        </div>

        <AlertBanner status={statusLabel} nonConformeCount={score?.non_conforme_count} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <StatCard icon="📊" label="Score global" value={`${score?.score}/100`} color={statusColor} />
          <StatCard icon="✅" label="Contrôles conformes" value={score?.total_controls - score?.non_conforme_count} color={COLORS.green.main} />
          <StatCard icon="❌" label="Non conformes" value={score?.non_conforme_count} color="#ef4444" />
          <StatCard icon="🏆" label="Classement national" value="Top 30%" color={COLORS.gold.main} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '28px', border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.green.main}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ color: COLORS.green.main, fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>Score de Conformité</h2>
            <CircularGauge score={score?.score} />
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: statusColor, marginTop: '12px' }}>{statusLabel}</span>
            <p style={{ color: COLORS.hint, fontSize: '0.82rem', marginTop: '4px' }}>{score?.non_conforme_count} non conformes sur {score?.total_controls} contrôles</p>
          </div>

          <div style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '28px', border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.gold.main}` }}>
            <h2 style={{ color: COLORS.green.main, fontWeight: 700, marginBottom: '20px', fontSize: '1rem' }}>📊 Benchmarking National</h2>
            {[
              { label: 'Votre administration', value: score?.score, color: COLORS.green.main },
              { label: 'Moyenne nationale', value: 52, color: COLORS.hint },
              { label: 'Top administrations', value: 80, color: COLORS.gold.main },
            ].map((b, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ color: b.color, fontWeight: 600 }}>{b.label}</span>
                  <span style={{ fontWeight: 700, color: COLORS.text }}>{b.value}%</span>
                </div>
                <div style={{ backgroundColor: COLORS.border, borderRadius: '99px', height: '10px' }}>
                  <div style={{ width: `${b.value}%`, height: '10px', borderRadius: '99px', backgroundColor: b.color, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: '16px', backgroundColor: COLORS.green.light, border: `1px solid ${COLORS.green.main}30`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: COLORS.green.main }}>Top 30%</div>
              <div style={{ fontSize: '0.78rem', color: COLORS.muted }}>des administrations marocaines</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '24px', border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.green.main}` }}>
            <h2 style={{ color: COLORS.green.main, fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>📈 Historique 6 mois</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="month" stroke={COLORS.hint} fontSize={12} />
                <YAxis domain={[0, 100]} stroke={COLORS.hint} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: '8px' }} />
                <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Seuil critique', fill: '#ef4444', fontSize: 10 }} />
                <Line type="monotone" dataKey="score" stroke={COLORS.green.main} strokeWidth={3} dot={{ fill: COLORS.gold.main, r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '24px', border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.gold.main}` }}>
            <h2 style={{ color: COLORS.green.main, fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>🕸️ Radar Conformité</h2>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={COLORS.border} />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: COLORS.muted }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar dataKey="value" stroke={COLORS.green.main} fill={COLORS.green.main} fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '24px', border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.green.main}`, marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ color: COLORS.green.main, fontWeight: 700, fontSize: '1rem', margin: 0 }}>🛡️ Contrôles DGSSI</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['tous', 'conforme', 'non_conforme'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600,
                  cursor: 'pointer', border: 'none',
                  backgroundColor: filter === f ? COLORS.green.main : COLORS.green.light,
                  color: filter === f ? '#fff' : COLORS.green.main, transition: 'all 0.2s'
                }}>
                  {f === 'tous' ? 'Tous' : f === 'conforme' ? '✅ Conformes' : '❌ Non conformes'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
            {filteredControls.map(control => (
              <div key={control.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderRadius: '12px',
                backgroundColor: control.status === 'conforme' ? COLORS.green.light : '#fee2e2',
                border: `1px solid ${control.status === 'conforme' ? COLORS.green.main + '40' : '#fca5a580'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{control.status === 'conforme' ? '✅' : '❌'}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.88rem', color: COLORS.text, margin: 0 }}>{control.name}</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.hint, margin: 0 }}>{control.domain} · Poids: {control.weight}</p>
                  </div>
                </div>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
                  backgroundColor: control.status === 'conforme' ? COLORS.green.main : '#ef4444',
                  color: '#fff', whiteSpace: 'nowrap'
                }}>
                  {control.status === 'conforme' ? 'CONFORME' : 'NON CONFORME'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '24px', border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.gold.main}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: COLORS.green.main, fontWeight: 700, fontSize: '1rem', margin: 0 }}>🤖 Prédiction IA — qwen3:1.7b</h2>
            <button onClick={runPrediction} disabled={predicting} style={{
              backgroundColor: predicting ? COLORS.hint : COLORS.gold.main,
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '10px 20px', fontWeight: 700,
              cursor: predicting ? 'not-allowed' : 'pointer', fontSize: '0.88rem',
            }}>
              {predicting ? '⏳ Analyse en cours...' : '🚀 Lancer prédiction'}
            </button>
          </div>
          {prediction ? (
            <div style={{
              padding: '20px', borderRadius: '12px',
              backgroundColor: prediction.risque === 'HIGH' ? '#fee2e2' : prediction.risque === 'MEDIUM' ? COLORS.gold.bg : COLORS.green.light,
              border: `1px solid ${prediction.risque === 'HIGH' ? '#fca5a5' : prediction.risque === 'MEDIUM' ? COLORS.gold.border : COLORS.green.main + '40'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.6rem' }}>{prediction.risque === 'HIGH' ? '🔴' : prediction.risque === 'MEDIUM' ? '🟡' : '🟢'}</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: prediction.risque === 'HIGH' ? '#991b1b' : prediction.risque === 'MEDIUM' ? COLORS.gold.dark : COLORS.green.main }}>
                  Risque {prediction.risque}
                </span>
                {prediction.source === 'local' && (
                  <span style={{ fontSize: '0.72rem', backgroundColor: COLORS.border, color: COLORS.muted, padding: '2px 8px', borderRadius: '99px' }}>Mode hors-ligne</span>
                )}
              </div>
              <p style={{ color: COLORS.text, marginBottom: '12px', fontSize: '0.92rem' }}>{prediction.prediction}</p>
              {prediction.recommandations && (
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 700, color: COLORS.muted, marginBottom: '8px' }}>Recommandations :</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {prediction.recommandations.map((r, i) => (
                      <li key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', color: COLORS.text }}>
                        <span style={{ color: COLORS.gold.main, fontWeight: 700 }}>→</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: COLORS.hint, fontSize: '0.9rem' }}>
              Cliquez sur "Lancer prédiction" pour analyser les risques avec l'IA locale
            </div>
          )}
        </div>

      </div>
    </PageLayout>
  )
}
