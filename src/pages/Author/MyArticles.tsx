import { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
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
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        My Articles
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  <Chip label={article.status} color="primary" />
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