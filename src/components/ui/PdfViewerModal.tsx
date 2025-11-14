import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PdfViewerModalProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ open, onClose, pdfUrl, title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const isUrlValid = pdfUrl && pdfUrl !== '#';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      aria-labelledby="pdf-viewer-dialog-title"
      sx={{ '& .MuiDialog-paper': { height: '90vh', maxHeight: 900 } }}
    >
      <DialogTitle id="pdf-viewer-dialog-title" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {isUrlValid ? (
          <Box sx={{ width: '100%', height: '100%' }}>
            <iframe
              src={pdfUrl}
              title={title}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Box>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="error">
              PDF manzili mavjud emas yoki noto'g'ri kiritilgan. Iltimos, manzilni tekshiring.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;