import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import UsefulLinks from "../../components/common/UsefulLinks";
import CurrentIssue from "../Issues/CurrentIssue";
import { Link } from "react-router-dom";
import ResearchCallout from "../ResearchCallout/ResearchCallout";
import { getIssues } from "../../api/issues.api";

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
  const [issue, setIssue] = useState<Issue | null>(null);

  const fetchIssues = async () => {
    try {
      const res = await getIssues();

      // eng oxirgi issue (latest)
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
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "65vh", md: "95vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          backgroundImage: `
                        linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.3)),
                        url('https://yuz.uz/imageproxy/1200x/https://yuz.uz/file/news/2187687a3fdc6f8f5dfbabb583d8e806.jpg')
                    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            Journal of Khwarazm Information Technologies
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Xorazm axborot texnologiyalari jurnali
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/about"
            sx={{ mt: 4 }}
          >
            Batafsil
          </Button>
        </Container>
      </Box>

      {/* CURRENT ISSUE */}
      <Box sx={{ py: 4 }}>{issue && <CurrentIssue issue={issue} />}</Box>

      {/* CALL TO ACTION */}
      <Box sx={{ backgroundColor: "primary.main", py: 6 }}>
        <ResearchCallout />
      </Box>

      {/* LINKS */}
      <Box sx={{ py: 6 }}>
        <UsefulLinks />
      </Box>
    </Box>
  );
};

export default Home;
