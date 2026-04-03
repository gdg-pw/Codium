import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

interface TopbarProps {
  menuButtonCallback: () => void;
}

export default function Topbar({ menuButtonCallback }: TopbarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        pr: "4rem",
        gap: "1.5rem",

        position: "fixed",
        top: 24,
        left: 24,
        zIndex: 1000,
      }}
    >
      <IconButton onClick={menuButtonCallback}>
        <MenuIcon sx={{ fontSize: "2.5rem", color: "var(--gray)" }} />
      </IconButton>

      <Typography
        variant="h5"
        sx={{
          fontSize: "var(--fs-title2)",
          fontWeight: "vat(--fw-bold)",
          alignContent: "center",
          color: "black",
          mr: "auto",
        }}
      >
        Codium
      </Typography>

      <Image alt="gdg_logo" src={"/gdg_logo.svg"} width={56} height={56} />
    </Box>
  );
}
