import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PdfViewerModal from "../../components/ui/PdfViewerModal";
import { useTranslation } from "react-i18next";

interface Issue {
  id: string;
  year: number;
  number: number;
  series: string;
  publishedDate: string;
  coverImageUrl?: string;
  pdfUrl?: string;
}

interface Props {
  issue: Issue;
}

const CurrentIssue: React.FC<Props> = ({ issue }) => {
  const { t } = useTranslation();
  const currentIssue = issue;
  const theme = useTheme();

  if (!currentIssue) return null;

  const gradientBackground = `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");

  const handleOpenPdf = () => {
    if (!currentIssue.pdfUrl) {
      alert(t("issue.noPdf"));
      return;
    }

    const safeUrl = encodeURI(currentIssue.pdfUrl);

    setCurrentPdfUrl(safeUrl);
    setCurrentPdfTitle(
      t("issue.title", {
        year: currentIssue.year,
        number: currentIssue.number,
      }),
    );
    setIsModalOpen(true);
  };

  const handleClosePdf = () => {
    setIsModalOpen(false);
    setCurrentPdfUrl("");
    setCurrentPdfTitle("");
  };

  return (
    <Container maxWidth="lg" sx={{ my: { xs: 2, md: 1 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 5,
          textAlign: "center",
          color: theme.palette.primary.dark,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {t("issue.current")}
      </Typography>

      <Paper
        elevation={10}
        sx={{
          p: { xs: 2, sm: 4, md: 6 },
          borderRadius: 3,
          background: gradientBackground,
          border: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          {/* COVER */}
          <Box sx={{ width: { xs: "100%", md: 300 } }}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "8px 8px 20px rgba(0, 0, 0, 0.4)",
                border: `4px solid ${theme.palette.common.white}`,
              }}
            >
              <img
                src={currentIssue.coverImageUrl || "/img_1.png"}
                alt="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          {/* INFO */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              color="secondary"
              sx={{
                fontWeight: 900,
                mb: 1,
              }}
            >
              {t("issue.volume")} {currentIssue.year} | {t("issue.number")}{" "}
              {currentIssue.number}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              {currentIssue.series || t("issue.noSeries")}
            </Typography>

            <Typography sx={{ mb: 3 }}>
              {t("issue.published")}:{" "}
              {currentIssue.publishedDate
                ? new Date(currentIssue.publishedDate).toLocaleDateString()
                : t("issue.unknown")}
            </Typography>

            <Button
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={handleOpenPdf}
              disabled={!currentIssue.pdfUrl}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "10px",
              }}
            >
              {t("issue.viewPdf")}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* MODAL */}
      <PdfViewerModal
        open={isModalOpen}
        onClose={handleClosePdf}
        pdfUrl={currentPdfUrl}
        title={currentPdfTitle}
      />
    </Container>
  );
};

export default CurrentIssue;
