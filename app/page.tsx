'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

function animateCount(
  el: HTMLElement,
  target: number,
  suffix: string,
  duration: number,
  decimals: boolean
) {
  let current = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const val = decimals
      ? current.toFixed(1)
      : Math.round(current).toLocaleString('fr-FR');
    el.textContent = val + suffix;
  }, 16);
}

export default function Home() {
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;
    setTimeout(() => {
      const ids: [string, number, string, number, boolean][] = [
        ['s1', 2, 'M+', 1400, false],
        ['s2', 78, '%', 1200, false],
        ['s3', 4, ' To', 1000, false],
        ['s4', 4, '', 600, false],
        ['k1', 52, ' / 100', 1400, false],
        ['k2', 134, '', 1600, false],
        ['k3', 1248, '', 1800, false],
      ];
      ids.forEach(([id, target, suffix, duration, decimals]) => {
        const el = document.getElementById(id);
        if (el) animateCount(el, target, suffix, duration, decimals);
      });
    }, 300);
  }, []);

  return (
    <>
      {/* Topbar */}
      <div style={{ background: '#1a5c2a', color: '#fff', fontSize: 12, padding: '6px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#c8dfc8' }}>Portail National de Cybersécurité des Administrations Marocaines</span>
        <div style={{ display: 'flex', gap: 14 }}>
          {['العربية', 'Français', 'English'].map(l => (
            <a key={l} href="#" style={{ color: '#d4af37', fontSize: 12, textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <div style={{ background: '#fff', borderBottom: '3px solid #1a5c2a', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src="/logo-amangov.png"
            alt="AmanGov"
            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 0.3 }}>
              <span style={{ color: '#1a5c2a' }}>Aman</span>
              <span style={{ color: '#b8860b' }}>Gov</span>
            </div>
            <div style={{ fontSize: 11, color: '#777', marginTop: 2 }}>Bouclier Numérique des Administrations Publiques Marocaines</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
          {[
            { label: 'Accueil', href: '/', active: true },
            { label: 'Scanner', href: '/scanner' },
            { label: 'Conformité', href: '/conformite' },
            { label: 'Phishing', href: '/phishing' },
            { label: 'Incidents', href: '/incidents' },
            { label: 'Documentation', href: '#' },
          ].map((link, i) => (
            <Link key={link.href} href={link.href} style={{
              fontSize: 13, color: link.active ? '#fff' : '#333',
              padding: '10px 18px', textDecoration: 'none',
              background: link.active ? '#1a5c2a' : 'transparent',
              borderRight: '0.5px solid #e0e0e0',
              borderLeft: i === 0 ? '0.5px solid #e0e0e0' : undefined,
            }}>
              {link.label}
            </Link>
          ))}
          <button style={{ background: '#b8860b', color: '#fff', fontSize: 13, fontWeight: 700, padding: '10px 22px', borderRadius: 3, marginLeft: 14, cursor: 'pointer', border: 'none', letterSpacing: 0.3 }}>
            Connexion
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: '#eef3ee', borderBottom: '0.5px solid #c8d8c8', padding: '9px 32px', fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 7 }}>
        <Link href="/" style={{ color: '#1a5c2a', textDecoration: 'none' }}>Accueil</Link>
        <span style={{ color: '#999' }}>›</span>
        <span>Tableau de bord national</span>
      </div>

      {/* Hero */}
      <div style={{ background: '#1a5c2a', color: '#fff', padding: '48px 32px', display: 'flex', gap: 36, alignItems: 'flex-start', borderBottom: '4px solid #b8860b' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'inline-block', background: '#b8860b', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 13px', borderRadius: 2, letterSpacing: 0.5, marginBottom: 16 }}>
            Stratégie Nationale Cybersécurité 2030
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.25, marginBottom: 14 }}>
            Protéger les données de <span style={{ color: '#d4af37' }}>millions de Marocains</span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#c0dcc0', maxWidth: 540, marginBottom: 24 }}>
            AmanGov est la plateforme open-source de cyber-hygiène automatisée, conçue pour les administrations publiques marocaines. Conformité DGSSI/CNDP en temps réel, détection des vulnérabilités et formation des agents.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            <button style={{ background: '#b8860b', color: '#fff', fontSize: 13, fontWeight: 700, padding: '12px 24px', borderRadius: 3, border: 'none', cursor: 'pointer' }}>
              Accéder à la plateforme
            </button>
            <button style={{ background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 700, padding: '12px 24px', borderRadius: 3, border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer' }}>
              Documentation
            </button>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { id: 's1', lbl: 'Citoyens à protéger' },
              { id: 's2', lbl: 'Admins non conformes' },
              { id: 's3', lbl: 'Données volées (2025)' },
              { id: 's4', lbl: 'Modules intégrés' },
            ].map(s => (
              <div key={s.id} style={{ background: 'rgba(255,255,255,0.09)', borderTop: '2px solid #b8860b', borderRadius: 4, padding: '14px 20px', textAlign: 'center', minWidth: 110 }}>
                <div id={s.id} style={{ fontSize: 26, fontWeight: 700, color: '#d4af37', lineHeight: 1 }}>0</div>
                <div style={{ fontSize: 11, color: '#a0cca0', marginTop: 5 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 6 }}>
          {[
            { id: 'k1', label: 'Score national moyen', sub: 'Conformité DGSSI — Mai 2026' },
            { id: 'k2', label: 'Vulnérabilités critiques', sub: 'Détectées ce mois' },
            { id: 'k3', label: 'Agents formés', sub: 'Via simulateur Darija' },
          ].map(k => (
            <div key={k.id} style={{ background: 'rgba(255,255,255,0.1)', border: '0.5px solid rgba(255,255,255,0.18)', borderLeft: '3px solid #d4af37', borderRadius: 3, padding: '12px 14px' }}>
              <div style={{ fontSize: 9, color: '#d4af37', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4 }}>
                {k.label}
              </div>
              <div id={k.id} style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>0</div>
              <div style={{ fontSize: 10, color: '#9abf9a', marginTop: 3 }}>{k.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Crisis banner */}
      <div style={{ background: '#fff8e1', borderTop: '0.5px solid #f0d060', borderBottom: '0.5px solid #f0d060', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 20, color: '#fff' }}>⚠️</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#7a5800' }}>Alerte active — Incidents CNSS &amp; ANCFCC 2025</div>
          <div style={{ fontSize: 12, color: '#9a6e00', marginTop: 3 }}>Des milliers d&apos;administrations restent exposées. Lancez un scan de votre infrastructure dès maintenant.</div>
        </div>
        <Link href="/scanner" style={{ marginLeft: 'auto', background: '#b8860b', color: '#fff', fontSize: 12, fontWeight: 700, padding: '10px 18px', borderRadius: 3, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block' }}>
          Lancer un diagnostic
        </Link>
      </div>

      {/* Modules */}
      <div style={{ padding: '32px 32px', background: '#f5f5f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a5c2a', whiteSpace: 'nowrap' }}>Modules de la plateforme</h2>
          <div style={{ fontSize: 11, background: '#1a5c2a', color: '#fff', padding: '3px 10px', borderRadius: 2 }}>4 modules</div>
          <div style={{ flex: 1, height: 1, background: '#c8d8b0' }} />
          <span style={{ fontSize: 12, color: '#888' }}>Open-source · MIT License</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { title: 'Scanner de vulnérabilités', sub: 'OpenVAS · Nmap · Nuclei', desc: "Détection automatique des failles exploitables sur les infrastructures gouvernementales. Corrélation CVE en temps réel, tests OWASP Top 10, scoring CVSS v3.1.", tag: 'Disponible', color: 'green', href: '/scanner' },
            { title: 'Conformité DGSSI / CNDP', sub: 'ISO 27001 · Scoring temps réel', desc: "Score de conformité global (0–100) par administration avec mapping automatique vers les contrôles DGSSI, ISO 27001 et CNDP. Alertes et rapports réglementaires.", tag: 'Disponible', color: 'gold', href: '/conformite' },
            { title: 'Simulateur phishing Darija', sub: 'IA Ollama · 20+ templates', desc: "Premier simulateur de phishing en Darija marocain au monde. Campagnes contextualisées CNSS, DGI, Barid Al-Maghrib. Formation automatique post-clic.", tag: 'Innovation', color: 'gold', href: '/phishing' },
            { title: 'Réponse aux incidents', sub: '5 playbooks · ELK Stack · CNDP', desc: "Playbooks automatisés ransomware, fuite, DDoS. Workflow d'escalade RSSI→DGSSI. Collecte forensique, timeline d'attaque, rapport CNDP 72h automatique.", tag: 'Disponible', color: 'green', href: '/incidents' },
          ].map((m) => {
            const isGold = m.color === 'gold';
            return (
              <div key={m.title} style={{ background: '#fff', border: '0.5px solid #d4dfd4', borderRadius: 4, borderTop: `3px solid ${isGold ? '#b8860b' : '#1a5c2a'}`, padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 3 }}>{m.title}</div>
                <div style={{ fontSize: 11, color: '#999', marginBottom: 10 }}>{m.sub}</div>
                <div style={{ fontSize: 12, color: '#555', lineHeight: 1.65, marginBottom: 14 }}>{m.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, background: isGold ? '#fdf7e8' : '#eef5ee', color: isGold ? '#b8860b' : '#1a5c2a', padding: '3px 9px', borderRadius: 2, fontWeight: 700 }}>
                    {m.tag}
                  </span>
                  <Link href={m.href} style={{ fontSize: 12, color: '#1a5c2a', fontWeight: 700, textDecoration: 'none' }}>
                    Accéder →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '0 32px 32px', background: '#f5f5f0' }}>
        <div style={{ background: '#fff', border: '0.5px solid #d4dfd4', borderRadius: 4, padding: 18 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1a5c2a', marginBottom: 12, paddingBottom: 8, borderBottom: '0.5px solid #e8efe8' }}>
            Actualités cybersécurité
          </h3>
          {[
            { date: '12 Mai 2026', tag: 'Alerte', tagOr: true, text: 'Nouvelles vulnérabilités critiques détectées sur les portails ministériels' },
            { date: '10 Mai 2026', tag: 'DGSSI', tagOr: false, text: 'Mise à jour du référentiel de sécurité national — version 3.2' },
            { date: '08 Mai 2026', tag: 'Formation', tagOr: false, text: '1 248 agents formés au phishing via AmanGov ce mois' },
            { date: '05 Mai 2026', tag: 'Incident', tagOr: true, text: 'Rapport post-incident ANCFCC publié — recommandations CNDP' },
          ].map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '0.5px solid #f2f2f2' : undefined }}>
              <div style={{ fontSize: 11, color: '#999', minWidth: 70, flexShrink: 0 }}>{n.date}</div>
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.45 }}>
                <span style={{ fontSize: 9, background: n.tagOr ? '#fdf7e8' : '#eef5ee', color: n.tagOr ? '#b8860b' : '#1a5c2a', padding: '1px 6px', borderRadius: 2, marginRight: 4, fontWeight: 700 }}>{n.tag}</span>
                {n.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '0.5px solid #d4dfd4', borderRadius: 4, padding: 18 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1a5c2a', marginBottom: 12, paddingBottom: 8, borderBottom: '0.5px solid #e8efe8' }}>
            Cadre réglementaire
          </h3>
          {[
            { name: 'Stratégie Nationale Cybersécurité 2030', val: 'En vigueur' },
            { name: 'Référentiel DGSSI — Sécurité SI', val: 'v3.2 — 2026' },
            { name: 'Loi n°09-08 — Protection données', val: 'CNDP' },
            { name: 'ISO/IEC 27001:2022', val: 'Référence' },
            { name: 'OWASP Top 10 — 2025', val: 'Intégré' },
          ].map((r, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < arr.length - 1 ? '0.5px solid #f2f2f2' : undefined, fontSize: 12 }}>
              <div style={{ color: '#444', flex: 1 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: '#999' }}>{r.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1a5c2a', color: '#fff', padding: '28px 32px', display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ flex: 2, minWidth: 180 }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#d4af37', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.6 }}>AmanGov</h4>
          <p style={{ fontSize: 12, color: '#a0cca0', lineHeight: 1.9 }}>Bouclier Numérique des Administrations Publiques Marocaines. Plateforme open-source de cyber-hygiène automatisée.</p>
          <p style={{ marginTop: 8, color: '#d4af37', fontSize: 11 }}>MIT License · GitHub Open Source</p>
        </div>
        {[
          { title: 'Modules', links: [{l:'Scanner', h:'/scanner'}, {l:'Conformité DGSSI', h:'/conformite'}, {l:'Phishing Darija', h:'/phishing'}, {l:'Incidents', h:'/incidents'}] },
          { title: 'Réglementaire', links: [{l:'dgssi.gov.ma', h:'https://www.dgssi.gov.ma'}, {l:'cndp.ma', h:'https://www.cndp.ma'}, {l:'Stratégie 2030', h:'https://www.mmsp.gov.ma/fr/actualites/cliquez-ici-pour-d%C3%A9couvrir-la-strat%C3%A9gie-digital-morocco-2030'}, {l:'Loi 09-08', h:'https://cmmb.ma/wp-content/uploads/2014/06/texte-de-loi-09-0811.pdf'}] },
          { title: 'Contact', links: [{l:'Équipe AmanGov', h:'#'}, {l:'Documentation', h:'#'}, {l:'GitHub', h:'https://github.com/f3d4yn/AmanGov'}, {l:'Signaler un incident', h:'/incidents'}] },
        ].map(col => (
          <div key={col.title} style={{ flex: 1, minWidth: 130 }}>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: '#d4af37', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.6 }}>{col.title}</h4>
            {col.links.map(link => (
              <Link key={link.l} href={link.h} style={{ fontSize: 12, color: '#a0cca0', lineHeight: 1.9, display: 'block', textDecoration: 'none' }}>
                {link.l}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background: '#0d3d18', color: '#6a9a7a', padding: '11px 32px', fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
        <span>© 2026 AmanGov — Miathon&apos;03 · UMP Oujda · Ilyas · Abdessamad · Malak · Marwa · Imane</span>
        <div>
          <a href="#" style={{ color: '#6a9a7a', textDecoration: 'none', marginLeft: 16 }}>Mentions légales</a>
          <a href="#" style={{ color: '#6a9a7a', textDecoration: 'none', marginLeft: 16 }}>Confidentialité</a>
        </div>
      </div>
    </>
  );
}