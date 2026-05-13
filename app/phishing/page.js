'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function PhishingPage() {
  const [target, setTarget] = useState('CNSS');
  const [type, setType] = useState('email');
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch('/api/phishing')
      .then(r => r.json())
      .then(data => setTemplates(data.templates || []))
      .catch(() => setTemplates([]));
  }, []);

  const generateEmail = async () => {
    setLoading(true);
    setEmail(null);
    try {
      const res = await fetch('/api/phishing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, type })
      });
      const data = await res.json();
      setEmail(data.generated);
    } catch (err) {
      const fallback = templates.find(t => t.cible === target && t.type === type) || templates[0];
      if (fallback) setEmail({ subject: fallback.sujet, body: fallback.corps, red_flags: fallback.red_flags });
    }
    setLoading(false);
  };

  return (
    <PageLayout title="Simulateur Phishing Darija" currentPath="/phishing">
      <div style={{ padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
             Simulasyon dyal Phishing
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
            B Darija dialna - Lwa9i3 bach n3allmou!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
          <select 
            value={target} 
            onChange={(e) => setTarget(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '12px', background: '#1e293b', border: '1px solid #475569', color: 'white', fontSize: '1rem' }}
          >
            {['CNSS', 'DGI', 'Barid', 'RAM', 'ONEE', 'Ministere Sante', 'Ministere Justice', 'IAM', 'Inwi', 'Attijariwafa'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '12px', background: '#1e293b', border: '1px solid #475569', color: 'white', fontSize: '1rem' }}
          >
            <option value="email"> Email</option>
            <option value="sms"> SMS</option>
          </select>

          <button 
            onClick={generateEmail}
            disabled={loading}
            style={{ 
              padding: '12px 32px', 
              borderRadius: '12px', 
              background: loading ? '#475569' : '#2563eb', 
              color: 'white', 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading ? ' Jari...' : ' Generer wahda jadida'}
          </button>
        </div>

        {email && (
          <div style={{ 
            maxWidth: '700px', 
            margin: '0 auto 32px', 
            background: 'white', 
            borderRadius: '16px', 
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                {target[0]}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#1e293b' }}>{target} <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>&lt;no-reply@{target.toLowerCase().replace(' ', '')}.ma&gt;</span></p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>A: moi</p>
              </div>
            </div>
            
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>{email.subject}</h2>
              <p style={{ color: '#475569', marginBottom: '24px', lineHeight: 1.6, fontSize: '1.1rem' }}>{email.body}</p>
              
              <Link href="/phishing/landed" style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '1.1rem', display: 'inline-block', marginBottom: '24px' }}>
                http://{target.toLowerCase().replace(' ', '')}-verify.ma/urgent
              </Link>

              <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '20px', borderRadius: '0 12px 12px 0' }}>
                <p style={{ fontWeight: 'bold', color: '#b91c1c', marginBottom: '12px', fontSize: '1.1rem' }}>⚠️ Chi 7wayej li khassak tchof:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {email.red_flags?.map((flag, i) => (
                    <li key={i} style={{ color: '#dc2626', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✗</span> {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '48px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}> 20 Templates li 3andek</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {templates.map(t => (
              <div key={t.id} style={{ 
                background: 'rgba(30, 41, 59, 0.5)', 
                padding: '16px', 
                borderRadius: '12px',
                border: '1px solid #334155'
              }}>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '4px 12px', 
                  borderRadius: '9999px', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  background: t.type === 'sms' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                  color: t.type === 'sms' ? '#4ade80' : '#60a5fa'
                }}>
                  {t.type.toUpperCase()}
                </span>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.cible}</p>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>{t.sujet}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/phishing/quiz">
            <button style={{ 
              padding: '12px 24px', 
              background: '#16a34a', 
              color: 'white', 
              borderRadius: '12px', 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              border: 'none',
              cursor: 'pointer'
            }}>
               Dir Quiz daba
            </button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}