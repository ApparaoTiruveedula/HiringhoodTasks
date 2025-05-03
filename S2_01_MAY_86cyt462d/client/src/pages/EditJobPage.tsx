import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import API from '../services/api';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob({
          title: res.data.job.title || '',
          description: res.data.job.description || '',
          location: res.data.job.location || '',
          company: res.data.job.company || '',
        });
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (field: keyof typeof job, value: string) => {
    setJob((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/jobs/${id}`, job);
      navigate('/employer/myjobs'); // after update go back
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Edit Job
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Job Title"
          value={job.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <TextField
          label="Company"
          value={job.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
        <TextField
          label="Location"
          value={job.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
        <TextField
          label="Job Description"
          multiline
          rows={4}
          value={job.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditJobPage;
