import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { translateEnum } from "../../utils/enumTranslator";

import { useTranslation } from "react-i18next";
import BaseDataTable from "../../components/ui/table/BaseDataTable";
import TableActions from "../../components/ui/table/TableActions";
import { api } from "../../api/axios";

const AdminArticles = () => {
  const { t } = useTranslation();

  const [articles, setArticles] = useState<any[]>([]);
  const [editors, setEditors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [assignModal, setAssignModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedEditor, setSelectedEditor] = useState("");

  const [viewModal, setViewModal] = useState(false);
  const [currentFile, setCurrentFile] = useState("");

  const loadArticles = async () => {
    try {
      const res = await api.get("/admin/articles");
      setArticles(res.data?.data || []);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const loadEditors = async () => {
    const res = await api.get("/admin/editors");
    setEditors(res.data?.data || []);
  };

  useEffect(() => {
    loadArticles();
    loadEditors();
  }, []);

  const handleAssign = (row: any) => {
    setSelectedArticle(row);
    setSelectedEditor("");
    setAssignModal(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedEditor) return;

    try {
      await api.patch(
        `/admin/articles/${selectedArticle.id}/assign/${selectedEditor}`,
      );

      setAssignModal(false);
      loadArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEditors = selectedArticle
    ? editors.filter((e) =>
        selectedArticle.category
          ? e.categories?.some(
              (c: string) =>
                c.toLowerCase() === selectedArticle.category.toLowerCase(),
            )
          : true,
      )
    : editors;

  const formatDate = (date: string) => new Date(date).toLocaleString();

  const handleView = (url: string) => {
    setCurrentFile(url);
    setViewModal(true);
  };

  const columns = [
    {
      field: "title",
      headerName: t("admin.articles.title"),
    },
    {
      field: "category",
      headerName: t("admin.articles.category"),
      render: (row: any) => translateEnum(t, "category", row.category),
    },
    {
      field: "createdAt",
      headerName: t("admin.articles.createdAt"),
      render: (row: any) => formatDate(row.createdAt),
    },
    {
      field: "updatedAt",
      headerName: t("admin.articles.updatedAt"),
      render: (row: any) => formatDate(row.updatedAt),
    },
    {
      field: "status",
      headerName: t("admin.articles.status"),
      render: (row: any) => <Chip label={translateEnum(t, "status", row.status)} size="small" />,
    },
    {
      field: "editor",
      headerName: t("admin.articles.editor"),
      render: (row: any) => row.editor?.name || "-",
    },
    {
      field: "actions",
      headerName: t("common.actions"),
      render: (row: any) => (
        <TableActions
          row={row}
          actions={[
            {
              label: t("common.view"),
              onClick: () => handleView(row.fileUrl),
            },
            {
              label: t("admin.articles.assign"),
              onClick: () => handleAssign(row),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        {t("admin.articles.titlePage")}
      </Typography>

      <BaseDataTable columns={columns} rows={articles} loading={loading} />

      <Dialog
        open={assignModal}
        onClose={() => setAssignModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("admin.articles.assignEditor")}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={2}>
            <TextField
              select
              label={t("admin.articles.editor")}
              value={selectedEditor}
              onChange={(e) => setSelectedEditor(e.target.value)}
              fullWidth
            >
              {filteredEditors.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" onClick={handleAssignSubmit}>
              {t("admin.articles.assign")}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={viewModal}
        onClose={() => setViewModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              currentFile,
            )}&embedded=true`}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminArticles;
