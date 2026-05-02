import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PdfViewerModalProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  open,
  onClose,
  pdfUrl,
  title,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const isUrlValid = pdfUrl && pdfUrl !== "#";

  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    pdfUrl,
  )}&embedded=true`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      aria-labelledby="pdf-viewer-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          height: "90vh",
          maxHeight: 900,
        },
      }}
    >
      <DialogTitle
        id="pdf-viewer-dialog-title"
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {isUrlValid ? (
          <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            <iframe
              src={googleViewerUrl}
              title={title}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                background: "rgba(255,255,255,0.95)",
                borderRadius: 2,
                px: 2,
                py: 1,
              }}
            >
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", fontWeight: 600 }}
              >
                PDF ochish ↗
              </a>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="error">
              PDF manzili mavjud emas yoki noto'g'ri kiritilgan.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;
