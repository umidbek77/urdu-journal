import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import UsefulLinks from "../../components/common/UsefulLinks";
import CurrentIssue from "../Issues/CurrentIssue";
import { Link } from "react-router-dom";
import ResearchCallout from "../ResearchCallout/ResearchCallout";
import { getIssues } from "../../api/issues.api";
import { useTranslation } from "react-i18next";

interface Issue {
  id: string;
  year: number;
  number: number;
  series: string;
  publishedDate: string;
  coverImageUrl?: string;
  pdfUrl?: string;
}

const Home: React.FC = () => {
  const { t } = useTranslation();

  const [issue, setIssue] = useState<Issue | null>(null);

  const fetchIssues = async () => {
    try {
      const res = await getIssues();
      const latest = res.data?.[res.data.length - 1];
      setIssue(latest);
    } catch (err) {
      console.error("Issue load error", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: { xs: "55vh", sm: "60vh", md: "75vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
            url('https://yuz.uz/imageproxy/1200x/https://yuz.uz/file/news/2187687a3fdc6f8f5dfbabb583d8e806.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", px: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 1,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
              lineHeight: 1.1,
              letterSpacing: 1.5,
            }}
          >
            {t("home.hero.title")}
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 4,
              color: "white",
              textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 500,
            }}
          >
            {t("home.hero.subtitle")}
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/about"
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              px: 3,
              py: 1,
            }}
          >
            {t("home.hero.button")}
          </Button>
        </Container>
      </Box>

      <Box sx={{ py: 4 }}>{issue && <CurrentIssue issue={issue} />}</Box>

      <Box sx={{ backgroundColor: "primary.main", py: 6 }}>
        <ResearchCallout />
      </Box>

      <Box sx={{ py: 6 }}>
        <UsefulLinks />
      </Box>
    </Box>
  );
};

export default Home;
