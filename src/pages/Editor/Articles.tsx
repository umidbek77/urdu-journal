import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Chip,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useTranslation } from "react-i18next";

import BaseDataTable from "../../components/ui/table/BaseDataTable";

import { reviewArticle } from "../../api/articles.api";
import { api } from "../../api/axios";

const EditorArticles = () => {
  const { t } = useTranslation();

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openPreview, setOpenPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});

  const [confirm, setConfirm] = useState<{
    open: boolean;
    id: string;
    status: string;
  }>({ open: false, id: "", status: "" });

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const loadArticles = async () => {
  try {
    const res = await api.get("/articles/editor/articles");
    setArticles(res.data || []);
  } catch {
    setArticles([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadArticles();
  }, []);

  const handleFileChange = (id: string, file: File) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [id]: file,
    }));
  };

  const handleConfirmOpen = (id: string, status: string) => {
    setConfirm({ open: true, id, status });
  };

  const handleConfirmClose = () => {
    setConfirm({ open: false, id: "", status: "" });
  };

  const handleReview = async () => {
    try {
      const file = selectedFiles[confirm.id];

      await reviewArticle(confirm.id, {
        status: confirm.status,
        feedback: "Reviewed by editor",
        file,
      });

      setSnackbar({
        open: true,
        type: "success",
        message: t("editor.articles.success"),
      });

      loadArticles();
    } catch {
      setSnackbar({
        open: true,
        type: "error",
        message: t("editor.articles.error"),
      });
    } finally {
      handleConfirmClose();
    }
  };

  const handlePreview = (url: string) => {
    setSelectedFile(url);
    setOpenPreview(true);
  };

  const getStatusColor = (status: string) => {
    if (status === "ACCEPTED") return "success";
    if (status === "REJECTED") return "error";
    return "warning";
  };

  const columns = [
    {
      field: "title",
      headerName: t("editor.articles.title"),
    },
    {
      field: "status",
      headerName: t("editor.articles.status"),
      render: (row: any) => (
        <Chip
          label={row.status}
          color={getStatusColor(row.status)}
          size="small"
        />
      ),
    },
    {
      field: "preview",
      headerName: t("editor.articles.preview"),
      render: (row: any) => (
        <IconButton color="primary" onClick={() => handlePreview(row.fileUrl)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: t("editor.articles.actions"),
      render: (row: any) => {
        const hasFile = !!selectedFiles[row.id];

        return (
          <Stack direction="row" spacing={1}>
            <input
              type="file"
              hidden
              id={`file-${row.id}`}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileChange(row.id, e.target.files[0]);
                }
              }}
            />

            <label htmlFor={`file-${row.id}`}>
              <Button
                component="span"
                size="small"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                {t("editor.articles.upload")}
              </Button>
            </label>

            <Button
              size="small"
              color="success"
              variant="contained"
              disabled={!hasFile}
              sx={{ textTransform: "none", borderRadius: 2 }}
              onClick={() => handleConfirmOpen(row.id, "ACCEPTED")}
            >
              {t("editor.articles.accept")}
            </Button>

            <Button
              size="small"
              color="error"
              variant="outlined"
              disabled={!hasFile}
              sx={{ textTransform: "none", borderRadius: 2 }}
              onClick={() => handleConfirmOpen(row.id, "REJECTED")}
            >
              {t("editor.articles.reject")}
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2} fontWeight={700}>
        {t("editor.articles.titlePage")}
      </Typography>

      <BaseDataTable columns={columns} rows={articles} loading={loading} />

      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ height: "80vh" }}>
          <iframe
            src={selectedFile}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Article Preview"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={confirm.open} onClose={handleConfirmClose}>
        <DialogContent>
          <Typography mb={2}>{t("editor.articles.confirm")}</Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleReview}>
              {t("editor.articles.yes")}
            </Button>

            <Button variant="outlined" onClick={handleConfirmClose}>
              {t("editor.articles.cancel")}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.type as any}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default EditorArticles;
