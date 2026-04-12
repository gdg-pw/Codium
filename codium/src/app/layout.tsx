import { Fira_Code } from "next/font/google";
import { StyledEngineProvider } from "@mui/material/styles";
import type { Metadata } from "next";

import "./globals.css";
import Navigation from "./shared/Navigation";
import { ThemeProvider } from "./shared/ThemeProvider";

const firaCode = Fira_Code({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codium - Learn to code with corgi!",
  description: "Codium is a fun and interactive way to learn coding.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={firaCode.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StyledEngineProvider injectFirst>
            <Navigation />
            {children}
          </StyledEngineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
