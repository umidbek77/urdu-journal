import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { api } from "../../api/axios";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/users/profile").then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleSave = async () => {
    try {
      await api.patch("/users/profile", {
        name: user.name,
        affiliation: user.affiliation,
      });

      setSuccess("Profile updated successfully");
      setError("");
    } catch {
      setError("Profile update failed");
      setSuccess("");
    }
  };

  const handleChangePassword = async () => {
    try {
      await api.patch("/users/change-password", {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      setSuccess("Password changed successfully");
      setError("");

      setCurrentPassword("");
      setNewPassword("");
    } catch {
      setError("Password change failed");
      setSuccess("");
    }
  };

  if (!user) return null;

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Profile
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box display={"flex"} flexDirection={"row"} gap={4}>
        <Paper sx={{ p: 4, maxWidth: 600, mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Personal Information
          </Typography>

          <TextField
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <TextField
            label="Email"
            fullWidth
            disabled
            sx={{ mb: 2 }}
            value={user.email || ""}
          />

          <TextField
            label="Affiliation"
            fullWidth
            sx={{ mb: 2 }}
            value={user.affiliation || ""}
            onChange={(e) => setUser({ ...user, affiliation: e.target.value })}
          />

          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Paper>

        <Paper sx={{ p: 4, maxWidth: 600, mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Change Password
          </Typography>

          <TextField
            label="Current Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            sx={{ mb: 3 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
