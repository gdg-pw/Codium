import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  IconButton,
  Typography,
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

const initialOpen = {};

const MainDrawer = ({ state, setState, isLoggedIn }) => {
  const [open, setOpen] = [state, setState];
  const [openMenus, setOpenMenus] = useState(initialOpen);

  const router = useRouter();

  const handleToggle = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderMenuItems = (items, nested = false) =>
    items.map(({ label, icon: Icon, onClick, children }, index) => (
      <div key={label}>
        {!nested && index !== 0 && (
          <Divider variant="middle" component="li" sx={{ my: "0.5rem" }} />
        )}

        {nested && (
          <Divider variant="inset" component="li" sx={{ my: "0.5rem" }} />
        )}

        <ListItemButton
          disableRipple
          sx={{
            ml: nested ? 4 : 0,
            borderRadius: "12px",
            "&:hover": { color: "primary.main" },
          }}
          onClick={() => {
            if (children) {
              handleToggle(label);
            } else {
              onClick();
              setOpen(false);
            }
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Icon sx={{ fontSize: "2rem", color: "inherit" }} />
          </ListItemIcon>
          <ListItemText primary={label} />
          {children ? openMenus[label] ? <ExpandLess /> : <ExpandMore /> : null}
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
    var text = isLoggedIn ? "Logout" : "Login";

    return (
      <IconButton
        disableRipple
        variant="none"
        onClick={
          isLoggedIn
            ? () => {
                /* logout logic */
                setOpen(false);
              }
            : () => {
                router.push("/login");
                setOpen(false);
              }
        }
        sx={{
          mt: "auto",
          mx: "1rem",
          mb: "3rem",
          px: "3rem",
          bgcolor: "background.paper",
          border: "2px solid",
          borderRadius: "12px",
          borderColor: "background.paperBorder",

          "&:hover": {
            borderColor: "primary.dim",
          },
        }}
      >
        <Typography variant="h5" sx={{ px: "1rem" }}>
          {text}
        </Typography>
      </IconButton>
    );
  };

  const menuItems = [
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
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box
        p={"1rem"}
        height={"100%"}
        bgcolor={"background.default"}
        borderRight={"1px solid"}
        borderColor={"background.defaultBorder"}
        width={"250px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Image width={150} height={90} src={"/gdg_logo.svg"} alt="GDG Logo"/>
        <List sx={{ width: "100%" }}>{renderMenuItems(menuItems)}</List>
        {logButton()}
      </Box>
    </Drawer>
  );
};

export default MainDrawer;
