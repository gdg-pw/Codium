"use client";

import { Fira_Code } from "next/font/google";
import { useState } from "react";

import MainDrawer from "@/app/shared/MainDrawer";
import { StyledEngineProvider } from "@mui/material/styles";

import "./globals.css";
import Topbar from "./shared/Topbar";
import { ThemeProvider } from "./shared/ThemeProvider";

const firaCode = Fira_Code({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fira-code",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <html lang="pl" className={firaCode.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StyledEngineProvider injectFirst>
            <Topbar menuButtonCallback={() => setOpen(true)} />
            <MainDrawer
              state={open}
              setState={setOpen}
              isLoggedIn={isLoggedIn}
            />
            {children}
          </StyledEngineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
