'use client'
import { useState } from 'react'

const controles = [
  { id: 1, nom: 'Mots de passe forts', statut: 'conforme', poids: 3, domaine: 'Authentification' },
  { id: 2, nom: 'Chiffrement des données', statut: 'conforme', poids: 3, domaine: 'Protection' },
  { id: 3, nom: 'Sauvegardes régulières', statut: 'non_conforme', poids: 2, domaine: 'Continuité' },
  { id: 4, nom: 'Journalisation', statut: 'conforme', poids: 2, domaine: 'Détection' },
  { id: 5, nom: 'Contrôle des accès', statut: 'non_conforme', poids: 3, domaine: 'Authentification' },
  { id: 6, nom: 'Mises à jour système', statut: 'conforme', poids: 2, domaine: 'Protection' },
  { id: 7, nom: 'Firewall actif', statut: 'conforme', poids: 3, domaine: 'Protection' },
  { id: 8, nom: 'Antivirus', statut: 'conforme', poids: 2, domaine: 'Protection' },
  { id: 9, nom: 'Test de backup', statut: 'non_conforme', poids: 2, domaine: 'Continuité' },
  { id: 10, nom: 'Politique de sécurité', statut: 'conforme', poids: 1, domaine: 'Gouvernance' },
  { id: 11, nom: 'Formation des agents', statut: 'non_conforme', poids: 2, domaine: 'Gouvernance' },
  { id: 12, nom: 'Audit de sécurité', statut: 'conforme', poids: 3, domaine: 'Gouvernance' },
]

const historique = [
  { mois: 'Déc', score: 44 },
  { mois: 'Jan', score: 48 },
  { mois: 'Fév', score: 51 },
  { mois: 'Mar', score: 55 },
  { mois: 'Avr', score: 56 },
  { mois: 'Mai', score: 58 },
]

const recommandationsIA = [
  'Mettre en place des sauvegardes automatiques quotidiennes (domaine Continuité)',
  "Implémenter le contrôle d'accès par rôle (RBAC) pour les agents",
  'Planifier une session de formation obligatoire pour tous les agents',
  'Tester les backups mensuellement avec un rapport de vérification',
]

export default function ConformitePage() {
  const [showReco, setShowReco] = useState(false)
  const [filtre, setFiltre] = useState('Tous')

  const total = controles.reduce((acc, c) => acc + c.poids, 0)
  const score = Math.round(
    (controles.filter(c => c.statut === 'conforme').reduce((acc, c) => acc + c.poids, 0) / total) * 100
  )
  const scoreColor = score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreMsg = score >= 70 ? '✅ Bon niveau' : score >= 50 ? '⚠️ À améliorer' : '🔴 Critique'
  const nonConformes = controles.filter(c => c.statut === 'non_conforme').length

  const domaines = ['Tous', ...new Set(controles.map(c => c.domaine))]
  const filtres = filtre === 'Tous' ? controles : controles.filter(c => c.domaine === filtre)

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-green-400 mb-2">Conformité DGSSI</h1>
      <p className="text-slate-400 mb-8">Évaluation des 12 contrôles de sécurité — DGI Maroc</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl p-8 text-center col-span-1">
          <div className={`text-7xl font-bold ${scoreColor}`}>{score}%</div>
          <div className="text-slate-400 mt-2 text-lg">{scoreMsg}</div>
          <div className="text-slate-500 text-sm mt-1">{nonConformes} contrôle(s) non conforme(s)</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 col-span-1">
          <h3 className="text-slate-400 text-sm mb-4 font-semibold uppercase tracking-wider">Benchmark</h3>
          {[
            { label: 'Votre administration', val: score, color: scoreColor },
            { label: 'Moyenne nationale', val: 52, color: 'text-blue-400' },
            { label: 'Top 30%', val: 70, color: 'text-green-400' },
          ].map(b => (
            <div key={b.label} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-slate-400">{b.label}</span>
                <span className={`font-bold ${b.color}`}>{b.val}%</span>
              </div>
              <div className="bg-slate-700 rounded-full h-2">
                <div className={`h-2 rounded-full bg-current ${b.color}`} style={{ width: `${b.val}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl p-6 col-span-1">
          <h3 className="text-slate-400 text-sm mb-4 font-semibold uppercase tracking-wider">Historique 6 mois</h3>
          <div className="flex items-end gap-2 h-24">
            {historique.map(h => (
              <div key={h.mois} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-600 rounded-t" style={{ height: `${h.score}%` }}></div>
                <span className="text-slate-500 text-xs">{h.mois}</span>
              </div>
            ))}
          </div>
          <p className="text-green-400 text-xs mt-3 text-center">↗ +14 points en 6 mois</p>
        </div>
      </div>

      {score < 70 && (
        <div className="bg-orange-900/30 border border-orange-500/50 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-orange-400 text-2xl">⚠️</span>
          <div>
            <p className="text-orange-400 font-semibold">Prédiction : score à risque</p>
            <p className="text-slate-400 text-sm">Sans action, le score pourrait descendre de 15 points dans 30 jours.</p>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-4">
        {domaines.map(d => (
          <button key={d} onClick={() => setFiltre(d)}
            className={`px-3 py-1 rounded-lg text-sm transition ${filtre === d ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
            {d}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Contrôles de sécurité</h2>
      <div className="grid gap-3 mb-8">
        {filtres.map(c => (
          <div key={c.id} className={`bg-slate-800 rounded-xl p-4 flex items-center justify-between border-l-4 ${c.statut === 'conforme' ? 'border-l-green-500' : 'border-l-red-500'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-xl ${c.statut === 'conforme' ? 'text-green-400' : 'text-red-400'}`}>
                {c.statut === 'conforme' ? '✓' : '✗'}
              </span>
              <div>
                <p className="font-medium">{c.nom}</p>
                <p className="text-slate-400 text-sm">{c.domaine} · Poids : {c.poids}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${c.statut === 'conforme' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
              {c.statut === 'conforme' ? 'Conforme' : 'Non conforme'}
            </span>
          </div>
        ))}
      </div>

      <button onClick={() => setShowReco(!showReco)}
        className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-lg font-semibold transition mb-4">
        🤖 Recommandations IA
      </button>
      {showReco && (
        <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-purple-400 font-semibold mb-3">Plan d'action recommandé</h3>
          <ol className="space-y-2">
            {recommandationsIA.map((r, i) => (
              <li key={i} className="text-slate-300 text-sm flex gap-2">
                <span className="text-purple-400 font-bold">{i + 1}.</span> {r}
              </li>
            ))}
          </ol>
        </div>
      )}
    </main>
  )
}