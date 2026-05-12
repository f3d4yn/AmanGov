// ============================================================
// AmanGov — SectionHeader
// Fichier : app/components/SectionHeader.jsx
//
// En-tête de section standard utilisé sur toutes les pages.
// Garantit le même style de titre pour tous les modules.
//
// Usage :
//   import SectionHeader from '@/components/SectionHeader'
//   <SectionHeader title="Résultats du scan" badge="15 vulnérabilités" note="Temps réel" />
// ============================================================
import { COLORS } from '@/lib/theme'

export default function SectionHeader({ title, badge = '', note = '' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: COLORS.green.main, whiteSpace: 'nowrap' }}>
        {title}
      </h2>
      {badge && (
        <span style={{
          fontSize: '11px',
          background: COLORS.green.main,
          color: '#fff',
          padding: '3px 10px',
          borderRadius: '2px',
          fontWeight: 700,
        }}>
          {badge}
        </span>
      )}
      <div style={{ flex: 1, height: '1px', background: '#c8d8b0' }} />
      {note && (
        <span style={{ fontSize: '12px', color: COLORS.hint, whiteSpace: 'nowrap' }}>{note}</span>
      )}
    </div>
  )
}
