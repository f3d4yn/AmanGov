import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AmanGov — Bouclier Numérique",
  description: "Plateforme de cybersécurité pour les administrations publiques marocaines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
