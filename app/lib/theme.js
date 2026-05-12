// ============================================================
// AmanGov — Design System & Theme
// Fichier : app/lib/theme.js
// Importez ce fichier dans TOUTES les pages et composants
// ============================================================

// ── Palette officielle AmanGov ───────────────────────────────
// NE JAMAIS utiliser d'autres couleurs que celles-ci
export const COLORS = {
  green: {
    dark:    '#0d3d18',   // footer bottom
    main:    '#1a5c2a',   // hero, navbar, footer, bordures top des cartes vertes
    light:   '#eef5ee',   // fond icône carte verte, badge tag vert
    text:    '#c8dfc8',   // texte secondaire sur fond vert
    textDark:'#27500A',   // texte sur fond vert clair
  },
  gold: {
    dark:    '#7a5800',   // texte alerte sur fond jaune
    main:    '#b8860b',   // boutons, accents, bordures top cartes or, dots
    light:   '#fdf7e8',   // fond icône carte or, badge tag or
    bright:  '#d4af37',   // titres/chiffres sur fond vert
    bg:      '#fff8e1',   // fond bannière alerte
    border:  '#f0d060',   // bordure bannière alerte
    text:    '#9a6e00',   // texte secondaire alerte
  },
  page:    '#f5f5f0',     // fond général de toute la page
  white:   '#ffffff',     // fond des cartes et sections
  border:  '#d4dfd4',     // bordure des cartes
  border2: '#e8efe8',     // séparateurs légers internes
  border3: '#c8d8c8',     // breadcrumb border
  text:    '#1a1a1a',     // texte principal
  muted:   '#555555',     // texte description carte
  hint:    '#888888',     // texte tertiaire, dates
  sub:     '#999999',     // sous-titres carte
  nav:     '#333333',     // liens navbar
}

// ── Severity badges (Scanner) ─────────────────────────────────
export const SEVERITY = {
  critique: { label: 'Critique', bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
  haute:    { label: 'Haute',    bg: '#ffedd5', color: '#9a3412', border: '#fdba74' },
  moyenne:  { label: 'Moyenne',  bg: '#fef9c3', color: '#854d0e', border: '#fde047' },
  faible:   { label: 'Faible',   bg: '#dcfce7', color: '#166534', border: '#86efac' },
}

// ── Score conformité → couleur ────────────────────────────────
export const scoreColor = (score) => {
  if (score >= 75) return '#22c55e'
  if (score >= 50) return '#f97316'
  return '#ef4444'
}

// ── 4 Modules ─────────────────────────────────────────────────
export const MODULES = [
  {
    id: 'scanner', title: 'Scanner de vulnérabilités', sub: 'OpenVAS · Nmap · Nuclei',
    desc: "Détection automatique des failles exploitables sur les infrastructures gouvernementales. Corrélation CVE en temps réel, tests OWASP Top 10, scoring CVSS v3.1.",
    icon: 'ti-radar', tag: 'Disponible', tagIcon: 'ti-check', color: 'green', href: '/scanner',
  },
  {
    id: 'conformite', title: 'Conformité DGSSI / CNDP', sub: 'ISO 27001 · Scoring temps réel',
    desc: "Score de conformité global (0–100) par administration avec mapping automatique vers les contrôles DGSSI, ISO 27001 et CNDP. Alertes et rapports réglementaires.",
    icon: 'ti-chart-bar', tag: 'Disponible', tagIcon: 'ti-check', color: 'gold', href: '/conformite',
  },
  {
    id: 'phishing', title: 'Simulateur phishing Darija', sub: 'IA Ollama · 20+ templates',
    desc: "Premier simulateur de phishing en Darija marocain au monde. Campagnes contextualisées CNSS, DGI, Barid Al-Maghrib. Formation automatique post-clic.",
    icon: 'ti-mail-forward', tag: 'Innovation', tagIcon: 'ti-star', color: 'gold', href: '/phishing',
  },
  {
    id: 'incidents', title: 'Réponse aux incidents', sub: '5 playbooks · ELK Stack · CNDP',
    desc: "Playbooks automatisés ransomware, fuite, DDoS. Workflow d'escalade RSSI→DGSSI. Collecte forensique, timeline d'attaque, rapport CNDP 72h automatique.",
    icon: 'ti-shield-exclamation', tag: 'Disponible', tagIcon: 'ti-check', color: 'green', href: '/incidents',
  },
]

// ── Utilitaire classes ────────────────────────────────────────
export const cx = (...classes) => classes.filter(Boolean).join(' ')
