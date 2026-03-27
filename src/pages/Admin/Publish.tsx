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
  TextField,
  MenuItem,
} from "@mui/material";

import { getAcceptedArticles, publishArticle } from "../../api/admin.api";
import { api } from "../../api/axios";

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

  const [issues, setIssues] = useState<any[]>([]);
  const [selectedIssues, setSelectedIssues] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    api.get("/issues").then((res) => {
      setIssues(res.data);
    });
  }, []);

  const handlePublish = async (articleId: string) => {
    const issueId = selectedIssues[articleId];

    if (!issueId) {
      alert("Issue tanlang!");
      return;
    }

    try {
      await publishArticle(articleId, issueId);
      loadArticles();
    } catch (err) {
      console.error(err);
      alert("Publish error");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Accepted Articles
      </Typography>

      <Paper
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

              <TableCell sx={{ fontWeight: 700 }}>Issue</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Publish</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.map((a) => (
              <TableRow
                key={a.id}
                hover
                sx={{
                  "& td": {
                    fontWeight: 500,
                    borderBottom: "1px solid #f1f5f9",
                  },
                }}
              >
                <TableCell>{a.title}</TableCell>

                <TableCell>{a.status}</TableCell>

                <TableCell>
                  <TextField
                    select
                    size="small"
                    value={selectedIssues[a.id] || ""}
                    onChange={(e) =>
                      setSelectedIssues((prev) => ({
                        ...prev,
                        [a.id]: e.target.value,
                      }))
                    }
                    sx={{ minWidth: 180 }}
                  >
                    {issues.map((issue) => (
                      <MenuItem key={issue.id} value={issue.id}>
                        {issue.volume}-{issue.number} ({issue.year})
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "10px",
                      minWidth: "90px",
                    }}
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
