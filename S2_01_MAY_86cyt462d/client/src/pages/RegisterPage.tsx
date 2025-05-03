import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../services/api';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Paper,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
      role: Yup.string().oneOf(['jobseeker', 'employer']).required('Role is required'),
    }),
    onSubmit: async (values) => {
      try {
        await API.post('/auth/register', values);
        setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
        setTimeout(() => navigate('/login'), 1500);
      } catch (error) {
        setSnackbar({ open: true, message: 'Registration failed. Try again.', severity: 'error' });
      }
    },
  });

  return (
    <Box bgcolor="#f4f4f4" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxWidth="xs">
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" align="center" mb={2}>
            Create an Account
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              size="small"
              id="fullName"
              name="fullName"
              label="Full Name"
              margin="dense"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              sx={{ mb: 2 }} 
            />
            <TextField
              fullWidth
              size="small"
              id="email"
              name="email"
              label="Email"
              margin="dense"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }} 
            />
            <TextField
              fullWidth
              size="small"
              id="password"
              name="password"
              label="Password"
              type="password"
              margin="dense"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 2 }} 
            />
            <TextField
              select
              fullWidth
              size="small"
              id="role"
              name="role"
              label="Select Role"
              margin="dense"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              sx={{ mb: 2 }} 
            >
              <MenuItem value="jobseeker">Job Seeker</MenuItem>
              <MenuItem value="employer">Employer</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              size="small"
              variant="contained"
              sx={{ mt: 2, fontWeight: 600 }}
            >
              Register
            </Button>
          </Box>

          <Typography align="center" variant="body2" mt={2}>
            Already have an account?{' '}
            <Button variant="text" size="small" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Typography>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity as 'success' | 'error'}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default RegisterPage;
