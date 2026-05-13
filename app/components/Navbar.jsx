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
      <div className="print-hide" style={{
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
      <nav className="print-hide" style={{
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
          <img 
            src="/logo-amangov.png" 
            alt="AmanGov" 
            style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
          />
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