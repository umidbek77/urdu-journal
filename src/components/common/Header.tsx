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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const isActive = (path: string) => location.pathname === path;

  const [langAnchor, setLangAnchor] = React.useState<null | HTMLElement>(null);

  const openLangMenu = (e: React.MouseEvent<HTMLElement>) =>
    setLangAnchor(e.currentTarget);

  const closeLangMenu = () => setLangAnchor(null);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    closeLangMenu();
  };

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
                mr: 1.5,
                flexShrink: 0,
              }}
            />

            <Box sx={{ lineHeight: 1.2 }}>
              <Typography
                variant={isMobile ? "subtitle2" : "h6"}
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                Journal of Khwarazm Information Technologies
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
              >
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
                onClick={handleClose}
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

                <MenuItem component={Link} to="/login">
                  <LoginIcon fontSize="small" sx={{ mr: 1 }} />
                  {t("auth.login")}
                </MenuItem>

                <MenuItem onClick={openLangMenu}>
                  <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                  {t("common.language")}
                </MenuItem>

                <Menu
                  anchorEl={langAnchor}
                  open={Boolean(langAnchor)}
                  onClose={closeLangMenu}
                >
                  <MenuItem onClick={() => changeLang("uz")}>
                    O‘zbek
                  </MenuItem>
                  <MenuItem onClick={() => changeLang("en")}>
                    English
                  </MenuItem>
                </Menu>
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

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                sx={{ ml: 2 }}
                startIcon={<LoginIcon />}
              >
                {t("auth.login")}
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={openLangMenu}
                sx={{ ml: 1 }}
                startIcon={<LanguageIcon />}
              >
                {t("common.language")}
              </Button>

              <Menu
                anchorEl={langAnchor}
                open={Boolean(langAnchor)}
                onClose={closeLangMenu}
              >
                <MenuItem onClick={() => changeLang("uz")}>
                  O‘zbek
                </MenuItem>
                <MenuItem onClick={() => changeLang("en")}>
                  English
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;