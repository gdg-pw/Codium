"use client";

import { Fira_Code } from "next/font/google";
import { useState } from "react";

import MainDrawer from "@/app/shared/MainDrawer";
import { StyledEngineProvider } from "@mui/material/styles";

import "./globals.css";
import Topbar from "./shared/Topbar";

const firaCode = Fira_Code({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fira-code",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <html lang="pl" className={firaCode.variable}>
      <body>
        <StyledEngineProvider injectFirst>
          <MainDrawer state={open} setState={setOpen} isLoggedIn={isLoggedIn} />
          <Topbar menuButtonCallback={() => setOpen(true)}/>
          {children}
        </StyledEngineProvider>
      </body>
    </html>
  );
}
