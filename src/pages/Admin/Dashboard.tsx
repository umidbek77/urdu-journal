import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getAdminDashboard } from "../../api/admin.api";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getAdminDashboard().then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return null;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Admin Dashboard
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        <Box flex="1 1 220px">
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              Users
            </Typography>
            <Typography variant="body2" fontWeight={'600'} color="text.secondary" mb={2}>
              All registered users
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {stats.users}
            </Typography>
          </Paper>
        </Box>

        <Box flex="1 1 220px">
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              Editors
            </Typography>
            <Typography variant="body2" fontWeight={'600'} color="text.secondary" mb={2}>
              Editors with access
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {stats.editors}
            </Typography>
          </Paper>
        </Box>

        <Box flex="1 1 220px">
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              Articles
            </Typography>
            <Typography variant="body2" fontWeight={'600'} color="text.secondary" mb={2}>
              Total articles submitted
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {stats.articles}
            </Typography>
          </Paper>
        </Box>

        <Box flex="1 1 220px">
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              Published
            </Typography>
            <Typography variant="body2" fontWeight={'600'} color="text.secondary" mb={2}>
              Published articles
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {stats.published}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
