'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/phishing/quiz', { method: 'POST' })
      .then(r => r.json())
      .then(data => { setQuiz(data.quiz || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const answer = (selected) => {
    if (selected === quiz[current].correct) setScore(s => s + 1);
    if (current + 1 < quiz.length) setCurrent(c => c + 1);
    else setShowResult(true);
  };

  if (loading) return (
    <PageLayout title="Quiz Phishing" currentPath="/phishing/quiz">
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>
        ⏳ Jari t7mil...
      </div>
    </PageLayout>
  );

  if (showResult) {
    return (
      <PageLayout title="Resultat Quiz" currentPath="/phishing/quiz">
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '48px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '24px' }}>
              {score >= 4 ? '🎉' : score >= 2 ? '😊' : '⚠️'}
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
              Score: {score}/5
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '32px' }}>
              {score >= 4 ? "Mezyan! Rak wa3i bzzaf" : score >= 2 ? "Mashi mezyan, zid t3allam" : "Khassak t3allam akther"}
            </p>
            <Link href="/phishing">
              <button style={{ 
                padding: '14px 32px', 
                background: '#2563eb', 
                color: 'white', 
                borderRadius: '12px', 
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                ↩️ Rje3 lmodule
              </button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const q = quiz[current];
  if (!q) return (
    <PageLayout title="Quiz Phishing" currentPath="/phishing/quiz">
      <div style={{ color: 'white', textAlign: 'center', padding: '48px' }}>Ma l9itoch quiz</div>
    </PageLayout>
  );

  return (
    <PageLayout title="Quiz Phishing" currentPath="/phishing/quiz">
      <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ color: '#94a3b8', marginBottom: '16px', fontSize: '1.1rem' }}>
          Soual {current + 1} men {quiz.length}
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '32px' }}>
          {q.question}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => answer(opt[0])}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '20px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = '#334155'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = '#334155'; e.target.style.background = '#1e293b'; }}
            >
              <span style={{ color: '#60a5fa', fontWeight: 'bold', marginRight: '12px' }}>{opt[0]})</span>
              {opt.slice(3)}
            </button>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}