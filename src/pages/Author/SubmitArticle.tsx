import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

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
        fileUrl,
      });

      alert("Article submitted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Submit Article
      </Typography>

      <Paper
        sx={{
          p: 4,
          maxWidth: 600,
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          boxShadow: "none",
        }}
      >
        <TextField
          label="Title"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Abstract"
          multiline
          rows={4}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />

        <TextField
          label="Keywords"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <Box
          sx={{
            mt: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Upload Article File
          </Typography>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </Box>

        <Button
          variant="outlined"
          sx={{
            mt: 2,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            px: 2.5,
          }}
          onClick={handleSubmit}
        >
          Submit Article
        </Button>
      </Paper>
    </Box>
  );
};

export default SubmitArticle;
