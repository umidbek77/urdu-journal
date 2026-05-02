import { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getEditorDashboard } from "../../api/articles.api";

const COLORS = ["#1976d2", "#ed6c02", "#2e7d32", "#d32f2f"];

const EditorDashboard = () => {
  const { t } = useTranslation();

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getEditorDashboard().then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return null;

  const total =
    stats.assigned + stats.underReview + stats.accepted + (stats.rejected || 0);

  const cards = [
    {
      title: t("editor.dashboard.assigned"),
      subtitle: t("editor.dashboard.assignedDesc"),
      value: stats.assigned,
      icon: <AssignmentIcon />,
    },
    {
      title: t("editor.dashboard.underReview"),
      subtitle: t("editor.dashboard.underReviewDesc"),
      value: stats.underReview,
      icon: <HourglassTopIcon />,
    },
    {
      title: t("editor.dashboard.accepted"),
      subtitle: t("editor.dashboard.acceptedDesc"),
      value: stats.accepted,
      icon: <CheckCircleIcon />,
    },
  ];

  const chartData = [
    { name: t("editor.dashboard.assigned"), value: stats.assigned },
    { name: t("editor.dashboard.underReview"), value: stats.underReview },
    { name: t("editor.dashboard.accepted"), value: stats.accepted },
    { name: t("editor.dashboard.rejected"), value: stats.rejected || 0 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        {t("editor.dashboard.title")}
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={2}>
        {cards.map((card, i) => (
          <Box key={i} sx={{ flex: "1 1 200px", minWidth: "200px" }}>
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
                },

                "&:hover .icon-box": {
                  transform: "scale(1.1)",
                  background: "rgba(25,118,210,0.15)",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="overline" fontWeight={600} fontSize={16}>
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
                  className="icon-box"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: "rgba(25,118,210,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1976d2",
                    transition: "0.25s",
                  }}
                >
                  {card.icon}
                </Box>
              </Stack>
            </Paper>
          </Box>
        ))}
      </Stack>

      <Box mt={2}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" mb={2} fontWeight={600}>
            {t("editor.dashboard.chartTitle")}
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={4}
          >
            <Box sx={{ width: 300, height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    innerRadius={55}
                  >
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>

                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 18, fontWeight: 700 }}
                  >
                    {total}
                  </text>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box flex={1} width="100%">
              <Stack spacing={1.5}>
                {chartData.map((item, i) => {
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
    </Box>
  );
};

export default EditorDashboard;
