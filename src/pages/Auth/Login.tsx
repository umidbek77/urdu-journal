import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { login } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      const profile = await api.get("/users/profile");

      const user = profile.data;

      setUser(user);

      if (user.role === "SUPER_ADMIN") navigate("/admin");
      else if (user.role === "EDITOR") navigate("/editor");
      else navigate("/dashboard");
    } catch {
      alert("Login xato");
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

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
