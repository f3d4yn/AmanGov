// ============================================================
// AmanGov — Footer
// Fichier : app/components/Footer.jsx
// Appelé automatiquement par PageLayout — ne pas l'importer
// directement dans vos pages.
// ============================================================
import { COLORS } from '@/lib/theme'
import Link from 'next/link'

const COL = [
  {
    title: 'Modules',
    links: [
      { label: 'Scanner',          href: '/scanner'    },
      { label: 'Conformité DGSSI', href: '/conformite' },
      { label: 'Phishing Darija',  href: '/phishing'   },
      { label: 'Incidents',        href: '/incidents'  },
    ],
  },
  {
    title: 'Réglementaire',
    links: [
      { label: 'dgssi.gov.ma',   href: 'https://dgssi.gov.ma' },
      { label: 'cndp.ma',        href: 'https://cndp.ma'      },
      { label: 'Stratégie 2030', href: '#'                    },
      { label: 'Loi 09-08',      href: '#'                    },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Équipe AmanGov',      href: '#' },
      { label: 'Documentation',       href: '#' },
      { label: 'GitHub',              href: '#' },
      { label: 'Signaler un incident',href: '#' },
    ],
  },
]

const linkStyle = {
  fontSize: '12px',
  color: '#a0cca0',
  lineHeight: '1.9',
  display: 'block',
  textDecoration: 'none',
}

export default function Footer() {
  return (
    <>
      <footer style={{ background: COLORS.green.main, color: '#fff', padding: '28px 32px', display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
        {/* Description */}
        <div style={{ flex: 2, minWidth: '180px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: COLORS.gold.bright, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            AmanGov
          </h4>
          <p style={{ ...linkStyle, lineHeight: 1.7 }}>
            Bouclier Numérique des Administrations Publiques Marocaines. Plateforme open-source de cyber-hygiène automatisée.
          </p>
          <p style={{ marginTop: '8px', color: COLORS.gold.bright, fontSize: '11px' }}>
            MIT License · GitHub Open Source
          </p>
        </div>

        {/* Colonnes de liens */}
        {COL.map((col) => (
          <div key={col.title} style={{ flex: 1, minWidth: '130px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: COLORS.gold.bright, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              {col.title}
            </h4>
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} style={linkStyle}>{l.label}</Link>
            ))}
          </div>
        ))}
      </footer>

      {/* Bas du footer */}
      <div style={{ background: COLORS.green.dark, color: '#6a9a7a', padding: '11px 32px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
        <span>© 2026 AmanGov — Miathon&apos;03 · UMP Oujda · Ilyas · Abdessamad · Malak · Marwa · Imane</span>
        <div>
          <a href="#" style={{ color: '#6a9a7a', textDecoration: 'none', marginLeft: '16px' }}>Mentions légales</a>
          <a href="#" style={{ color: '#6a9a7a', textDecoration: 'none', marginLeft: '16px' }}>Confidentialité</a>
        </div>
      </div>
    </>
  )
}
