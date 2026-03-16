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
} from "@mui/material";

import { getAcceptedArticles, publishArticle } from "../../api/admin.api";

const AdminPublish = () => {
  const [articles, setArticles] = useState<any[]>([]);

  const loadArticles = () => {
    getAcceptedArticles().then((res) => {
      setArticles(res.data);
    });
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handlePublish = async (id: string) => {
    const issueId = prompt("Enter issue id");

    if (!issueId) return;

    await publishArticle(id, issueId);

    loadArticles();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Accepted Articles
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Publish</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.title}</TableCell>

                <TableCell>{a.status}</TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handlePublish(a.id)}
                  >
                    Publish
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminPublish;
