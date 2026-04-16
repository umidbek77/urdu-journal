import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { getMyArticles, uploadPayment } from "../../api/articles.api";

interface Article {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  reviewFileUrl?: string;
  paymentReceiptUrl?: string;
}

const MyArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    try {
      const res = await getMyArticles();
      setArticles(res.data);
    } catch (err) {
      console.error("Articles load error", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePaymentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadPayment(id, file);
      fetchArticles(); // refresh
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "#16a34a";
      case "REJECTED":
        return "#dc2626";
      case "PUBLISHED":
        return "#2563eb";
      default:
        return "#64748b";
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        My Articles
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.map((article) => (
              <TableRow
                key={article.id}
                hover
                sx={{
                  "& td": {
                    fontWeight: 500,
                    borderBottom: "1px solid #f1f5f9",
                  },
                }}
              >
                <TableCell>{article.title}</TableCell>

                <TableCell>
                  <Chip
                    label={article.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: getStatusColor(article.status),
                      color: "#fff",
                    }}
                  />
                </TableCell>

                <TableCell>
                  {new Date(article.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  {article.status === "ACCEPTED" &&
                    !article.paymentReceiptUrl && (
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                      >
                        Upload Payment
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handlePaymentUpload(e, article.id)}
                        />
                      </Button>
                    )}

                  {article.paymentReceiptUrl && (
                    <Button
                      variant="outlined"
                      size="small"
                      href={article.paymentReceiptUrl}
                      target="_blank"
                    >
                      View Receipt
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyArticles;
