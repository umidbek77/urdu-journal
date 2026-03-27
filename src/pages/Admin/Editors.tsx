import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";

import { getEditors, createEditor, deleteEditor } from "../../api/admin.api";

const AdminEditors = () => {
  const [editors, setEditors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadEditors = async () => {
    try {
      const res = await getEditors();

      if (Array.isArray(res.data?.data)) {
        setEditors(res.data.data);
      } else {
        setEditors([]);
      }
    } catch (err) {
      console.error("Editors fetch error", err);
      setEditors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEditors();
  }, []);

  const handleCreate = async () => {
    if (!name || !email || !password) return;

    await createEditor({
      name,
      email,
      password,
    });

    setName("");
    setEmail("");
    setPassword("");

    loadEditors();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this editor?")) return;

    await deleteEditor(id);

    loadEditors();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Editors Management
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          boxShadow: "none",
        }}
      >
        <Typography variant="h6" mb={2} fontWeight={600}>
          Create Editor
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField
            label="Name"
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 2,
            }}
            onClick={handleCreate}
          >
            Create
          </Button>
        </Box>
      </Paper>

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
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Password</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : editors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No editors found</TableCell>
              </TableRow>
            ) : (
              editors.map((e) => (
                <TableRow
                  key={e.id}
                  hover
                  sx={{
                    "& td": {
                      fontWeight: 500,
                      borderBottom: "1px solid #f1f5f9",
                    },
                  }}
                >
                  <TableCell>{e.name}</TableCell>

                  <TableCell>{e.email}</TableCell>

                  <TableCell>{e.password}</TableCell>

                  <TableCell>
                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "10px",
                      }}
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminEditors;
