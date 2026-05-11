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

export default function ConformitePage() {
  const total = controles.reduce((acc, c) => acc + c.poids, 0)
  const score = Math.round(
    (controles.filter(c => c.statut === 'conforme').reduce((acc, c) => acc + c.poids, 0) / total) * 100
  )

  const scoreColor = score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreMsg = score >= 70 ? 'Bon niveau' : score >= 50 ? 'À améliorer' : 'Critique'

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-green-400 mb-2">Conformité DGSSI</h1>
      <p className="text-slate-400 mb-8">Évaluation des contrôles de sécurité</p>

      <div className="flex items-center gap-8 mb-10">
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <div className={`text-6xl font-bold ${scoreColor}`}>{score}%</div>
          <div className="text-slate-400 mt-2">{scoreMsg}</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 flex-1">
          <p className="text-slate-400 text-sm mb-1">Votre administration</p>
          <p className="text-2xl font-bold">{score}%</p>
          <p className="text-slate-400 text-sm mt-3 mb-1">Moyenne nationale</p>
          <p className="text-2xl font-bold text-blue-400">52%</p>
          <p className="text-slate-400 text-sm mt-3 mb-1">Top 30%</p>
          <p className="text-2xl font-bold text-green-400">70%+</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Contrôles de sécurité</h2>
      <div className="grid gap-3">
        {controles.map(c => (
          <div key={c.id} className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-xl ${c.statut === 'conforme' ? 'text-green-400' : 'text-red-400'}`}>
                {c.statut === 'conforme' ? '✓' : '✗'}
              </span>
              <div>
                <p className="font-medium">{c.nom}</p>
                <p className="text-slate-400 text-sm">{c.domaine}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${c.statut === 'conforme' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
              {c.statut === 'conforme' ? 'Conforme' : 'Non conforme'}
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}