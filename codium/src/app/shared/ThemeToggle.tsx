"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderIconButton = () => {
    const switchTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    const icon =
      theme === "dark" ? (
        <LightMode fontSize="inherit" />
      ) : (
        <DarkMode fontSize="inherit" />
      );

    return (
      <IconButton size="large" disableRipple onClick={switchTheme}
        sx={{
          color: "var(--text-main)"
        }}
        >
        {icon}
      </IconButton>
    );
  };

  return <>{renderIconButton()}</>;
}
