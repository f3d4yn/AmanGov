"use client";

import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import logsData from "@/data/logs.json";

interface Log {
  id: string;
  timestamp: string;
  level: "INFO" | "WARNING" | "ERROR";
  message: string;
  ip_source: string;
  service: string;
  user: string | null;
}

interface IpSuspecte {
  ip: string;
  niveau_risque: "CRITIQUE" | "ÉLEVÉ" | "MOYEN" | "FAIBLE";
  score_risque: number;
  raison: string;
  nb_incidents: number;
  recommandation: string;
}

interface Analyse {
  ips_suspectes: IpSuspecte[];
  resume: string;
  nb_alertes_critiques: number;
  nb_alertes_totales: number;
  action_immediate: string;
}

const logs: Log[] = logsData as Log[];

const levelColor: Record<string, string> = {
  INFO: "#1a5c2a",
  WARNING: "#b8860b",
  ERROR: "#c0392b",
};

const risqueBadge: Record<string, { bg: string; color: string }> = {
  CRITIQUE: { bg: "#fee2e2", color: "#991b1b" },
  "ÉLEVÉ":  { bg: "#fef9c3", color: "#854d0e" },
  MOYEN:    { bg: "#fef9ec", color: "#7f6000" },
  FAIBLE:   { bg: "#eef5ee", color: "#1a5c2a" },
};

function buildHourlyStats() {
  const hours: Record<string, { INFO: number; WARNING: number; ERROR: number }> = {};
  logs.forEach((l) => {
    const h = new Date(l.timestamp).getUTCHours();
    const key = `${String(h).padStart(2, "0")}h`;
    if (!hours[key]) hours[key] = { INFO: 0, WARNING: 0, ERROR: 0 };
    hours[key][l.level]++;
  });
  return Object.entries(hours)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([hour, counts]) => ({ hour, ...counts }));
}

