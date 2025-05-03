import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Button variant="contained" component={Link} to="/dashboard">
        Back to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;