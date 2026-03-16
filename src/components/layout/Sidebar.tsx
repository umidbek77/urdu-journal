import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  if (!user) return null;

  let menu: any[] = [];

  if (user.role === "USER") {
    menu = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "My Articles", path: "/my-articles" },
      { label: "Submit Article", path: "/submit-article" },
      { label: "Profile", path: "/profile" },
    ];
  }

  if (user.role === "EDITOR") {
    menu = [
      { label: "Editor Dashboard", path: "/editor-dashboard" },
      { label: "Articles", path: "/editor-articles" },
      { label: "Profile", path: "/profile" },
    ];
  }

  if (user.role === "SUPER_ADMIN") {
    menu = [
      { label: "Dashboard", path: "/admin-dashboard" },
      { label: "Editors", path: "/editors" },
      { label: "Users", path: "/users" },
      { label: "Issues", path: "/issues-admin" },
      { label: "Publish", path: "/publish" },
      { label: "Profile", path: "/profile" },
    ];
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 260 : 140,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 260 : 115,
          boxSizing: "border-box",
          backgroundColor: "#1E3A5F",
          color: "white",
          transition: "0.3s",
          mt: "64px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          p: 2,
        }}
      >
        {open ? (
          <Typography fontWeight="bold">Journal KIT</Typography>
        ) : (
          <Typography fontWeight="bold">J-KIT</Typography>
        )}

        <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => navigate(item.path)}
            sx={{
              px: 3,
              "&:hover": {
                backgroundColor: "#274c77",
              },
            }}
          >
            <ListItemText
              primary={open ? item.label : item.label.charAt(0)}
              primaryTypographyProps={{
                fontWeight: "bold",
              }}
            />
          </ListItemButton>
        ))}


        <ListItemButton
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          sx={{
            px: 3,
            "&:hover": {
              backgroundColor: "#274c77",
            },
          }}
        >
          <ListItemText
            primary={open ? "Logout" : "L"}
            primaryTypographyProps={{
              fontWeight: "bold",
            }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
