import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, TextField, Button } from '@mui/material';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      resumeLink: '',
      coverLetter: '',
    },
    validationSchema: Yup.object({
      resumeLink: Yup.string().url().required('Resume link is required'),
      coverLetter: Yup.string().required('Cover letter is required'),
    }),
    onSubmit: async (values) => {
      try {
        await API.post('/applications', { ...values, jobId: id });
        navigate('/applications');
      } catch (error) {
        alert('You Already Applied for this Job');
      }
    },
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Apply for Job</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="resumeLink"
          name="resumeLink"
          label="Resume Link"
          value={formik.values.resumeLink}
          onChange={formik.handleChange}
          error={formik.touched.resumeLink && Boolean(formik.errors.resumeLink)}
          helperText={formik.touched.resumeLink && formik.errors.resumeLink}
          margin="normal"
        />
        <TextField
          fullWidth
          id="coverLetter"
          name="coverLetter"
          label="Cover Letter"
          value={formik.values.coverLetter}
          onChange={formik.handleChange}
          error={formik.touched.coverLetter && Boolean(formik.errors.coverLetter)}
          helperText={formik.touched.coverLetter && formik.errors.coverLetter}
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginTop: 20 }}>
          Submit Application
        </Button>
      </form>
    </Container>
  );
};

export default JobApplicationPage;
