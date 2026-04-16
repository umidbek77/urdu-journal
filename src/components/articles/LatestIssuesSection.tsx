import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { api } from "../../api/axios";

interface Issue {
  id: string;
  number: number;
  year: number;
  series: string;
  publishedDate: string;
  coverImageUrl?: string;
}

const LatestIssuesSection: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchIssues = async () => {
    try {
      const res = await api.get("/issues");

      const sorted = res.data.sort(
        (a: Issue, b: Issue) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      );

      setIssues(sorted.slice(0, 3));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 700, mb: 4, color: "primary.main" }}
      >
        Latest Issues
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {issues.map((issue) => (
          <Box
            key={issue.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.3333% - 16px)",
              },
              maxWidth: 300,
            }}
          >
            <ArticleCard issue={issue} />
          </Box>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Button
          variant="outlined"
          size="large"
          href="/issues"
          sx={{ fontWeight: 600 }}
        >
          View All Issues
        </Button>
      </Box>
    </Container>
  );
};

export default LatestIssuesSection;
