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
          mb: 4,
          textAlign: "center",
          color: theme.palette.primary.dark,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {t("issue.current")}
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          background: gradientBackground,
          border: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
            alignItems: "center",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: 260 } }}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",

                boxShadow: "0 6px 18px rgba(0,0,0,0.18)",

                border: `2px solid ${theme.palette.common.white}`,
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

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              color="secondary"
              sx={{
                fontWeight: 700,
                mb: 1,
                letterSpacing: 1,
              }}
            >
              {t("issue.volume")} {currentIssue.year} | {t("issue.number")}{" "}
              {currentIssue.number}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              {currentIssue.series || t("issue.noSeries")}
            </Typography>

            <Typography
              sx={{
                mb: 2.5,
                color: "text.secondary",
              }}
            >
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
                borderRadius: "8px",
                px: 3,
                py: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
