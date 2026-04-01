import {
  Box,
  Typography,
  Link,
} from "@mui/material";


export default function Footer() {
  return (
    <Box sx={{ textAlign: "center", mr: "auto" }}>
      <Typography
        variant="caption"
        sx={{ color:   "#555" }}
      >
        Codium © 2026
      </Typography>
      <Box>
        <Link
          href="/privacy"
          variant="caption"
          sx={{ mr: 2, color: "#444" }}
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          variant="caption"
          sx={{ color: "#444" }}
        >
          Terms
        </Link>
      </Box>
    </Box>
  );
}
