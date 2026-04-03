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
        py:"1rem",
        px:"2rem",
        gap: "1.5rem",

        bgcolor: "var(--white)",

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
          fontWeight: "var(--fw-medium)",
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
