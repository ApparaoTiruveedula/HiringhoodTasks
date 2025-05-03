import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, ExitToApp, Home, WorkOutline, Apps, PostAdd } from '@mui/icons-material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold'}}>
          JobBoardX
        </Typography>

        {isMobile ? (
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <AccountCircle />
          </IconButton>
        ) : (
          <>
            {role === 'jobseeker' && <Button color="inherit" component={Link} to="/applications" startIcon={<Apps />}>My Applications</Button>}
            {role === 'employer' && <Button color="inherit" component={Link} to="/employer/create" startIcon={<PostAdd />}>Post a Job</Button>}
            {role === 'employer' && <Button color="inherit" component={Link} to="/employer/myjobs" startIcon={<WorkOutline />}>Posted Jobs</Button>}
            {role === 'jobseeker' && <Button color="inherit" component={Link} to="/jobs" ><WorkOutlineIcon fontSize="small" sx={{ mr: 1 }} />Jobs</Button>}
            {token ? (
              <>
                <Button color="inherit" component={Link} to="/profile" startIcon={<AccountCircle />}>Profile</Button>
                <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" startIcon={<ExitToApp />}>Login</Button>
                <Button color="inherit" component={Link} to="/register" startIcon={<AccountCircle />}>Register</Button>
              </>
            )}
          </>
        )}

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {role === 'jobseeker' && <MenuItem onClick={handleMenuClose} component={Link} to="/applications">My Applications</MenuItem>}
          {role === 'employer' && <MenuItem onClick={handleMenuClose} component={Link} to="/employer/create">Post a Job</MenuItem>}
          {role === 'employer' && <MenuItem onClick={handleMenuClose} component={Link} to="/employer/myjobs">Posted Jobs</MenuItem>}
          {role === 'jobseeker' && <MenuItem onClick={handleMenuClose} component={Link} to="/jobs">Jobs</MenuItem>}
          {token ? (
            <>
              <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose} component={Link} to="/login">Login</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/register">Register</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
