import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DescriptionIcon from "@mui/icons-material/Description";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import { useTranslation } from "react-i18next";

import { getAdminDashboard } from "../../api/admin.api";

const AdminDashboard = () => {
  const { t } = useTranslation();

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getAdminDashboard().then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return null;

  const cards = [
    {
      title: t("admin.dashboard.users"),
      subtitle: t("admin.dashboard.usersDesc"),
      value: stats.users,
      icon: <PeopleIcon />,
    },
    {
      title: t("admin.dashboard.editors"),
      subtitle: t("admin.dashboard.editorsDesc"),
      value: stats.editors,
      icon: <AdminPanelSettingsIcon />,
    },
    {
      title: t("admin.dashboard.articles"),
      subtitle: t("admin.dashboard.articlesDesc"),
      value: stats.articles,
      icon: <DescriptionIcon />,
    },
    {
      title: t("admin.dashboard.published"),
      subtitle: t("admin.dashboard.publishedDesc"),
      value: stats.published,
      icon: <PublishedWithChangesIcon />,
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        {t("admin.dashboard.title")}
      </Typography>

      {/* 🔥 CARDS */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
      >
        {cards.map((card, i) => (
          <Box
            key={i}
            sx={{
              flex: "1 1 220px",
              minWidth: "220px",
            }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                transition: "0.2s",
                cursor: "pointer",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                  >
                    {card.subtitle}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    background: "rgba(25,118,210,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1976d2",
                  }}
                >
                  {card.icon}
                </Box>
              </Stack>
            </Paper>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default AdminDashboard;