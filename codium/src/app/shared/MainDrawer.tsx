import {useState} from "react";
import {useRouter} from "next/navigation";

import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Divider,
    Box,
    Typography,
    Button,
} from "@mui/material";

import {
    ExpandLess,
    ExpandMore,
    Search,
    Celebration,
    Event,
    Group,
    Home,
    GitHub,
} from "@mui/icons-material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Image from "next/image";

import styles from "./MainDrawer.module.css";

interface MainDrawerProps {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
    isLoggedIn: boolean
}

interface MenuItem {
    label: string,
    icon: React.ElementType,
    onClick?: () => void,
    children?: MenuItem[],
}

type OpenMenusHashMap = { [key: string]: boolean }

const initialOpen: OpenMenusHashMap = {};


const MainDrawer = ({state, setState, isLoggedIn}: MainDrawerProps) => {

    const router = useRouter();

    const [open, setOpen] = [state, setState];
    const [openMenus, setOpenMenus] = useState<OpenMenusHashMap>(initialOpen);

    const handleToggle = (label: string) => {
        setOpenMenus((prev) => ({...prev, [label]: !prev[label]}));
    };

    const renderMenuItems = (items: MenuItem[], nested: boolean = false) =>
        items.map(({label, icon: Icon, onClick, children}: MenuItem, index: number) => (
            <div key={label}>
                {!nested && index !== 0 && (
                    <Divider variant="middle" component="li" sx={{my: "0.5rem", borderColor: "var(--text-secondary)" }}/>
                )}

                {nested && (
                    <Divider variant="inset" component="li" sx={{my: "0.5rem", borderColor: "var(--text-secondary)" }}/>
                )}

                <ListItemButton
                    className={`${styles.listItemButton} ${nested ? styles.listItemButtonNested : ""}`}
                    disableRipple
                    onClick={() => {
                        if (children) {
                            handleToggle(label);
                        } else if (onClick != null) {
                            onClick();
                            setOpen(false);
                        }
                    }}
                >
                    <ListItemIcon sx={{color: "inherit"}}>
                        <Icon sx={{fontSize: "2rem", color: "inherit"}}/>
                    </ListItemIcon>
                    <ListItemText primary={label}/>
                    {children ? openMenus[label] ? <ExpandLess/> : <ExpandMore/> : null}
                </ListItemButton>

                {children && (
                    <Collapse in={openMenus[label]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {renderMenuItems(children, true)}
                        </List>
                    </Collapse>
                )}
            </div>
        ));


    const logButton = () => {
        const text = isLoggedIn ? "Logout" : "Login";
        const logButtonHandler = isLoggedIn
            ? () => {
                /* logout logic */
                setOpen(false);
            }
            : () => {
                router.push("/login");
                setOpen(false);
            };

        return (
            <Button
                disableRipple
                className={styles.logButton}
                onClick={logButtonHandler}
            >
                <Typography fontSize={"large"} fontWeight={"bold"}>
                    {text}
                </Typography>
            </Button>
        );
    };

    const menuItems: MenuItem[] = [
        {
            label: "Home",
            icon: Home,
            onClick: () => router.push("/"),
        },
        {
            label: "Play",
            icon: SportsEsportsIcon,
            onClick: () => router.push("/"),
        },
        {
            label: "Sandbox",
            icon: WidgetsIcon,
            onClick: () => router.push("/"),
        },
        {
            label: "What we do",
            icon: Search,
            children: [
                {
                    label: "Past Events",
                    icon: Celebration,
                    onClick: () => router.push("/"),
                },
                {
                    label: "Scheduled events",
                    icon: Event,
                    onClick: () => router.push("/"),
                },
                {
                    label: "About Team",
                    icon: Group,
                    onClick: () => router.push("/"),
                },
            ],
        },
        {
            label: "Github page",
            icon: GitHub,
            onClick: () => router.push("https://github.com/gdg-pw"),
        },
    ];

    return (
        <Drawer 
            open={open} 
            onClose={() => setOpen(false)}
        >
            <Box className={styles.box}>
                <Image width={150} height={90} src={"/gdg_logo.svg"} alt="GDG Logo"/>
                <List sx={{width: "100%"}}>{renderMenuItems(menuItems)}</List>
                {logButton()}
            </Box>
        </Drawer>
    );
};

export default MainDrawer;
