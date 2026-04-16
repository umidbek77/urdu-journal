import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { getSubmittedArticles, reviewArticle } from "../../api/articles.api";

const EditorArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});

  const loadArticles = () => {
    getSubmittedArticles().then((res) => {
      setArticles(res.data);
    });
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleFileChange = (id: string, file: File) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [id]: file,
    }));
  };

  const handleReview = async (id: string, status: string) => {
    const file = selectedFiles[id];

    await reviewArticle(id, {
      status,
      feedback: "Reviewed by editor",
      file,
    });

    loadArticles();
  };

  const handlePreview = (url: string) => {
    setSelectedFile(url);
    setOpenPreview(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Articles For Review
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Review</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.map((a) => (
              <TableRow key={a.id} hover>
                <TableCell>{a.title}</TableCell>

                <TableCell>{a.status}</TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handlePreview(a.fileUrl)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id={`file-${a.id}`}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileChange(a.id, e.target.files[0]);
                      }
                    }}
                  />

                  <label htmlFor={`file-${a.id}`}>
                    <Button
                      component="span"
                      variant="contained"
                      size="small"
                      sx={{
                        mr: 1,
                        textTransform: "none",
                        borderRadius: "10px",
                      }}
                    >
                      Upload Review
                    </Button>
                  </label>

                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{
                      mr: 1,
                      minWidth: "90px",
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "10px",
                    }}
                    onClick={() => handleReview(a.id, "ACCEPTED")}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      minWidth: "90px",
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "10px",
                    }}
                    onClick={() => handleReview(a.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ height: "80vh" }}>
          <iframe
            src={selectedFile}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Article Preview"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditorArticles;
