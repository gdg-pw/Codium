"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Typography, Button, TextField, Link, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import GradientLine from "../shared/GradientLine";
import Footer from "../shared/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Attempting login:", { email, password });
    } else {
      console.log("Attempting register:", { email, password, confirmPassword });
    }
  };

  return (
    <Box className={styles.container}>

      {/* Header */}
      <Box className={styles.header}>

        <Box className={styles.logoSection}>
          <Image src="/gdg_logo.svg" alt="Codium Logo" width={120} height={120} priority />
          <Typography component="h1" className={styles.title}>
            Codium
          </Typography>
        </Box>
      </Box>

      {/* Gradient Line */}
      <Box className={styles.gradientWrapper}>
        <GradientLine />
      </Box>

      {/* Login Card */}
      <Paper elevation={3} className={styles.loginCard}>
        <Typography component="h2" className={styles.cardTitle}>
          {isLogin ? "Sign in" : "Create account"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputField}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            className={`${styles.btn} ${styles.btnSubmit}`}
          >
            {isLogin ? "Sign in" : "Register"}
          </Button>

          <Button
            fullWidth
            variant="contained"
            disableElevation
            className={`${styles.btn} ${styles.btnGoogle}`}
          >
            Sign in with Google
          </Button>
        </Box>

        {/* Auth Mode Switcher */}
        <Box className={styles.authSwitch}>
          <Typography component="span" className={styles.authSwitch}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          <Link
            component="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
            className={styles.authLink}
            underline="none"
          >
            {isLogin ? "Register" : "Sign in"}
          </Link>
        </Box>
      </Paper>

      {/* Footer */}
      <Box className={styles.footerWrapper}>
        <Footer />
      </Box>

    </Box>
  );
}