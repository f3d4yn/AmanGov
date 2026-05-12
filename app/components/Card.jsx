// ============================================================
// AmanGov — Card
// Fichier : app/components/Card.jsx
//
// Carte générique utilisée dans TOUS les modules.
// Garantit une apparence cohérente (fond blanc, bordure,
// border-radius, padding).
//
// Usage :
//   import Card from '@/components/Card'
//
//   // Carte simple
//   <Card>contenu</Card>
//
//   // Carte avec bordure colorée en haut (couleur du module)
//   <Card topColor="green">contenu</Card>   → vert #1a5c2a
//   <Card topColor="gold">contenu</Card>    → or  #b8860b
//
//   // Carte avec titre de section
//   <Card title="Résultats du scan" icon="ti-radar">contenu</Card>
//
//   // Carte cliquable (hover effect)
//   <Card clickable onClick={handleClick}>contenu</Card>
// ============================================================
'use client'
import { COLORS } from '@/lib/theme'

export default function Card({
  children,
  topColor = null,     // 'green' | 'gold' | null
  title = '',
  icon = '',
  clickable = false,
  onClick = null,
  style = {},
  className = '',
}) {
  const topBorderColor =
    topColor === 'green' ? COLORS.green.main :
    topColor === 'gold'  ? COLORS.gold.main  : 'transparent'

  return (
    <div
      onClick={clickable ? onClick : undefined}
      style={{
        background: COLORS.white,
        border: `0.5px solid ${COLORS.border}`,
        borderTop: topColor ? `3px solid ${topBorderColor}` : `0.5px solid ${COLORS.border}`,
        borderRadius: '4px',
        padding: '20px',
        cursor: clickable ? 'pointer' : 'default',
        transition: clickable ? 'box-shadow 0.15s, border-color 0.15s' : 'none',
        ...style,
      }}
      onMouseEnter={clickable ? (e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,92,42,0.08)'
        e.currentTarget.style.borderColor = COLORS.green.main
      } : undefined}
      onMouseLeave={clickable ? (e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = COLORS.border
      } : undefined}
      className={className}
    >
      {/* En-tête optionnel avec titre + icon */}
      {title && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontSize: '13px',
          fontWeight: 700,
          color: COLORS.green.main,
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: `0.5px solid ${COLORS.border2}`,
        }}>
          {icon && <i className={`ti ${icon}`} style={{ fontSize: '16px' }} />}
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
