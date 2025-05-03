import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>Welcome to JobBoardX</Typography>
      <Typography variant="h6" gutterBottom>
        Connect with top companies or talented job seekers easily.
      </Typography>
      <Button component={Link} to="/jobs" variant="contained" color="primary" style={{ marginRight: 10 }}>
        Browse Jobs
      </Button>
      <Button component={Link} to="/login" variant="outlined" color="primary">
        Login
      </Button>
    </Container>
  );
};

export default HomePage;
