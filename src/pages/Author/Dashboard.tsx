import { Box, Typography, Paper, Stack } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#1976d2", "#ed6c02", "#2e7d32"];

const Dashboard = () => {
  const { t } = useTranslation();

  const stats = {
    total: 0,
    review: 0,
    accepted: 0,
  };

  const cards = [
    {
      title: t("author.dashboard.total"),
      subtitle: t("author.dashboard.totalDesc"),
      value: stats.total,
      icon: <DescriptionIcon />,
    },
    {
      title: t("author.dashboard.review"),
      subtitle: t("author.dashboard.reviewDesc"),
      value: stats.review,
      icon: <HourglassTopIcon />,
    },
    {
      title: t("author.dashboard.accepted"),
      subtitle: t("author.dashboard.acceptedDesc"),
      value: stats.accepted,
      icon: <CheckCircleIcon />,
    },
  ];

  const chartData = [
    { name: t("author.dashboard.total"), value: stats.total },
    { name: t("author.dashboard.review"), value: stats.review },
    { name: t("author.dashboard.accepted"), value: stats.accepted },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        {t("author.dashboard.title")}
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
            {t("author.dashboard.chart")}
          </Typography>

          <Box sx={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
