import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { AppStateProvider } from "@/components/providers/app-state";
import { AppShell } from "@/components/app-shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Preserve | MVP per la gestione intelligente del cibo",
  description: "Un MVP moderno e pronto per demo che riduce gli sprechi alimentari, fa risparmiare tempo e ottimizza la nutrizione."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <AppStateProvider>
          <AppShell>{children}</AppShell>
        </AppStateProvider>
      </body>
    </html>
  );
}
