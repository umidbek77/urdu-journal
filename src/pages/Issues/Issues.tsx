import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ArticleCard from "../../components/articles/ArticleCard";
import CustomBreadcrumbs from "../../components/ui/Breadcrumbs";
import UsefulLinks from "../../components/common/UsefulLinks";
import { api } from "../../api/axios";
import { useTranslation } from "react-i18next";

interface Issue {
  id: string;
  volume: number;
  number: number;
  year: number;
  series: string;
  publishedDate: string;
  coverImageUrl?: string;
}

const Issues: React.FC = () => {
  const { t } = useTranslation();

  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchIssues = async () => {
    try {
      const res = await api.get("/issues");
      setIssues(res.data);
    } catch (err) {
      console.error("Issues load error", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const sortedIssues = [...issues].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CustomBreadcrumbs currentPage={t("issues.pageTitle")} />

      <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>
        {t("issues.pageTitle")}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          {t("issues.total", { count: issues.length })}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {sortedIssues.map((issue) => (
          <Box
            key={issue.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.3333% - 16px)",
                lg: "calc(25% - 18px)",
              },
            }}
          >
            <ArticleCard issue={issue} />
          </Box>
        ))}
      </Box>

      <UsefulLinks />
    </Container>
  );
};

export default Issues;
