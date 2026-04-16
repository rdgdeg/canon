import type { Metadata } from "next";
import { Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Ducasse du Canon — ATH (Faubourg de Tournai)",
  description:
    "Programme des festivités — 113ème Ducasse du Canon à Ath (Faubourg de Tournai), du 10 au 13 juillet 2026.",
  openGraph: {
    title: "Ducasse du Canon — ATH",
    description:
      "Programme des festivités — 10, 11, 12 et 13 juillet 2026 (Faubourg de Tournai, Ath).",
    images: [{ url: "/affiche.png", width: 1600, height: 2048, alt: "Affiche" }],
    type: "website",
    locale: "fr_BE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
