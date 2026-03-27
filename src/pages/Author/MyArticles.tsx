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
} from "@mui/material";
import { getMyArticles } from "../../api/articles.api";

interface Article {
  id: string;
  title: string;
  status: string;
  createdAt: string;
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
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>

                <TableCell>
                  {new Date(article.createdAt).toLocaleDateString()}
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
