import { Box, Typography, Paper } from "@mui/material";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Author Dashboard
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
              My Articles
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Articles you have submitted to the journal
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              0
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
              Articles currently being reviewed by editors
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              0
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
              Articles approved for publication
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              0
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
