import {
  Box,
} from "@mui/material";

export default function GradientLine() {
  return (
    <Box
      sx={{
        height: "4px",
        borderRadius: 2,
        mb: 3,
        background:
          "linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335)",
      }}
    />
  );
}
