import { useEffect, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

import BaseDataTable from "../../components/ui/table/BaseDataTable";
import { api } from "../../api/axios";

const AdminPublished = () => {
  const { t } = useTranslation();

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/articles/published?page=1&limit=15");

      const data = res.data?.data || [];

      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const columns = [
    { field: "title", headerName: t("admin.publish.title") },

    {
      field: "status",
      headerName: t("admin.publish.status"),
      render: (row: any) => (
        <Chip label={row.status} color="success" size="small" />
      ),
    },

    {
      field: "issue",
      headerName: t("admin.publish.issue"),
      render: (row: any) =>
        row.issue ? `${row.issue.volume}-${row.issue.number}` : "-",
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2} fontWeight={700}>
        {t("admin.publish.titleText")}
      </Typography>

      <BaseDataTable columns={columns} rows={articles} loading={loading} />
    </Box>
  );
};

export default AdminPublished;
