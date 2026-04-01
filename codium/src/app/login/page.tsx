"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import GradientLine from "@/app/shared/GradientLine";
import Footer from "@/app/shared/Footer";
import Image from "next/image";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from "next/navigation";

function LoginPageContent({ toggleTheme }: { toggleTheme: () => void }) {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.palette.mode === "dark";

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const routeToHome = () => {
    router.push("/")
  }

  // TODO: Temp, replace with real auth logic
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Attempting login:", { email, password });
    } else {
      console.log("Attempting register:", { email, password, confirmPassword });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        background: isDark
          ? "linear-gradient(135deg, #000000, #3a3a3a)"
          : "linear-gradient(135deg, #ffffff 0%, #ffffff 30%, #fdfdfd 50%, #bababa 100%)",
      }}
    >
      <Container maxWidth="xs">
        {/* Header */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Home button */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start", mt: 15 }}>
              <Button
                onClick={routeToHome}
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: 8,
                  textTransform: "capitalize",
                  px: 3,
                  py: 1.5,
                  fontSize: "0.9rem",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                <ArrowBackIosIcon/>
                Home
              </Button>
          </Box>

          {/* Logo */}
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Image src="/gdg_logo.svg" alt="Codium Logo" width={130} height={130} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: isDark ? "#fff" : "#000", mt: 1 }}
            >
              Codium
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? "#ccc" : "#555" }}>
              Welcome back
            </Typography>
          </Box>

          {/* Padding for Logo to be at center */}
          <Box sx={{ flex: 1 }} />
        </Box>


        <GradientLine/> 

        {/* Login Card */}
        <Paper
          elevation={10}
          sx={{
            padding: 3,
            borderRadius: 3,
            backgroundColor: isDark ? "#1c1c1c" : "#fff",
            color: isDark ? "#fff" : "#000",
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            sx={{ mb: 1.5, textAlign: "center", fontWeight: "bold" }}
          >
            {isLogin ? "Sign in" : "Create account"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  backgroundColor: isDark ? "#333" : "#f5f5f5",
                  color: isDark ? "#fff" : "#000",
                  borderRadius: 1.5,
                },
              }}
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
              InputProps={{
                sx: {
                  backgroundColor: isDark ? "#333" : "#f5f5f5",
                  color: isDark ? "#fff" : "#000",
                  borderRadius: 1.5,
                },
              }}
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
                InputProps={{
                  sx: {
                    backgroundColor: isDark ? "#333" : "#f5f5f5",
                    color: isDark ? "#fff" : "#000",
                    borderRadius: 1.5,
                  },
                }}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                mb: 1,
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: 8,
                textTransform: "capitalize",
                px: 3,
                py: 1.5,
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              {isLogin ? "Sign in" : "Register"}
            </Button>

            {/* Google sign in */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                background: "#1976d2",
                color: "#fff",
                borderRadius: 8,
                mt: 1,
                textTransform: "capitalize",
                px: 3,
                py: 1.5,
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Sign in with Google
            </Button>
          </Box>

          {/* Login/Register */}
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography variant="body2">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                sx={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {isLogin ? "Register" : "Sign in"}
              </Link>
            </Typography>
          </Box>
        </Paper>

        <Footer isDark={isDark}/>
      </Container>
    </Box>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = createTheme({
    palette: { mode },
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginPageContent toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}