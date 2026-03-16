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
      <Typography variant="h4" mb={3}>
        Editors Management
      </Typography>


      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Create Editor
        </Typography>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mr: 2 }}
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mr: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mr: 2 }}
        />

        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : editors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No editors found</TableCell>
              </TableRow>
            ) : (
              editors.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>

                  <TableCell>{e.email}</TableCell>

                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
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
