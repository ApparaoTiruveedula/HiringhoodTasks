import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await API.post("/auth/login", values);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/");
      } catch (err) {
        setError("Invalid credentials");
      }
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f4f4"
    >
      <Paper elevation={3} sx={{ p: 4, width: 360, borderRadius: 2 }}>
        <Typography variant="h5" align="center" mb={3}>
          Login to your account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              size="small"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              size="small"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
