'use client'
import { useState } from 'react'

const templates = [
  { id: 1, cible: 'CNSS', sujet: 'Message urgent concernant votre compte', corps: 'Salam khoya, lCNSS 3andek chi message jdid. Veuillez vérifier votre compte immédiatement en cliquant sur le lien ci-dessous.' },
  { id: 2, cible: 'DGI', sujet: 'Avis de paiement en retard', corps: 'DGI: takhallaf 3la paiment dyalek. Cliquez ici pour régulariser votre situation fiscale avant le 15 mai.' },
  { id: 3, cible: 'Barid', sujet: 'Votre colis est en attente', corps: 'Barid Al-Maghrib: 3andek colis fi attente. Confirmer votre adresse pour la livraison.' },
  { id: 4, cible: 'RAM', sujet: 'Confirmation de votre vol', corps: 'Royal Air Maroc: reservation dyalek machi confirmed. Cliquez pour confirmer avant expiration.' },
  { id: 5, cible: 'ONEE', sujet: 'Facture impayée - Action requise', corps: 'ONEE: facture dyalek ma3dawch. Réglez maintenant pour éviter la coupure de service.' },
]

export default function PhishingPage() {
  const [cible, setCible] = useState('CNSS')
  const [emailGenere, setEmailGenere] = useState(null)
  const [landing, setLanding] = useState(false)

  const generer = () => {
    const template = templates.find(t => t.cible === cible) || templates[0]
    setEmailGenere(template)
    setLanding(false)
  }

  if (landing) {
    return (
      <main className="min-h-screen bg-red-900 text-white flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-4xl font-bold mb-4 text-center">Vous avez cliqué !</h1>
        <div className="bg-red-800 rounded-xl p-6 max-w-lg text-center mb-8">
          <p className="text-lg mb-4">Ceci était une simulation éducative AmanGov.</p>
          <p className="text-red-300">SIMULATION ÉDUCATIVE - AMANGOV</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full mb-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">3 conseils anti-phishing</h2>
          <div className="space-y-3">
            <p>✅ Vérifiez toujours l'adresse email de l'expéditeur</p>
            <p>✅ Ne cliquez jamais sur des liens urgents sans vérification</p>
            <p>✅ Contactez directement l'organisme par téléphone en cas de doute</p>
          </div>
        </div>
        <button onClick={() => setLanding(false)}
          className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-semibold transition">
          Continuer la formation →
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-2">Simulation Phishing Darija</h1>
      <p className="text-slate-400 mb-8">Formation anti-phishing pour les agents</p>
      <div className="flex gap-4 mb-8 flex-wrap">
        <select value={cible} onChange={e => setCible(e.target.value)}
          className="bg-slate-700 rounded-lg px-4 py-3 text-white outline-none">
          {['CNSS', 'DGI', 'Barid', 'RAM', 'ONEE'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={generer}
          className="bg-yellow-600 hover:bg-yellow-500 px-8 py-3 rounded-lg font-semibold transition">
          Générer Email
        </button>
      </div>
      {emailGenere && (
        <div className="max-w-2xl">
          <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gray-100 px-6 py-3 flex items-center gap-3 border-b">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-4 text-sm text-gray-500">Gmail - Simulation</span>
            </div>
            <div className="p-6">
              <div className="border-b pb-4 mb-4">
                <p className="text-sm text-gray-500">De: noreply-{emailGenere.cible.toLowerCase()}@gmail.com</p>
                <p className="text-sm text-gray-500">À: agent@administration.ma</p>
                <p className="font-semibold mt-2">{emailGenere.sujet}</p>
              </div>
              <p className="text-gray-700 mb-6">{emailGenere.corps}</p>
              <button onClick={() => setLanding(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Cliquer ici →
              </button>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-3">SIMULATION ÉDUCATIVE - AMANGOV</p>
        </div>
      )}
    </main>
  )
}