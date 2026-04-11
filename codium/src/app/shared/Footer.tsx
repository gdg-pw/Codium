import {
  Box,
  Typography,
  Link,
} from "@mui/material";


export default function Footer() {
  return (
    <Box sx={{ textAlign: "center"}}>
      <Typography
        variant="caption"
        sx={{ color:   "var(--text-secondary)" }}
      >
        Codium © 2026
      </Typography>
      <Box>
        <Link
          href="/privacy"
          variant="caption"
          sx={{ mr: 2, color: "var(--text-secondary)" }}
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          variant="caption"
          sx={{ color: "var(--text-secondary)" }}
        >
          Terms
        </Link>
      </Box>
    </Box>
  );
}
