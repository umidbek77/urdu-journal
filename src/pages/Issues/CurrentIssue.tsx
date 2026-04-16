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
  const currentIssue = issue;
  const theme = useTheme();

  if (!currentIssue) return null;

  const gradientBackground = `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");

  const handleOpenPdf = () => {
    setCurrentPdfUrl(currentIssue.pdfUrl || "");
    setCurrentPdfTitle(`Jurnal ${currentIssue.year} - ${currentIssue.number}`);
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
        Joriy Nashr
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

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              color="secondary"
              sx={{
                fontWeight: 900,
                mb: 1,
              }}
            >
              JILD {currentIssue.year} | SON {currentIssue.number}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              {currentIssue.series}
            </Typography>

            <Typography sx={{ mb: 3 }}>
              Nashr qilingan:{" "}
              {new Date(currentIssue.publishedDate).toLocaleDateString()}
            </Typography>

            <Button
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={handleOpenPdf}
            >
              PDF ko‘rish
            </Button>
          </Box>
        </Box>
      </Paper>

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
