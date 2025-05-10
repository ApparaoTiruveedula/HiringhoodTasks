import React from 'react';
import { Box, Typography, Container, Link, Divider } from '@mui/material';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  marginTop: 'auto',
}));

const SocialLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(2),
  display: 'inline-flex',
  transition: 'color 0.2s',
  '&:hover': {
    color: theme.palette.primary.main,
  }
}));

const Footer: React.FC = () => {
  return (
    <StyledFooter component="footer">
      <Divider />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Box sx={{ mb: { xs: 2, sm: 0 }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Frontend Showcase
            </Typography>
            <Typography variant="body2" color="textSecondary">
              A collection of frontend development projects
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-end' } }}>
            <Box sx={{ mb: 1 }}>
              <SocialLink href="https://github.com" target="_blank" aria-label="GitHub">
                <Github size={20} />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Linkedin size={20} />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
            </Box>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} Frontend Showcase. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;