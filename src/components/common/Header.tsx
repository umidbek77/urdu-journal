import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  MenuItem,
  Menu,
  useMediaQuery,
  useTheme,
  Container,
  Divider,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isSmallDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const navItems = [
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.issues"), path: "/issues" },
    { name: t("nav.editorial"), path: "/editorial-board" },
    { name: t("nav.authors"), path: "/for-authors" },
    { name: t("nav.contacts"), path: "/contacts" },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = React.useState<null | HTMLElement>(null);
  const [userMenu, setUserMenu] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const openLangMenu = (e: React.MouseEvent<HTMLElement>) =>
    setLangAnchor(e.currentTarget);

  const closeLangMenu = () => setLangAnchor(null);

  const openUserMenu = (e: React.MouseEvent<HTMLElement>) =>
    setUserMenu(e.currentTarget);

  const closeUserMenu = () => setUserMenu(null);

  const handleLogout = () => {
    logout();
    closeUserMenu();
    window.location.href = "/";
  };

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    closeLangMenu();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={2}
      sx={{
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
        zIndex: theme.zIndex.appBar + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 1, sm: 2 },
            py: { xs: 1, lg: 0.5 },
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
              flexShrink: 0,
              mr: 2,
            }}
          >
            <Box
              component="img"
              src="https://urdu.uz/martxa/martxa/assets/images/logoursu.png"
              alt="Universitet Logosi"
              sx={{
                height: { xs: 35, md: 45 },
                mr: 1.2,
              }}
            />

            <Box sx={{ lineHeight: 1.2 }}>
              <Typography
                variant={isMobile ? "subtitle2" : "h6"}
                sx={{ fontWeight: "bold" }}
              >
                Journal of Khorezm Information Technologies
              </Typography>
              <Typography variant="inherit" color="text.secondary">
                Xorazm axborot texnologiyalari jurnali
              </Typography>
            </Box>
          </Box>

          {isSmallDesktop ? (
            <Box>
              <IconButton size="large" onClick={handleMenu} color="primary">
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    component={Link}
                    to={item.path}
                    selected={isActive(item.path)}
                  >
                    {item.name}
                  </MenuItem>
                ))}

                <Divider />

                {!user ? (
                  <MenuItem component={Link} to="/login">
                    <LoginIcon sx={{ mr: 1 }} />
                    {t("auth.login")}
                  </MenuItem>
                ) : (
                  <MenuItem
                    component={Link}
                    to={
                      user.role === "USER"
                        ? "/dashboard"
                        : user.role === "EDITOR"
                          ? "/editor-dashboard"
                          : "/admin-dashboard"
                    }
                  >
                    {t("auth.dashboard")}
                  </MenuItem>
                )}

                <MenuItem onClick={openLangMenu}>
                  <LanguageIcon sx={{ mr: 1 }} />
                  {t("common.language")}
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  color={isActive(item.path) ? "secondary" : "primary"}
                  sx={{
                    mx: 0.3,
                    px: 1,
                    fontWeight: 600,
                    borderBottom: isActive(item.path)
                      ? `2px solid ${theme.palette.secondary.main}`
                      : "none",
                  }}
                >
                  {item.name}
                </Button>
              ))}

              {!user && (
                <IconButton component={Link} to="/login" sx={{ ml: 1 }}>
                  <LoginIcon />
                </IconButton>
              )}

              <IconButton onClick={openLangMenu} sx={{ ml: 1 }}>
                <LanguageIcon />
              </IconButton>

              <Menu
                anchorEl={langAnchor}
                open={Boolean(langAnchor)}
                onClose={closeLangMenu}
              >
                <MenuItem onClick={() => changeLang("uz")}>O‘zbek</MenuItem>
                <MenuItem onClick={() => changeLang("en")}>English</MenuItem>
                <MenuItem onClick={() => changeLang("ru")}>Русский</MenuItem>
              </Menu>

              {user && (
                <>
                  <IconButton onClick={openUserMenu} sx={{ ml: 1 }}>
                    {user.avatarUrl ? (
                      <Avatar
                        src={user.avatarUrl}
                        sx={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <AccountCircleIcon />
                    )}
                  </IconButton>

                  <Menu
                    anchorEl={userMenu}
                    open={Boolean(userMenu)}
                    onClose={closeUserMenu}
                  >
                    <MenuItem component={Link} to="/profile">
                      {t("profile.title")}
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to={
                        user.role === "USER"
                          ? "/dashboard"
                          : user.role === "EDITOR"
                            ? "/editor-dashboard"
                            : "/admin-dashboard"
                      }
                    >
                      {t("auth.dashboard")}
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>
                      {t("auth.logout")}
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
