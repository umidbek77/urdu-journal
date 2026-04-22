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
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);

  if (!user) return null;

  let menu: any[] = [];

  if (user.role === "USER") {
    menu = [
      { label: t("sidebar.user.dashboard"), path: "/dashboard" },
      { label: t("sidebar.user.myArticles"), path: "/my-articles" },
      { label: t("sidebar.user.submit"), path: "/submit-article" },
      { label: t("sidebar.user.profile"), path: "/profile" },
    ];
  }

  if (user.role === "EDITOR") {
    menu = [
      { label: t("sidebar.editor.dashboard"), path: "/editor-dashboard" },
      { label: t("sidebar.editor.articles"), path: "/editor-articles" },
      { label: t("sidebar.editor.profile"), path: "/profile" },
    ];
  }

  if (user.role === "SUPER_ADMIN") {
    menu = [
      { label: t("sidebar.admin.dashboard"), path: "/admin-dashboard" },
      { label: t("sidebar.admin.editors"), path: "/editors" },
      { label: t("sidebar.admin.users"), path: "/users" },
      { label: t("sidebar.admin.issues"), path: "/issues-admin" },
      { label: t("sidebar.admin.publish"), path: "/publish" },
      { label: t("sidebar.admin.profile"), path: "/profile" },
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
          <Typography fontWeight="bold">{t("sidebar.title")}</Typography>
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
            primary={open ? t("sidebar.logout") : "L"}
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
