import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import API from '../services/api';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await API.get('/jobs');
      setJobs(res.data);
    };

    const fetchApplications = async () => {
      const res = await API.get('/applications/me');
      const jobIds = res.data.map((app: any) => app.jobId);
      setAppliedJobIds(new Set(jobIds));
    };

    fetchJobs();
    fetchApplications();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(lowerSearch) ||
      job.company.toLowerCase().includes(lowerSearch) ||
      (job.location && job.location.toLowerCase().includes(lowerSearch))
    );
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        Explore Job Opportunities
      </Typography>

      <TextField
        fullWidth
        label="Search by Title, Company, or Location"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4, borderRadius: 2 }}
      />

      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card elevation={4} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="primary">
                      <WorkOutlineIcon fontSize="small" sx={{ mr: 1 }} /> {job.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <BusinessIcon fontSize="small" sx={{ mr: 1 }} /> {job.company}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <LocationOnIcon fontSize="small" sx={{ mr: 1 }} /> {job.location}
                    </Typography>
                  </Stack>

                  {job.skills && job.skills.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="caption" fontWeight={500} color="textSecondary">
                        Required Skills:
                      </Typography>
                      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                        {job.skills.map((skill: string, index: number) => (
                          <Chip label={skill} variant="outlined" key={index} />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  {appliedJobIds.has(job._id) ? (
                    <Button fullWidth variant="outlined" color="success" disabled>
                      Already Applied
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={`/jobs/${job._id}`}
                      variant="contained"
                      fullWidth
                      color="primary"
                    >
                      Apply Now
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f9f9f9', borderRadius: 3 }}>
              <Typography variant="h6" color="textSecondary">
                No jobs found matching your search.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default JobListPage;