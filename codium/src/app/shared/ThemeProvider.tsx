"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from 'next-themes/dist/types';

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const muiTheme = createTheme({
  typography: {
    fontFamily: 'var(--font-fira-code), monospace, sans-serif',
  },
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
      <NextThemesProvider {...props}>
        <MuiThemeProvider theme={muiTheme}>
          {children}
        </MuiThemeProvider>
      </NextThemesProvider>
  );
}