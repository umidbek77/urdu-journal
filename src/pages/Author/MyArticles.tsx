import { useEffect, useState } from "react";
import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import BaseDataTable from "../../components/ui/table/BaseDataTable";
import { getMyArticles, uploadPayment } from "../../api/articles.api";

interface Article {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  reviewFileUrl?: string;
  paymentReceiptUrl?: string;
}

const MyArticles = () => {
  const { t } = useTranslation();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await getMyArticles();
      setArticles(res.data || []);
    } catch (err) {
      console.error("Articles load error", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePaymentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadPayment(id, file);
      fetchArticles();
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();

    if (s === "ACCEPTED") return "success";
    if (s === "REJECTED") return "error";
    if (s === "PUBLISHED") return "primary";
    return "default";
  };

  const columns = [
    {
      field: "title",
      headerName: t("author.articles.title"),
    },
    {
      field: "status",
      headerName: t("author.articles.status"),
      render: (row: Article) => (
        <Chip
          label={row.status}
          color={getStatusColor(row.status) as any}
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: t("author.articles.date"),
      render: (row: Article) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: t("author.articles.actions"),
      render: (row: Article) => {
        const isAccepted = row.status?.toUpperCase() === "ACCEPTED";
        const hasPaid = !!row.paymentReceiptUrl;

        return (
          <Stack direction="row" spacing={1}>
            {isAccepted && !hasPaid && (
              <Button
                variant="contained"
                component="label"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                {t("author.articles.upload")}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handlePaymentUpload(e, row.id)}
                />
              </Button>
            )}

            {hasPaid && (
              <Chip
                label={t("author.articles.paid")}
                color="success"
                size="small"
              />
            )}
          </Stack>
        );
      },
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2} fontWeight={700}>
        {t("author.articles.titlePage")}
      </Typography>

      <BaseDataTable columns={columns} rows={articles} loading={loading} />
    </Box>
  );
};

export default MyArticles;
