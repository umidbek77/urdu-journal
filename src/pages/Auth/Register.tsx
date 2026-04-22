import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Link,
} from "@mui/material";
import { register } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Barcha maydonlarni to‘ldiring");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email noto‘g‘ri formatda");
      return;
    }

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak");
      return;
    }

    try {
      await register({
        name,
        email,
        password,
      });

      setSuccess("Muvaffaqiyatli ro‘yxatdan o‘tdingiz!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Ro‘yxatdan o‘tishda xatolik");
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
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          type="password"
          fullWidth
          margin="normal"
          value={password}
          helperText={
            password && password.length < 6 ? "Kamida 6 ta belgi" : ""
          }
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
          disabled={!name || !email || !password}
        >
          Register
        </Button>

        <Typography mt={2} textAlign="center">
          Akkountingiz bormi?{" "}
          <Link component="button" onClick={() => navigate("/login")}>
            Login qiling
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
