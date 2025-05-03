import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
  Stack
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const CreateJobPage = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      location: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      company: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await API.post('/jobs', values);
        setSnackbar({ open: true, message: 'Job posted successfully!', severity: 'success' });
        resetForm();
        setTimeout(() => {
          navigate('/employer/myjobs');
        }, 1000);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to post job. Try again.', severity: 'error' });
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box textAlign="center" mb={3}>
          <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight="bold" mt={1}>
            Post a New Job
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details below to post a job opening
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Job Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="company"
              name="company"
              label="Company Name"
              value={formik.values.company}
              onChange={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            />
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Job Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 1, textTransform: 'none', fontWeight: 'bold' }}
            >
              🚀 Post Job
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity as 'success' | 'error'}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateJobPage;
