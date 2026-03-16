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
      <Typography variant="h4" mb={3}>
        Editor Dashboard
      </Typography>

      <Box display="flex" gap={3}>
        <Box flex="1">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Assigned</Typography>
            <Typography variant="h4">{stats.assigned}</Typography>
          </Paper>
        </Box>

        <Box flex="1">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Under Review</Typography>
            <Typography variant="h4">{stats.underReview}</Typography>
          </Paper>
        </Box>

        <Box flex="1">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Accepted</Typography>
            <Typography variant="h4">{stats.accepted}</Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default EditorDashboard;
