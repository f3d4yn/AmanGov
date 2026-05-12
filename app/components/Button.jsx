// ============================================================
// AmanGov — Button
// Fichier : app/components/Button.jsx
//
// Bouton réutilisable. PERSONNE ne crée ses propres boutons.
// Tous importent et utilisent ce composant.
//
// Variants disponibles :
//   primary   → fond or  (#b8860b) — action principale
//   secondary → fond vert (#1a5c2a) — action secondaire
//   outline   → transparent, bordure blanche — sur fond vert
//   ghost     → transparent, texte vert — action légère
//   danger    → fond rouge — action destructive
//
// Usage :
//   import Button from '@/components/Button'
//   <Button variant="primary" onClick={handleClick}>Lancer un scan</Button>
//   <Button variant="outline" icon="ti-file-description">Documentation</Button>
//   <Button variant="primary" loading={isLoading}>Analyser</Button>
// ============================================================
'use client'
import { COLORS } from '@/lib/theme'

const VARIANTS = {
  primary: {
    background: COLORS.gold.main,
    color: '#fff',
    border: 'none',
  },
  secondary: {
    background: COLORS.green.main,
    color: '#fff',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: '#fff',
    border: '2px solid rgba(255,255,255,0.4)',
  },
  ghost: {
    background: 'transparent',
    color: COLORS.green.main,
    border: `1px solid ${COLORS.border}`,
  },
  danger: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
  },
}

export default function Button({
  children,
  variant = 'primary',
  icon = '',
  loading = false,
  disabled = false,
  onClick,
  style = {},
  type = 'button',
}) {
  const v = VARIANTS[variant] || VARIANTS.primary

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: v.background,
        color: v.color,
        border: v.border,
        fontSize: '13px',
        fontWeight: 700,
        padding: '10px 22px',
        borderRadius: '3px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'opacity 0.15s',
        letterSpacing: '0.2px',
        ...style,
      }}
    >
      {loading ? (
        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
      ) : icon ? (
        <i className={`ti ${icon}`} style={{ fontSize: '14px' }} />
      ) : null}
      {children}
    </button>
  )
}
