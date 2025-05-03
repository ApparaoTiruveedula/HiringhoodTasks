import { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardContent, Button, Grid, Stack,
  Snackbar, Alert, Box, CardActions, Chip, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import {
  Business, LocationOn, WorkOutline, Edit, Delete, Visibility
} from '@mui/icons-material';

const MyJobsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await API.get('/jobs/myjobs');
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching posted jobs:', error);
        setSnackbarMessage('Failed to fetch jobs');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };

    fetchMyJobs();
  }, []);

  const handleDeleteJob = async (jobId: string) => {
    try {
      await API.delete(`/jobs/${jobId}`);
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      setSnackbarMessage('Job deleted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error deleting job. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📋 My Posted Jobs
      </Typography>

      {jobs.length === 0 ? (
        <Typography>No jobs posted yet.</Typography>
      ) : (
        <Grid container spacing={2} direction="row">
          {jobs.map((job) => (
            <Grid item xs={12} key={job._id}>
              <Card sx={{
                borderRadius: 3,
                boxShadow: 4,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',  // Ensure each card has dynamic height
                background: '#fefefe',
              }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    <WorkOutline sx={{ mr: 1 }} />
                    {job.title}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    <Business sx={{ mr: 1 }} />
                    {job.company}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <LocationOn sx={{ mr: 1 }} />
                    {job.location}
                  </Typography>

                  {job.jobType && (
                    <Box sx={{ mt: 2 }}>
                      <Chip label={job.jobType} color="primary" variant="outlined" />
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Stack spacing={1} width="100%">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      startIcon={<Visibility />}
                    >
                      View Applicants
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      onClick={() => navigate(`/jobs/${job._id}/edit`)}
                      startIcon={<Edit />}
                    >
                      Edit Job
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="error"
                      onClick={() => handleDeleteJob(job._id)}
                      startIcon={<Delete />}
                    >
                      Delete Job
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar for messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyJobsPage;
