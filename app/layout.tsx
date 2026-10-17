import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./styles.css";
import "./brand.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Les Chats de Feelin’ Good",
  description: "Découvrez les chats à l’adoption et soutenez l’association Les Chats de Feelin’ Good, au Lédat en Lot-et-Garonne.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
