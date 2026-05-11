'use client'
import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

const vulnerabilities = [
  { id: 1, nom: 'Injection SQL', severity: 'Critique', cve_id: 'CVE-2024-21762', description: 'Injection SQL dans le module authentification' },
  { id: 2, nom: 'DDoS HTTP/2', severity: 'Haute', cve_id: 'CVE-2023-44487', description: 'Attaque par déni de service HTTP/2' },
  { id: 3, nom: 'RCE Jenkins', severity: 'Critique', cve_id: 'CVE-2024-23897', description: 'Exécution de code à distance via Jenkins' },
  { id: 4, nom: 'XSS Stored', severity: 'Haute', cve_id: 'CVE-2024-1234', description: 'Cross-site scripting stocké' },
  { id: 5, nom: 'CSRF Token', severity: 'Moyenne', cve_id: 'CVE-2024-5678', description: 'Absence de protection CSRF' },
]

const severityConfig = {
  'Critique': 'bg-red-500 text-white',
  'Haute': 'bg-orange-500 text-white',
  'Moyenne': 'bg-yellow-500 text-black',
  'Faible': 'bg-green-500 text-white',
}

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState([])
  const [filter, setFilter] = useState('Tous')

  const lancerScan = () => {
    setScanning(true)
    setResults([])
    setTimeout(() => {
      setResults(vulnerabilities)
      setScanning(false)
    }, 3000)
  }

  const filtered = filter === 'Tous' ? results : results.filter(v => v.severity === filter)

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
          <p className="text-center text-slate-400 mt-2">Scan en cours...</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="flex gap-3 mb-6 flex-wrap">
            {['Tous', 'Critique', 'Haute', 'Moyenne', 'Faible'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition ${filter === f ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {filtered.map(v => (
              <div key={v.id} className="bg-slate-800 rounded-xl p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-lg">{v.nom}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${severityConfig[v.severity]}`}>
                      {v.severity}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{v.description}</p>
                  <p className="text-blue-400 text-xs mt-1">{v.cve_id}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}