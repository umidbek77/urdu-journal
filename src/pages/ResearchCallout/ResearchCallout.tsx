import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResearchCallout: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ my: { xs: 4, md: 8 } }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          borderLeft: `8px solid ${theme.palette.primary.main}`,
          transition: "box-shadow 0.4s",
          "&:hover": {
            boxShadow: `0 15px 35px rgba(0,0,0,0.2), 0 0 5px ${theme.palette.primary.light}`,
          },
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 2,
              textAlign: "center",
              color: theme.palette.primary.dark,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {t("research.title")}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
              fontWeight: 400,
              textAlign: "justify",
              lineHeight: 1.7,
            }}
          >
            {t("research.description")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/for-authors"
              sx={{
                fontWeight: 700,
                px: { xs: 3, md: 5 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              {t("research.button")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResearchCallout;
