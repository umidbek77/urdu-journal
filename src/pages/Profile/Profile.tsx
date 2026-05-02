import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { api } from "../../api/axios";

const Profile = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState<any>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

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

      setSuccess(t("profile.successUpdate"));
      setError("");
    } catch {
      setError(t("profile.errorUpdate"));
      setSuccess("");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setAvatarUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/users/avatar", formData);

      setUser((prev: any) => ({
        ...prev,
        avatarUrl: res.data.avatarUrl,
      }));
    } catch {
      setError("Avatar upload error");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      await api.patch("/users/change-password", {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      setSuccess(t("profile.successPassword"));
      setError("");

      setCurrentPassword("");
      setNewPassword("");
    } catch {
      setError(t("profile.errorPassword"));
      setSuccess("");
    }
  };

  if (!user) return null;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        {t("profile.title")}
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            transition: "0.25s",
            "&:hover": {
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            },
          }}
        >
          <Stack alignItems="center" mb={3} sx={{ position: "relative" }}>
            <Avatar
              src={user.avatarUrl}
              sx={{
                width: 140,
                height: 140,
                mb: 1,
                border: "3px solid #e5e7eb",
              }}
            />

            {/* overlay */}
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 10,
                right: "calc(50% - 20px)",
                background: "#1976d2",
                color: "#fff",
                "&:hover": {
                  background: "#1565c0",
                },
              }}
            >
              <PhotoCamera fontSize="small" />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </IconButton>

            {avatarUploading && (
              <Typography variant="caption" color="text.secondary">
                Yuklanmoqda...
              </Typography>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <PersonIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              {t("profile.personal")}
            </Typography>
          </Stack>

          <TextField
            label={t("profile.name")}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <TextField
            label={t("profile.email")}
            fullWidth
            disabled
            size="small"
            sx={{ mb: 2 }}
            value={user.email || ""}
          />

          <TextField
            label={t("profile.affiliation")}
            fullWidth
            size="small"
            sx={{ mb: 3 }}
            value={user.affiliation || ""}
            onChange={(e) => setUser({ ...user, affiliation: e.target.value })}
          />

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
            }}
          >
            {t("profile.save")}
          </Button>
        </Paper>

        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            transition: "0.25s",
            "&:hover": {
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <LockIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              {t("profile.password")}
            </Typography>
          </Stack>

          <TextField
            label={t("profile.currentPassword")}
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <TextField
            label={t("profile.newPassword")}
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 3 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleChangePassword}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
            }}
          >
            {t("profile.change")}
          </Button>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Profile;
