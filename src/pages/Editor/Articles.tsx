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

  const loadArticles = () => {
    getSubmittedArticles().then((res) => {
      setArticles(res.data);
    });
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleReview = async (id: string, status: string) => {
    await reviewArticle(id, {
      status,
      feedback: "Reviewed by editor",
    });

    loadArticles();
  };

  const handlePreview = (url: string) => {
    setSelectedFile(url);
    setOpenPreview(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Articles For Review
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>

              <TableCell>Status</TableCell>

              <TableCell>Review</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.map((a) => (
              <TableRow key={a.id}>
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
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    onClick={() => handleReview(a.id, "ACCEPTED")}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
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
