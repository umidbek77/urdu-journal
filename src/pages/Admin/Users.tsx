import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import BaseDataTable from "../../components/ui/table/BaseDataTable";

import { getUsers } from "../../api/admin.api";

const AdminUsers = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Users fetch error", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: t("admin.users.name"),
    },
    {
      field: "email",
      headerName: t("admin.users.email"),
    },
    {
      field: "affiliation",
      headerName: t("admin.users.affiliation"),
      render: (row: any) => row.affiliation || "-",
    },
    {
      field: "createdAt",
      headerName: t("admin.users.created"),
      render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2} fontWeight={700}>
        {t("admin.users.title")}
      </Typography>

      <BaseDataTable columns={columns} rows={users} loading={loading} />
    </Box>
  );
};

export default AdminUsers;
