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
      <Typography variant="h4" mb={3} fontWeight={700}>
        Profile
      </Typography>

      {success && (
        <Alert
          severity="success"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          {success}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Paper
          sx={{
            p: 4,
            maxWidth: 600,
            width: "100%",
            mb: 4,
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            boxShadow: "none",
          }}
        >
          <Typography variant="h6" mb={2} fontWeight={600}>
            Personal Information
          </Typography>

          <TextField
            label="Name"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <TextField
            label="Email"
            fullWidth
            disabled
            size="small"
            sx={{ mb: 2 }}
            value={user.email || ""}
          />

          <TextField
            label="Affiliation"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={user.affiliation || ""}
            onChange={(e) => setUser({ ...user, affiliation: e.target.value })}
          />

          <Button
            variant="outlined"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.5,
            }}
          >
            Save Changes
          </Button>
        </Paper>

        <Paper
          sx={{
            p: 4,
            maxWidth: 600,
            width: "100%",
            mb: 4,
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            boxShadow: "none",
          }}
        >
          <Typography variant="h6" mb={2} fontWeight={600}>
            Change Password
          </Typography>

          <TextField
            label="Current Password"
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 3 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            variant="outlined"
            color="primary"
            onClick={handleChangePassword}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.5,
            }}
          >
            Change Password
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
