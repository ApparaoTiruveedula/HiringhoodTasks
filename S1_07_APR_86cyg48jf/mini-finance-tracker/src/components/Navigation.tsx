import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%', mb: 3, pt: 2 }}>
      <Button
        component={Link}
        to="/"
        variant={location.pathname === '/' ? 'contained' : 'outlined'}
        startIcon={<HomeIcon />}
      >
        Home
      </Button>
      <Button
        component={Link}
        to="/add"
        variant={location.pathname === '/add' ? 'contained' : 'outlined'}
        startIcon={<AddCircleIcon />}
      >
        Add Transaction
      </Button>
    </Stack>
  );
};

export default Navigation;
