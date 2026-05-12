// ============================================================
// AmanGov — Navbar
// Fichier : app/components/Navbar.jsx
// Usage   : import Navbar from '@/components/Navbar'
//           <Navbar currentPath="/scanner" />
// ============================================================
'use client'
import Link from 'next/link'
import { COLORS } from '@/lib/theme'

const NAV_LINKS = [
  { label: 'Accueil',       href: '/'             },
  { label: 'Scanner',       href: '/scanner'      },
  { label: 'Conformité',    href: '/conformite'   },
  { label: 'Phishing',      href: '/phishing'     },
  { label: 'Incidents',     href: '/incidents'    },
  { label: 'Documentation', href: '/documentation'},
]

export default function Navbar({ currentPath = '/' }) {
  return (
    <>
      {/* Topbar */}
      <div style={{
        background: COLORS.green.main,
        color: '#fff',
        fontSize: '12px',
        padding: '6px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: COLORS.green.text }}>
          Portail National de Cybersécurité des Administrations Marocaines
        </span>
        <div style={{ display: 'flex', gap: '14px' }}>
          {['العربية', 'Français', 'English'].map((lang) => (
            <a key={lang} href="#" style={{ color: COLORS.gold.bright, fontSize: '12px', textDecoration: 'none' }}>
              {lang}
            </a>
          ))}
        </div>
      </div>

      {/* Navbar principale */}
      <nav style={{
        background: COLORS.white,
        borderBottom: `3px solid ${COLORS.green.main}`,
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '80px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
          <svg width="60" height="60" viewBox="0 0 120 120">
            <polygon points="60,10 67,28 86,28 72,40 77,58 60,47 43,58 48,40 34,28 53,28"
              fill={COLORS.gold.main} opacity="0.85"/>
            <path d="M42,46 Q42,26 60,22 Q78,26 78,46 L78,78 Q78,94 60,100 Q42,94 42,78 Z"
              fill="none" stroke={COLORS.green.main} strokeWidth="3"/>
            <path d="M50,50 Q50,34 60,30 Q70,34 70,50 L70,76 Q70,88 60,92 Q50,88 50,76 Z"
              fill={COLORS.green.main} opacity="0.12"/>
            <rect x="51" y="58" width="18" height="16" rx="3" fill={COLORS.green.main}/>
            <rect x="56" y="52" width="8" height="10" rx="4" fill="none"
              stroke={COLORS.green.main} strokeWidth="2.2"/>
            <circle cx="60" cy="64" r="2.5" fill="white"/>
            <line x1="60" y1="66" x2="60" y2="70" stroke="white" strokeWidth="1.5"/>
            <line x1="42" y1="92" x2="36" y2="98" stroke={COLORS.gold.main} strokeWidth="1.5" opacity="0.65"/>
            <line x1="36" y1="92" x2="42" y2="98" stroke={COLORS.gold.main} strokeWidth="1.5" opacity="0.65"/>
            <line x1="78" y1="92" x2="72" y2="98" stroke={COLORS.gold.main} strokeWidth="1.5" opacity="0.65"/>
            <line x1="72" y1="92" x2="78" y2="98" stroke={COLORS.gold.main} strokeWidth="1.5" opacity="0.65"/>
          </svg>
          <div>
            <div style={{ fontSize: '26px', fontWeight: 700 }}>
              <span style={{ color: COLORS.green.main }}>Aman</span>
              <span style={{ color: COLORS.gold.main }}>Gov</span>
            </div>
            <div style={{ fontSize: '11px', color: COLORS.hint, marginTop: '2px' }}>
              Bouclier Numérique des Administrations Publiques Marocaines
            </div>
          </div>
        </Link>

        {/* Liens */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {NAV_LINKS.map((link, i) => {
            const isActive = currentPath === link.href
            return (
              <Link key={link.href} href={link.href} style={{
                fontSize: '13px',
                color: isActive ? '#fff' : COLORS.nav,
                padding: '10px 18px',
                textDecoration: 'none',
                borderRight: `0.5px solid ${COLORS.border2}`,
                borderLeft: i === 0 ? `0.5px solid ${COLORS.border2}` : 'none',
                background: isActive ? COLORS.green.main : 'transparent',
                transition: 'background 0.15s',
              }}>
                {link.label}
              </Link>
            )
          })}
          <button style={{
            background: COLORS.gold.main,
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            padding: '10px 22px',
            borderRadius: '3px',
            marginLeft: '14px',
            cursor: 'pointer',
            border: 'none',
          }}>
            Connexion
          </button>
        </div>
      </nav>
    </>
  )
}
