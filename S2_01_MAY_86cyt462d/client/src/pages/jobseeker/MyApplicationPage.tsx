import { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Divider,
} from '@mui/material';
import { red } from '@mui/material/colors';

interface Application {
  _id: string;
  jobId: string;
  status: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  employerId: {
    _id: string;
    name?: string;
  };
}

interface ApplicationWithJob {
  application: Application;
  job: Job;
}

const MyApplicationsPage = () => {
  const [data, setData] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchApplicationsAndJobs = async () => {
      try {
        const res = await API.get('/applications/me');
        const applications: Application[] = res.data;

        const jobResponses = await Promise.all(
          applications.map(app => API.get(`/jobs/${app.jobId}`)));

        const combinedData: ApplicationWithJob[] = applications.map((app, idx) => ({
          application: app,
          job: jobResponses[idx].data
        }));

        setData(combinedData);
      } catch (err) {
        console.error('Failed to fetch applications or jobs', err);
        setSnackbar({ open: true, message: 'Failed to fetch data.', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationsAndJobs();
  }, []);

  const handleWithdraw = async (id: string) => {
    try {
      await API.delete(`/applications/${id}`);
      setData(prev => prev.filter(item => item.application._id !== id));
      setSnackbar({ open: true, message: 'Application withdrawn successfully.', severity: 'success' });
    } catch (error) {
      console.error("Failed to delete application", error);
      setSnackbar({ open: true, message: 'Failed to withdraw the application.', severity: 'error' });
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600} textAlign="center">My Applications</Typography>

      {data.length === 0 ? (
        <Typography align="center" color="text.secondary" mt={4}>You haven’t applied to any jobs yet.</Typography>
      ) : (
        data.map(({ application, job }) => (
          <Card key={application._id} sx={{ mb: 3, p: 2, boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Box mb={1}>
                  <Typography variant="h6" color="primary.main">{job.job.title || 'Unknown Job'}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">{job.job.company || 'Unknown Company'}</Typography>
                  <Typography variant="body2" color="text.secondary">Status: <strong>{application.status}</strong></Typography>
                </Box>

                <Button
                  variant="outlined"
                  sx={{ borderColor: red[500], color: red[500], mt: { xs: 2, sm: 0 }, height: 40 }}
                  onClick={() => {
                   
                      handleWithdraw(application._id);
                    
                  }}
                >
                  Withdraw
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyApplicationsPage;