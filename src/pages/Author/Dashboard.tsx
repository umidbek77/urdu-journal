import { Box, Typography, Paper } from "@mui/material";

const Dashboard = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Author Dashboard
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flex="1 1 300px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" color="primary" fontWeight="bold">My Articles</Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Box>

        <Box flex="1 1 300px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" color="primary" fontWeight="bold">Under Review</Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Box>

        <Box flex="1 1 300px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" color="primary" fontWeight="bold">
              Accepted
            </Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
