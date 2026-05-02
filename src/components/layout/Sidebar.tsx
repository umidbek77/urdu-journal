import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PublishIcon from "@mui/icons-material/Publish";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EditIcon from "@mui/icons-material/Edit";

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
      {
        label: t("sidebar.user.dashboard"),
        path: "/dashboard",
        icon: <DashboardIcon />,
      },
      {
        label: t("sidebar.user.myArticles"),
        path: "/my-articles",
        icon: <ArticleIcon />,
      },
      {
        label: t("sidebar.user.submit"),
        path: "/submit-article",
        icon: <PublishIcon />,
      },
      {
        label: t("sidebar.user.profile"),
        path: "/profile",
        icon: <AccountCircleIcon />,
      },
    ];
  }

  if (user.role === "EDITOR") {
    menu = [
      {
        label: t("sidebar.editor.dashboard"),
        path: "/editor-dashboard",
        icon: <DashboardIcon />,
      },
      {
        label: t("sidebar.editor.articles"),
        path: "/editor-articles",
        icon: <EditIcon />,
      },
      {
        label: t("sidebar.editor.profile"),
        path: "/profile",
        icon: <AccountCircleIcon />,
      },
    ];
  }

  if (user.role === "SUPER_ADMIN") {
    menu = [
      {
        label: t("sidebar.admin.dashboard"),
        path: "/admin-dashboard",
        icon: <DashboardIcon />,
      },
      {
        label: t("sidebar.admin.articles"),
        path: "/admin-articles",
        icon: <ArticleIcon />,
      },
      {
        label: t("sidebar.admin.editors"),
        path: "/editors",
        icon: <AdminPanelSettingsIcon />,
      },
      { label: t("sidebar.admin.users"), path: "/users", icon: <PeopleIcon /> },
      {
        label: t("sidebar.admin.issues"),
        path: "/issues-admin",
        icon: <LibraryBooksIcon />,
      },
      {
        label: t("sidebar.admin.publish"),
        path: "/publish",
        icon: <PublishIcon />,
      },
      {
        label: t("sidebar.admin.published"),
        path: "/published",
        icon: <ArticleIcon />,
      },
      {
        label: t("sidebar.admin.profile"),
        path: "/profile",
        icon: <AccountCircleIcon />,
      },
    ];
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 260 : 90,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 260 : 90,
          boxSizing: "border-box",
          backgroundColor: "#1E3A5F",
          color: "white",
          transition: "0.3s",
          mt: "64px",
          overflowX: "hidden",
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
          <Box display="flex" alignItems="center" gap={1}>
            <LibraryBooksIcon />
            <Typography fontWeight="bold">{t("sidebar.title")}</Typography>
          </Box>
        ) : (
          <LibraryBooksIcon />
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
              px: 2,
              justifyContent: open ? "initial" : "center",
              "&:hover": {
                backgroundColor: "#274c77",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: 0,
                mr: open ? 2 : 0,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>

            {open && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: "bold",
                }}
              />
            )}
          </ListItemButton>
        ))}

        <ListItemButton
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          sx={{
            px: 2,
            justifyContent: open ? "initial" : "center",
            "&:hover": {
              backgroundColor: "#274c77",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "white",
              minWidth: 0,
              mr: open ? 2 : 0,
              justifyContent: "center",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          {open && (
            <ListItemText
              primary={t("sidebar.logout")}
              primaryTypographyProps={{
                fontWeight: "bold",
              }}
            />
          )}
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