export default function IncidentsPage() {
  const [analyse, setAnalyse] = useState<Analyse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeLog, setActiveLog] = useState<Log | null>(null);

  const errorCount = logs.filter((l) => l.level === "ERROR").length;
  const warnCount  = logs.filter((l) => l.level === "WARNING").length;
  const infoCount  = logs.filter((l) => l.level === "INFO").length;
  const hourlyStats = buildHourlyStats();
  const maxCount = Math.max(...hourlyStats.map((h) => h.INFO + h.WARNING + h.ERROR));

  useEffect(() => { runAnalysis(); }, []);

  async function runAnalysis() {
    setLoading(true);
    try {
      const res = await fetch("/api/siem/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs }),
      });
      const data = await res.json();
      setAnalyse(data.analyse);
    } catch {
      console.error("Analyse SIEM échouée");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout title="Module Incidents" currentPath="/incidents">
      <div style={{ padding: "32px" }}>
        <SectionHeader
          title="SIEM — Gestion des Incidents"
          badge={`${errorCount} Erreurs critiques`}
          note="Ollama • Détection temps réel"
        />

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total Logs",        value: logs.length, color: "#1a5c2a" },
            { label: "Erreurs critiques", value: errorCount,  color: "#c0392b" },
            { label: "Avertissements",    value: warnCount,   color: "#b8860b" },
            { label: "Événements INFO",   value: infoCount,   color: "#2980b9" },
          ].map(({ label, value, color }) => (
            <Card key={label} topColor={color === "#1a5c2a" ? "green" : "gold"}>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
              <p style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 700, color }}>{value}</p>
            </Card>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>

          {/* Graphique */}
          <Card topColor="green">
            <SectionHeader title="Alertes par heure" />
            <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "120px", marginBottom: "8px" }}>
              {hourlyStats.map(({ hour, INFO, WARNING, ERROR }) => {
                const total = INFO + WARNING + ERROR;
                const pct = maxCount > 0 ? (total / maxCount) * 100 : 0;
                return (
                  <div key={hour} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", height: `${pct}%`, minHeight: total > 0 ? "6px" : "0" }}>
                      {ERROR   > 0 && <div style={{ flex: ERROR,   background: "#c0392b", borderRadius: "3px 3px 0 0" }} />}
                      {WARNING > 0 && <div style={{ flex: WARNING, background: "#f39c12" }} />}
                      {INFO    > 0 && <div style={{ flex: INFO,    background: "#1a5c2a" }} />}
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "#999" }}>{hour}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[["ERROR", "#c0392b"], ["WARNING", "#f39c12"], ["INFO", "#1a5c2a"]].map(([lbl, color]) => (
                <span key={lbl} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#555" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
                  {lbl}
                </span>
              ))}
            </div>
          </Card>

          {/* Résumé IA */}
          <Card topColor="gold">
            <SectionHeader title="🤖 Analyse IA — Résumé" />
            {loading ? (
              <LoadingSpinner text="Ollama analyse les logs…" />
            ) : analyse ? (
              <>
                <p style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.6, marginBottom: "1rem" }}>{analyse.resume}</p>
                <div style={{ background: "#fee2e2", border: "1px solid #e74c3c", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                  <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 700, color: "#c0392b", textTransform: "uppercase" }}>⚠ Action immédiate</p>
                  <p style={{ margin: "4px 0 0", fontSize: "0.875rem", color: "#7f0000" }}>{analyse.action_immediate}</p>
                </div>
                <button onClick={runAnalysis} style={{ marginTop: "1rem", background: "#b8860b", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 16px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                  ↺ Relancer l&apos;analyse
                </button>
              </>
            ) : (
              <p style={{ color: "#aaa" }}>En attente d&apos;analyse…</p>
            )}
          </Card>
        </div>

        {/* Top IPs */}
        {analyse && (
          <Card topColor="gold" style={{ marginBottom: "32px" }}>
            <SectionHeader title="Top IPs Suspectes — Détection IA" />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {analyse.ips_suspectes.slice(0, 5).map((ip) => {
                const badge = risqueBadge[ip.niveau_risque] ?? risqueBadge["MOYEN"];
                return (
                  <div key={ip.ip} style={{ display: "grid", gridTemplateColumns: "160px 100px 60px 1fr auto", alignItems: "center", gap: "1rem", background: "#f8f9f8", borderRadius: "8px", padding: "0.75rem 1rem", border: "1px solid #e0e0d8" }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#1a1a1a" }}>{ip.ip}</span>
                    <span style={{ background: badge.bg, color: badge.color, borderRadius: "999px", padding: "2px 10px", fontSize: "0.75rem", fontWeight: 700, textAlign: "center" }}>{ip.niveau_risque}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: badge.color }}>{ip.score_risque}/100</span>
                    <span style={{ fontSize: "0.82rem", color: "#555" }}>{ip.raison}</span>
                    <span style={{ fontSize: "0.75rem", background: "#1a5c2a", color: "#fff", borderRadius: "4px", padding: "2px 8px", whiteSpace: "nowrap" }}>{ip.nb_incidents} incidents</span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Journal */}
        <Card topColor="green">
          <SectionHeader title={`Journal des événements (${logs.length} entrées)`} />
          <div style={{ fontFamily: "monospace", fontSize: "0.82rem" }}>
            {logs.map((log, i) => (
              <div key={log.id} onClick={() => setActiveLog(activeLog?.id === log.id ? null : log)}
                style={{ display: "grid", gridTemplateColumns: "180px 80px 130px 1fr", gap: "1rem", padding: "0.6rem 0", borderBottom: i < logs.length - 1 ? "1px solid #f0efe8" : "none", cursor: "pointer", background: activeLog?.id === log.id ? "#f5f5f0" : "transparent" }}>
                <span style={{ color: "#888" }}>{new Date(log.timestamp).toLocaleString("fr-MA")}</span>
                <span style={{ color: levelColor[log.level], fontWeight: 700, fontSize: "0.75rem" }}>{log.level}</span>
                <span style={{ color: "#2980b9" }}>{log.ip_source}</span>
                <span style={{ color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.message}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Log détail */}
        {activeLog && (
          <div style={{ position: "fixed", bottom: "2rem", right: "2rem", background: "#1a2a1a", color: "#c8e6c9", borderRadius: "12px", padding: "1.25rem 1.5rem", maxWidth: "400px", fontFamily: "monospace", fontSize: "0.82rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", zIndex: 100 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 700, color: "#d4af37" }}>{activeLog.id}</span>
              <button onClick={() => setActiveLog(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "1rem" }}>✕</button>
            </div>
            {Object.entries(activeLog).filter(([k]) => k !== "id").map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: "0.5rem", marginBottom: "4px" }}>
                <span style={{ color: "#81c784", minWidth: "80px" }}>{k}</span>
                <span style={{ color: "#e8f5e9" }}>{String(v ?? "—")}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
