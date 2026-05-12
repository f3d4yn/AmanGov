// ============================================================
// AmanGov — LoadingSpinner
// Fichier : app/components/LoadingSpinner.jsx
//
// Spinner de chargement standard AmanGov.
// Utilisé lors des appels API (scan, conformité, génération IA).
//
// Usage :
//   import LoadingSpinner from '@/components/LoadingSpinner'
//   {isLoading && <LoadingSpinner text="Scan en cours..." />}
//   {isLoading && <LoadingSpinner />}
// ============================================================
import { COLORS } from '@/lib/theme'

export default function LoadingSpinner({ text = 'Chargement...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '32px' }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: `3px solid ${COLORS.border}`,
        borderTop: `3px solid ${COLORS.green.main}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ fontSize: '13px', color: COLORS.hint }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
