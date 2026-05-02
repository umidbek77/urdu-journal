import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { login } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Barcha maydonlarni to‘ldiring");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email noto‘g‘ri formatda");
      return;
    }

    try {
      const res = await login({ email, password });

      const token = res.data.access_token;
      localStorage.setItem("token", token);

      const profile = await api.get("/users/profile");
      const user = profile.data;

      setUser(user);

      if (user.role === "SUPER_ADMIN") navigate("/admin-dashboard");
      else if (user.role === "EDITOR") navigate("/editor-dashboard");
      else navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Email yoki parol noto‘g‘ri");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3}>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          error={!!email && !isValidEmail(email)}
          helperText={
            email && !isValidEmail(email) ? "Email format noto‘g‘ri" : ""
          }
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Login
        </Button>

        <Typography mt={2} textAlign="center">
          Ro‘yxatdan o‘tmaganmisiz?{" "}
          <Link component="button" onClick={() => navigate("/register")}>
            Ro‘yxatdan o‘ting
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
