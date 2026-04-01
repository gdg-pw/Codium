"use client";

import { Fira_Code } from "next/font/google";
import {  IconButton } from "@mui/material";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import MainDrawer from "@/app/shared/MainDrawer";

import "./globals.css";

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
        <MainDrawer state={open} setState={setOpen} isLoggedIn={isLoggedIn} />

        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 24, 
            left: 24, 
            zIndex: 1000, 
          }}
        >
          <MenuIcon sx={{ fontSize: "2.5rem", color:"var(--gray)" }} />
        </IconButton>

        {children}
      </body>
    </html>
  );
}
