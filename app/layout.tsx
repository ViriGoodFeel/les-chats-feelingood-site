import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Les Chats Feelingood",
  description: "Chats à l'adoption - administration simple et pages publiques automatiques.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
