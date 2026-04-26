import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import BaseDataTable from "../../components/ui/table/BaseDataTable";
import TableActions from "../../components/ui/table/TableActions";

import { getAcceptedArticles, publishArticle } from "../../api/admin.api";
import { api } from "../../api/axios";

import PdfViewerModal from "../../components/ui/PdfViewerModal";

const AdminPublish = () => {
  const { t } = useTranslation();

  const [articles, setArticles] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedIssue, setSelectedIssue] = useState("");

  const [publishModal, setPublishModal] = useState(false);

  const [openPdf, setOpenPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");

  const loadArticles = async () => {
    try {
      const res = await getAcceptedArticles();
      setArticles(res.data || []);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const loadIssues = async () => {
    const res = await api.get("/issues");
    setIssues(res.data || []);
  };

  useEffect(() => {
    loadArticles();
    loadIssues();
  }, []);

  const handleOpenPublish = (row: any) => {
    setSelectedArticle(row);
    setSelectedIssue("");
    setPublishModal(true);
  };

  const handlePublish = async () => {
    if (!selectedIssue) {
      alert(t("commo.selectIssue"));
      return;
    }

    try {
      await publishArticle(selectedArticle.id, selectedIssue);
      setPublishModal(false);
      loadArticles();
    } catch (err) {
      console.error(err);
      alert(t("commo.error"));
    }
  };

  const handleOpenPdf = (url?: string, title?: string) => {
    if (!url) return;

    setPdfUrl(encodeURI(url));
    setPdfTitle(title || "PDF");
    setOpenPdf(true);
  };

  const columns = [
    {
      field: "title",
      headerName: t("admin.publish.title"),
    },
    {
      field: "status",
      headerName: t("admin.publish.status"),
      render: (row: any) => (
        <Chip label={row.status} color="success" size="small" />
      ),
    },
    {
      field: "actions",
      headerName: t("commo.actions"),
      render: (row: any) => (
        <TableActions
          row={row}
          actions={[
            {
              label: t("admin.publish.publish"),
              onClick: () => handleOpenPublish(row),
            },
            {
              label: t("admin.publish.review"),
              onClick: () => handleOpenPdf(row.reviewFileUrl, "Review File"),
            },
            {
              label: t("admin.publish.payment"),
              onClick: () => handleOpenPdf(row.paymentReceiptUrl, "Payment"),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        {t("admin.publish.titlePage")}
      </Typography>

      <BaseDataTable columns={columns} rows={articles} loading={loading} />

      <Dialog open={publishModal} onClose={() => setPublishModal(false)}>
        <DialogTitle>{t("admin.publish.selectIssue")}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={2}>
            <TextField
              select
              label={t("admin.publish.issue")}
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              fullWidth
            >
              {issues.map((i) => (
                <MenuItem key={i.id} value={i.id}>
                  {i.volume}-{i.number} ({i.year})
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" onClick={handlePublish}>
              {t("admin.publish.publish")}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <PdfViewerModal
        open={openPdf}
        onClose={() => setOpenPdf(false)}
        pdfUrl={pdfUrl}
        title={pdfTitle}
      />
    </Box>
  );
};

export default AdminPublish;
