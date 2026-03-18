import type { Metadata } from "next";
import { Fira_Code } from 'next/font/google';
import './globals.css';

const firaCode = Fira_Code({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Codium",
  description: "Created by GDG PW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={firaCode.variable}>
      <body>{children}</body>
    </html>
  );
}
