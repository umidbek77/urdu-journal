import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import { api } from "../../api/axios";

const AdminIssues = () => {
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [year, setYear] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [series, setSeries] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      formData.append("volume", volume);
      formData.append("number", number);
      formData.append("year", year);
      formData.append("publishedDate", publishedDate);
      formData.append("series", series);

      if (file) {
        formData.append("file", file);
      }

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      await api.post("/issues", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVolume("");
      setNumber("");
      setYear("");
      setPublishedDate("");
      setSeries("");
      setFile(null);
      setCoverImage(null);

      alert("Issue created successfully 🚀");
    } catch (err) {
      console.error(err);
      alert("Error creating issue");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Create Journal Issue
      </Typography>

      <Paper
        sx={{
          p: 3,
          maxWidth: 500,
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          boxShadow: "none",
        }}
      >
        <TextField
          label="Volume"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />

        <TextField
          label="Number"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <TextField
          label="Year"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <TextField
          label="Published Date"
          type="date"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
        />

        <TextField
          label="Series"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={series}
          onChange={(e) => setSeries(e.target.value)}
        />
        <Stack direction="row" justifyContent={'space-between'} spacing={2} mb={2}>
          <Button
            variant="outlined"
            component="label"
            sx={{
              mb: 2,
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            {file ? file.name : "Upload Issue PDF"}
            <input
              hidden
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </Button>

          <Button
            variant="outlined"
            component="label"
            sx={{
              mb: 2,
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            {coverImage ? coverImage.name : "Upload Cover Image"}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setCoverImage(e.target.files[0]);
                }
              }}
            />
          </Button>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
          }}
          onClick={handleCreate}
        >
          Create Issue
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminIssues;
