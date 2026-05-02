import { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DescriptionIcon from "@mui/icons-material/Description";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import { useTranslation } from "react-i18next";

import { getAdminDashboard } from "../../api/admin.api";
import { api } from "../../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f", "#9c27b0"];

const AdminDashboard = () => {
  const { t } = useTranslation();

  const [stats, setStats] = useState<any>(null);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    getAdminDashboard().then((res) => {
      setStats(res.data);
    });

    api.get("/admin/stats/articles-status").then((res) => {
      const raw = res.data || [];

      const formatted = raw.map((item: any) => ({
        name: t(`enums.status.${item.status}`),
        value: item.count,
      }));

      setStatusData(formatted);
    });

    api.get("/admin/stats/articles-monthly").then((res) => {
      const raw = res.data || [];

      const formatted = raw.map((item: any) => ({
        month: item.month,
        count: item.count,
      }));

      setMonthlyData(formatted);
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
      <Typography variant="h4" mb={2} fontWeight={700}>
        {t("admin.dashboard.title")}
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={2} mb={3}>
        {cards.map((card, i) => (
          <Box key={i} sx={{ flex: "1 1 180px", minWidth: "180px" }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                transition: "all 0.25s ease",
                cursor: "pointer",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  borderColor: "#d0d7e2",
                },

                "&:hover .icon-box": {
                  transform: "scale(1.1)",
                  background: "rgba(25,118,210,0.15)",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="overline" fontWeight={600} fontSize={15}>
                    {card.title}
                  </Typography>

                  <Typography variant="inherit" color="text.secondary" mb={1}>
                    {card.subtitle}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: "rgba(25,118,210,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1976d2",
                    transition: "all 0.25s ease",
                  }}
                >
                  {card.icon}
                </Box>
              </Stack>
            </Paper>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={2}>
        <Box sx={{ flex: "3 1 300px" }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={600} mb={2}>
              {t("admin.dashboard.statusChart")}
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              gap={4}
            >
              <Box sx={{ width: 300, height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      innerRadius={55}
                    >
                      {statusData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontSize: 18, fontWeight: 700 }}
                    >
                      {statusData.reduce((acc, cur) => acc + cur.value, 0)}
                    </text>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Box flex={1} width="100%">
                <Stack spacing={1.5}>
                  {statusData.map((item, i) => {
                    const total = statusData.reduce(
                      (acc, cur) => acc + cur.value,
                      0,
                    );

                    const percent =
                      total > 0 ? Math.round((item.value / total) * 100) : 0;

                    return (
                      <Stack
                        key={i}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          "&:hover": {
                            background: "#f5f6fa",
                          },
                        }}
                      >
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              background: COLORS[i % COLORS.length],
                            }}
                          />

                          <Typography fontWeight={500}>{item.name}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" gap={2}>
                          <Typography fontWeight={600}>{item.value}</Typography>

                          <Typography color="text.secondary">
                            {percent}%
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Box>

        <Box sx={{ flex: "2 1 630px" }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={600} mb={2}>
              {t("admin.dashboard.monthlyChart")}
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1976d2"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default AdminDashboard;
