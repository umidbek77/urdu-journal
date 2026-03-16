import { useState } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

import { api } from "../../api/axios";

const AdminIssues = () => {
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [year, setYear] = useState("");

  const handleCreate = async () => {
    await api.post("/issues", {
      volume: Number(volume),
      number: Number(number),
      year: Number(year),
    });

    setVolume("");
    setNumber("");
    setYear("");

    alert("Issue created");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Create Journal Issue
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <TextField
          label="Volume"
          fullWidth
          sx={{ mb: 2 }}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />

        <TextField
          label="Number"
          fullWidth
          sx={{ mb: 2 }}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <TextField
          label="Year"
          fullWidth
          sx={{ mb: 3 }}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <Button variant="contained" onClick={handleCreate}>
          Create Issue
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminIssues;
