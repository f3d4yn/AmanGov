'use client'
<<<<<<< HEAD
import { useState } from 'react'

const incidents = [
  { id: 1, type: 'Ransomware', date: '2026-05-01', gravite: 'Critique', statut: 'Résolu', description: 'Chiffrement des serveurs DGI' },
  { id: 2, type: 'Fuite de données', date: '2026-04-28', gravite: 'Haute', statut: 'En cours', description: 'Exposition de données contribuables' },
  { id: 3, type: 'DDoS', date: '2026-04-25', gravite: 'Haute', statut: 'Résolu', description: 'Attaque sur portail en ligne' },
  { id: 4, type: 'Accès non autorisé', date: '2026-04-20', gravite: 'Moyenne', statut: 'Résolu', description: 'Tentative intrusion base de données' },
  { id: 5, type: 'Compromission compte', date: '2026-04-15', gravite: 'Haute', statut: 'En cours', description: 'Compte administrateur compromis' },
]

const graviteColor = {
  'Critique': 'text-red-400 bg-red-900',
  'Haute': 'text-orange-400 bg-orange-900',
  'Moyenne': 'text-yellow-400 bg-yellow-900',
  'Faible': 'text-green-400 bg-green-900',
}

const statutColor = {
  'Résolu': 'text-green-400',
  'En cours': 'text-orange-400',
}

export default function IncidentsPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Bonjour ! Je suis votre assistant sécurité. Décrivez votre incident.' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    const aiMsg = { role: 'ai', text: `Incident "${input}" enregistré. Étapes recommandées : 1) Isoler les systèmes affectés 2) Notifier le RSSI 3) Documenter l'incident 4) Contacter DGSSI si nécessaire.` }
    setMessages(prev => [...prev, userMsg, aiMsg])
    setInput('')
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-red-400 mb-2">Gestion des Incidents</h1>
      <p className="text-slate-400 mb-8">Suivi et réponse aux incidents de sécurité</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl p-5 text-center">
          <div className="text-4xl font-bold text-red-400">{incidents.length}</div>
          <div className="text-slate-400 mt-1">Total incidents</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 text-center">
          <div className="text-4xl font-bold text-orange-400">{incidents.filter(i => i.statut === 'En cours').length}</div>
          <div className="text-slate-400 mt-1">En cours</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 text-center">
          <div className="text-4xl font-bold text-green-400">{incidents.filter(i => i.statut === 'Résolu').length}</div>
          <div className="text-slate-400 mt-1">Résolus</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Timeline des incidents</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
            {incidents.map(inc => (
              <div key={inc.id} className="relative pl-10 pb-6">
                <div className={`absolute left-2.5 w-3 h-3 rounded-full mt-1.5 ${inc.gravite === 'Critique' ? 'bg-red-400' : inc.gravite === 'Haute' ? 'bg-orange-400' : 'bg-yellow-400'}`}></div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold">{inc.type}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${graviteColor[inc.gravite]}`}>{inc.gravite}</span>
                    <span className={`text-sm ${statutColor[inc.statut]}`}>{inc.statut}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{inc.description}</p>
                  <p className="text-slate-500 text-xs mt-1">{inc.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Assistant IA</h2>
          <div className="bg-slate-800 rounded-xl p-4 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Décrivez votre incident..."
                className="flex-1 bg-slate-700 rounded-lg px-4 py-2 text-sm outline-none"
              />
              <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
=======
import PageLayout from '@/components/PageLayout'
export default function Incidents() {
  return (
    <PageLayout title="Réponse aux incidents" currentPath="/incidents">
      <div style={{ padding: '32px' }}>
        {/* Marwa travaille ici */}
      </div>
    </PageLayout>
  )
}
>>>>>>> origin/module-scanner
