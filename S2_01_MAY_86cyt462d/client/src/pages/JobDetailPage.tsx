import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Typography, Button, Box, Card, CardContent, Snackbar,
  Alert, CircularProgress, Grid, Chip, Paper, FormControl, InputLabel,
  Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  LocationOn, AttachMoney, Work, Build, Description, Person,
  Email, AccessTime, CheckCircle, InsertDriveFile
} from '@mui/icons-material';
import Slide from '@mui/material/Slide';
import API from '../services/api';

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const role = localStorage.getItem('role');

  const [job, setJob] = useState(null);
  const [applicant, setApplicants] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data.job);
        setApplicants(res.data.applicants);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleStatusChange = async (app, newStatus) => {
    try {
      await API.patch(`/applications/${app._id}`, { status: newStatus });
      setSnackbarMessage('Application status updated!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setApplicants(prev =>
        prev.map(a => a._id === app._id ? { ...a, status: newStatus } : a)
      );
    } catch (error) {
      setSnackbarMessage('Failed to update application status');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOpenModal = (app) => {
    setSelectedApplicant(app);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedApplicant(null);
  };

  if (!job) return <CircularProgress sx={{ mt: 10 }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{
        background: 'linear-gradient(to right, #2196f3, #21cbf3)',
        color: 'white', p: 4, borderRadius: 2, mb: 3,
      }}>
        <Typography variant="h4" fontWeight="bold">{job.title}</Typography>
        {job.company && <Typography variant="h6">{job.company}</Typography>}
        {job.employerId?.fullName && (
          <Typography variant="subtitle2">Posted by: {job.employerId.fullName}</Typography>
        )}
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><Typography><LocationOn /> {job.location}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><AttachMoney /> {job.salary}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><AccessTime /> {job.experienceLevel}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><Build /> {job.jobType}</Typography></Grid>
          </Grid>

          {job.description && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6"><Description /> Job Description</Typography>
              <Typography variant="body1">{job.description}</Typography>
            </Box>
          )}

          {job.skills && job.skills.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6"><Build /> Skills Required</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {job.skills.map(skill => (
                  <Chip key={skill} label={skill} variant="outlined" color="primary" />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ mt: 4 }}>
            <Button variant="outlined" onClick={() => navigate('/jobs')}>Back to Jobs</Button>
          </Box>

          {applicant?.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6"><Person /> Applicants</Typography>
              {applicant.map(app => (
                <Paper key={app._id} elevation={3} sx={{
                  p: 2, borderRadius: 2, mb: 2, display: 'flex',
                  justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center'
                }}>
                  <Box>
                    <Typography
                      fontWeight="bold"
                      sx={{ cursor: 'pointer', color: 'primary.main' }}
                      onClick={() => handleOpenModal(app)}
                    >
                      <Person /> {app.applicantId?.fullName}
                    </Typography>
                    <Typography><Email /> {app.applicantId?.email}</Typography>
                  </Box>
                  {role === 'employer' ? (
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={app.status}
                        onChange={e => handleStatusChange(app, e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="shortlisted">Shortlisted</MenuItem>
                        <MenuItem value="selected">Selected</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography>Status: {app.status}</Typography>
                  )}
                </Paper>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {role !== 'employer' && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Button
            onClick={() => navigate(`/job/${id}/apply`)}
            variant="contained"
            color="secondary"
            startIcon={<CheckCircle />}
          >
            Apply Now
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        TransitionComponent={Slide}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Applicant Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom><Person /> {selectedApplicant?.applicantId?.fullName}</Typography>
          <Typography variant="body2" gutterBottom><Email /> {selectedApplicant?.applicantId?.email}</Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2"><InsertDriveFile sx={{ mr: 1 }} /> Resume:</Typography>
            {selectedApplicant?.resumeLink ? (
              <a
                href={selectedApplicant.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1976d2', textDecoration: 'underline' }}
              >
                View Resume
              </a>
            ) : (
              <Typography color="text.secondary">No resume provided.</Typography>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2"><Description sx={{ mr: 1 }} /> Cover Letter:</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {selectedApplicant?.coverLetter || 'No cover letter provided.'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetailPage;
