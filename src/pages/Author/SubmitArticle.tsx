import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { uploadArticle, submitArticle } from "../../api/articles.api";
import { translateEnum } from "../../utils/enumTranslator";

const categories = [
  "PROGRAMMING",
  "INFOCOMMUNICATION",
  "AI",
  "CRYPTOGRAPHY",
  "NETWORK",
  "INTELLIGENT_SYSTEMS",
];

const SubmitArticle = () => {
  const { t } = useTranslation();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!file || !title || !abstract || !keywords || !category) {
      setError(t("author.submit.validation"));
      return;
    }

    try {
      setLoading(true);

      const uploadRes = await uploadArticle(file);
      const fileUrl = uploadRes.data.url;

      await submitArticle({
        title,
        abstract,
        keywords,
        category,
        fileUrl,
      });

      setSuccess(t("author.submit.success"));

      setTitle("");
      setAbstract("");
      setKeywords("");
      setCategory("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(t("author.submit.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <Typography variant="h4" mb={2} fontWeight={700} textAlign="center">
          {t("author.submit.titlePage")}
        </Typography>

        <Paper
          sx={{
            p: 4,
            width: "100%",
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            boxShadow: "none",
          }}
        >
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label={t("author.submit.title")}
              fullWidth
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label={t("author.submit.abstract")}
              multiline
              rows={4}
              fullWidth
              size="small"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />

            <TextField
              label={t("author.submit.keywords")}
              fullWidth
              size="small"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />

            <TextField
              select
              label={t("author.submit.category")}
              fullWidth
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                   {translateEnum(t, "category", cat)}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="outlined"
              component="label"
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              {file ? file.name : t("author.submit.upload")}
              <input
                hidden
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                height: 42,
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                t("author.submit.submit")
              )}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default SubmitArticle;
