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
} from "@mui/material";

import { getUsers } from "../../api/admin.api";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const res = await getUsers();

      if (Array.isArray(res.data?.data)) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Users fetch error", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Users
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
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Affiliation</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No users found</TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow
                  key={u.id}
                  hover
                  sx={{
                    "& td": {
                      fontWeight: 500,
                      borderBottom: "1px solid #f1f5f9",
                    },
                  }}
                >
                  <TableCell>{u.name}</TableCell>

                  <TableCell>{u.email}</TableCell>

                  <TableCell>{u.affiliation || "-"}</TableCell>

                  <TableCell>
                    {new Date(u.createdAt).toLocaleDateString()}
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

export default AdminUsers;
