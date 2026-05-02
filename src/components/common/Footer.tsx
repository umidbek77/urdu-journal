import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "../../utils/mockData";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const footerNav = [
    { title: t("footer.nav.about"), path: "/about" },
    { title: t("footer.nav.issues"), path: "/issues" },
    { title: t("footer.nav.editorial"), path: "/editorial-board" },
    { title: t("footer.nav.authors"), path: "/for-authors" },
    { title: t("footer.nav.contact"), path: "/contacts" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#1E3A5F",
        color: "white",
        pt: 6,
        pb: 2,
        borderTop: "5px solid #FFCC00",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            rowGap: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: "33%" },
              textDecoration: "none",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
            component={Link}
            to="/"
          >
            <Box
              component="img"
              src="https://urdu.uz/martxa/martxa/assets/images/logoursu.png"
              alt="Universitet Logosi"
              sx={{
                height: { xs: 40, md: 45 },
                mr: 1.5,
                transition: "0.3s",
              }}
            />
            <Box sx={{ lineHeight: 1.2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Journal of Khwarazm Information Technologies
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.9, display: "block", color: "white" }}
              >
                Xorazm axborot texnologiyalari jurnali
              </Typography>
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "33%" }, textAlign: "left" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                borderBottom: "2px solid #FFCC00",
                display: "inline-block",
                pb: 0.5,
              }}
            >
              {t("footer.quickLinks")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 0.8,
                mt: 1,
              }}
            >
              {footerNav.map((item) => (
                <MuiLink
                  key={item.title}
                  component={Link}
                  to={item.path}
                  underline="none"
                  color="inherit"
                  sx={{
                    fontSize: "0.9rem",
                    opacity: 0.85,
                    transition: "0.3s",
                    "&:hover": {
                      color: "#FFCC00",
                      opacity: 1,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {item.title}
                </MuiLink>
              ))}
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "33%" } }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                borderBottom: "2px solid #FFCC00",
                display: "inline-block",
                pb: 0.5,
              }}
            >
              {t("footer.contact")}
            </Typography>

            <Box sx={{ mt: 1 }}>
              {[
                { icon: <PhoneIcon />, text: CONTACT_INFO.phone },
                { icon: <EmailIcon />, text: CONTACT_INFO.email },
                { icon: <LocationOnIcon />, text: CONTACT_INFO.address },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    transition: "0.3s",
                    "&:hover": {
                      color: "#FFCC00",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { mr: 1, fontSize: 18 },
                  })}
                  <Typography variant="body2">{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.2)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {t("footer.copy", { year: new Date().getFullYear() })}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 0.5,
              borderRadius: 2,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <LanguageIcon fontSize="small" />
            <Typography variant="caption">
              {i18n.language === "uz" ? "O‘zbekcha" : "English"}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
