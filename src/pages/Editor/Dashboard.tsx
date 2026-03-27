import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getEditorDashboard } from "../../api/articles.api";

const EditorDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getEditorDashboard().then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return null;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Editor Dashboard
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        <Box flex="1 1 260px">
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              Assigned
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Articles assigned to you for editorial review
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {stats.assigned}
            </Typography>
          </Paper>
        </Box>

        <Box flex="1 1 260px">
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              Under Review
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Articles currently being reviewed and evaluated
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {stats.underReview}
            </Typography>
          </Paper>
        </Box>

        <Box flex="1 1 260px">
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              Accepted
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Articles approved and accepted for publication
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {stats.accepted}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default EditorDashboard;
