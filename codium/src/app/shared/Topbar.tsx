import {Box, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import {ThemeToggle} from "./ThemeToggle";
import styles from "./Topbar.module.css";

interface TopbarProps {
    menuButtonCallback: () => void;
}

export default function Topbar({menuButtonCallback}: TopbarProps) {
    return (
        <Box className={styles.topbar}>
            <IconButton onClick={menuButtonCallback}>
                <MenuIcon className={styles.menuIcon} />
            </IconButton>

            <Typography variant="h5" className={styles.title}>
                Codium
            </Typography>

            <ThemeToggle/>
            <Image alt="gdg_logo" src={"/gdg_logo.svg"} width={56} height={56}/>
        </Box>
    );
}
