import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function LandedPage() {
  return (
    <PageLayout title="Vous avez clique!" currentPath="/phishing/landed">
      <div style={{ 
        minHeight: 'calc(100vh - 100px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '32px'
      }}>
        <div style={{ 
          maxWidth: '700px', 
          background: 'white', 
          borderRadius: '24px', 
          padding: '48px', 
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '24px' }}>🚨</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>
            We9fti f lfax!
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#475569', marginBottom: '8px' }}>Walakin hadchi ta3limi</p>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            SIMULATION EDUCATIVE - AMANGOV
          </p>

          <div style={{ 
            background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', 
            borderRadius: '16px', 
            padding: '32px',
            textAlign: 'right',
            marginBottom: '32px'
          }}>
            <h2 style={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '24px', fontSize: '1.3rem', textAlign: 'center' }}>
              💡 3 nassai7 bach t7mi rassek:
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'white', padding: '20px', borderRadius: '12px' }}>
                <span style={{ 
                  background: '#3b82f6', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>1</span>
                <div>
                  <p style={{ fontWeight: 'bold', color: '#1e293b' }}>Ma tclicki 3la llinks</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Verifier dima lmossef lrasmi 9bel ma tclicki</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'white', padding: '20px', borderRadius: '12px' }}>
                <span style={{ 
                  background: '#3b82f6', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>2</span>
                <div>
                  <p style={{ fontWeight: 'bold', color: '#1e293b' }}>T2akked men l3onwan</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>lbanka mchi ghadi t3asselk b Gmail wla Yahoo</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'white', padding: '20px', borderRadius: '12px' }}>
                <span style={{ 
                  background: '#3b82f6', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>3</span>
                <div>
                  <p style={{ fontWeight: 'bold', color: '#1e293b' }}>Sebbe7 b 2FA</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Jouj merrate l7ssab a7ssen men wahda</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/phishing">
              <button style={{ 
                padding: '14px 28px', 
                background: '#1e293b', 
                color: 'white', 
                borderRadius: '12px', 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                ↩️ Rje3 lmodule
              </button>
            </Link>
            <Link href="/phishing/quiz">
              <button style={{ 
                padding: '14px 28px', 
                background: '#16a34a', 
                color: 'white', 
                borderRadius: '12px', 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                🧪 Dir Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}