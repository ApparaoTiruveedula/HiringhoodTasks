import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton } from '@mui/material';
import { Code, Github, Mail, Sun, Moon } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}));

interface HeaderProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onThemeToggle }) => {
  return (
    <StyledAppBar position="sticky" color="default">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Code size={28} color="#3B82F6" />
            </motion.div>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                ml: 1.5,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Personal Portfolio
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton
              onClick={onThemeToggle}
              color="inherit"
              sx={{ mr: 1 }}
              aria-label="toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
            <Button 
              startIcon={<Github size={18} />}
              href="https://github.com" 
              target="_blank"
              color="inherit"
            >
              GitHub
            </Button>
            <Button 
              startIcon={<Mail size={18} />}
              href="mailto:contact@example.com" 
              color="primary"
              variant="contained"
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header