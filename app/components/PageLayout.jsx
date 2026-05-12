// ============================================================
// AmanGov — PageLayout
// Fichier : app/components/PageLayout.jsx
//
// OBLIGATOIRE pour toutes les pages du projet.
// Ce composant garantit :
//   - Le fond de page correct (#f5f5f0)
//   - La Navbar en haut avec le currentPath actif
//   - Le fil d'ariane (breadcrumb)
//   - Le Footer en bas
//   - Le padding horizontal cohérent (32px)
//
// Usage :
//   import PageLayout from '@/components/PageLayout'
//   <PageLayout title="Scanner" currentPath="/scanner">
//     ... votre contenu ...
//   </PageLayout>
// ============================================================
import Navbar from './Navbar'
import Footer from './Footer'
import { COLORS } from '@/lib/theme'

export default function PageLayout({ children, title = '', currentPath = '/' }) {
  return (
    <div style={{ background: COLORS.page, minHeight: '100vh', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Navbar partagée */}
      <Navbar currentPath={currentPath} />

      {/* Fil d'ariane */}
      {title && (
        <div style={{
          background: '#eef3ee',
          borderBottom: `0.5px solid ${COLORS.border3}`,
          padding: '9px 32px',
          fontSize: '12px',
          color: COLORS.hint,
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
        }}>
          <a href="/" style={{ color: COLORS.green.main, textDecoration: 'none' }}>Accueil</a>
          <span style={{ color: '#999' }}>›</span>
          <span>{title}</span>
        </div>
      )}

      {/* Contenu de la page */}
      <main>
        {children}
      </main>

      {/* Footer partagé */}
      <Footer />
    </div>
  )
}
