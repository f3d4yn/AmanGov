'use client'
import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

const vulnerabilities = [
  { id: 1, nom: 'Injection SQL', severity: 'Critique', cve_id: 'CVE-2024-21762', description: 'Injection SQL dans le module authentification', solution: 'Utiliser des requêtes paramétrées et un ORM sécurisé.' },
  { id: 2, nom: 'DDoS HTTP/2', severity: 'Haute', cve_id: 'CVE-2023-44487', description: 'Attaque par déni de service HTTP/2', solution: 'Mettre à jour le serveur web et activer la limitation de débit.' },
  { id: 3, nom: 'RCE Jenkins', severity: 'Critique', cve_id: 'CVE-2024-23897', description: 'Exécution de code à distance via Jenkins', solution: 'Mettre à jour Jenkins vers la version 2.441+ immédiatement.' },
  { id: 4, nom: 'XSS Stored', severity: 'Haute', cve_id: 'CVE-2024-1234', description: 'Cross-site scripting stocké dans les formulaires', solution: 'Sanitiser toutes les entrées utilisateur et activer le CSP.' },
  { id: 5, nom: 'CSRF Token', severity: 'Moyenne', cve_id: 'CVE-2024-5678', description: 'Absence de protection CSRF sur les formulaires', solution: 'Implémenter des tokens CSRF sur toutes les requêtes POST.' },
  { id: 6, nom: 'TLS Obsolète', severity: 'Haute', cve_id: 'CVE-2024-9101', description: 'Utilisation de TLS 1.0/1.1 obsolète', solution: 'Forcer TLS 1.3 et désactiver les versions obsolètes.' },
  { id: 7, nom: 'Mot de passe faible', severity: 'Moyenne', cve_id: 'CVE-2024-3456', description: 'Politique de mot de passe insuffisante', solution: 'Imposer 12 caractères minimum avec complexité.' },
  { id: 8, nom: 'Log4Shell', severity: 'Critique', cve_id: 'CVE-2021-44228', description: 'Vulnérabilité Log4j présente sur les serveurs', solution: 'Mettre à jour Log4j vers 2.17.1+ en urgence.' },
]

const severityConfig = {
  'Critique': { badge: 'bg-red-500 text-white', border: 'border-l-red-500' },
  'Haute': { badge: 'bg-orange-500 text-white', border: 'border-l-orange-500' },
  'Moyenne': { badge: 'bg-yellow-500 text-black', border: 'border-l-yellow-500' },
  'Faible': { badge: 'bg-green-500 text-white', border: 'border-l-green-500' },
}

const analyseIA = `Plan de correction prioritaire :
1. [URGENT] Patcher CVE-2024-21762 (Injection SQL) — Risque de vol de données massif
2. [URGENT] Corriger CVE-2024-23897 (RCE Jenkins) — Exécution distante possible
3. [URGENT] Mettre à jour Log4j (Log4Shell) — Critique depuis 2021
4. [48h] Corriger XSS Stored et TLS obsolète
5. [1 semaine] Implémenter CSRF tokens et politique mots de passe`

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState([])
  const [filter, setFilter] = useState('Tous')
  const [showIA, setShowIA] = useState(false)
  const [loadingIA, setLoadingIA] = useState(false)

  const lancerScan = () => {
    setScanning(true)
    setResults([])
    setShowIA(false)
    setTimeout(() => {
      setResults(vulnerabilities)
      setScanning(false)
    }, 3000)
  }

  const analyserIA = () => {
    setLoadingIA(true)
    setTimeout(() => {
      setShowIA(true)
      setLoadingIA(false)
    }, 2000)
  }

  const filtered = filter === 'Tous' ? results : results.filter(v => v.severity === filter)
  const counts = {
    Critique: results.filter(v => v.severity === 'Critique').length,
    Haute: results.filter(v => v.severity === 'Haute').length,
    Moyenne: results.filter(v => v.severity === 'Moyenne').length,
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">Scanner de Vulnérabilités</h1>
      <p className="text-slate-400 mb-6">Détection automatique des failles de sécurité</p>

      <button onClick={lancerScan}
        className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-semibold transition mb-8">
        🔍 Lancer le Scan
      </button>

      {scanning && (
        <div className="mb-6">
          <LoadingSpinner />
          <p className="text-center text-slate-400 mt-2">Analyse en cours...</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          {/* Stats résumé */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{counts.Critique}</div>
              <div className="text-slate-400 text-sm mt-1">Critiques</div>
            </div>
            <div className="bg-orange-900/30 border border-orange-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-400">{counts.Haute}</div>
              <div className="text-slate-400 text-sm mt-1">Hautes</div>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">{counts.Moyenne}</div>
              <div className="text-slate-400 text-sm mt-1">Moyennes</div>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {['Tous', 'Critique', 'Haute', 'Moyenne', 'Faible'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition ${filter === f ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Liste vulnérabilités */}
          <div className="grid gap-3 mb-8">
            {filtered.map(v => (
              <div key={v.id} className={`bg-slate-800 rounded-xl p-5 border-l-4 ${severityConfig[v.severity].border}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-lg">{v.nom}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${severityConfig[v.severity].badge}`}>
                        {v.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">{v.description}</p>
                    <p className="text-blue-400 text-xs font-mono">{v.cve_id}</p>
                    <p className="text-green-400 text-xs mt-2">💡 {v.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analyse IA */}
          <button onClick={analyserIA}
            className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-lg font-semibold transition mb-4">
            🤖 Analyse IA — Plan de correction
          </button>
          {loadingIA && <LoadingSpinner />}
          {showIA && (
            <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-purple-400 font-semibold mb-3">🤖 Recommandations IA</h3>
              <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">{analyseIA}</pre>
            </div>
          )}
        </>
      )}
    </main>
  )
}