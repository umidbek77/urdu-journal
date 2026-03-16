import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";

import { uploadArticle, submitArticle } from "../../api/articles.api";

const SubmitArticle = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = async () => {
    if (!file) return;

    try {

      const uploadRes = await uploadArticle(file);

      const fileUrl = uploadRes.data.url;

      await submitArticle({
        title,
        abstract,
        keywords,
        fileUrl
      });

      alert("Article submitted successfully");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Submit Article
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>

        <TextField
          label="Title"
          fullWidth
          sx={{ mb: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Abstract"
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />

        <TextField
          label="Keywords"
          fullWidth
          sx={{ mb: 2 }}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Submit Article
        </Button>

      </Paper>
    </Box>
  );
};

export default SubmitArticle;