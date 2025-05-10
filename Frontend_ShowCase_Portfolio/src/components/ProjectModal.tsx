import React from 'react';
import { Dialog,DialogTitle,DialogContent, IconButton, Typography, Box, Chip,Grid, Link, Button, Divider, List, ListItem, ListItemText,useMediaQuery} from '@mui/material';
import { styled } from '@mui/material/styles';
import { X, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { FrontendProject } from '../types';
import { motion } from 'framer-motion';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 12,
    maxWidth: 900,
    width: '100%',
  },
}));

const ScreenshotImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: 8,
  objectFit: 'cover',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const TechChip = styled(Chip)(({ theme }) => ({
  margin: '0 4px 4px 0',
  fontWeight: 500,
}));

interface ProjectModalProps {
  project: FrontendProject | null;
  open: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!project) return null;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          {project.title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            {project.screenshots.map((screenshot, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ScreenshotImage
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          {project.description}
        </Typography>

        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Technologies
          </Typography>
          <Box>
            {project.techStack.map((tech) => (
              <TechChip key={tech} label={tech} size="medium" color="primary" />
            ))}
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Key Features
            </Typography>
            <List disablePadding>
              {project.features.map((feature, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Challenges & Solutions
            </Typography>
            <List disablePadding>
              {project.challenges.map((challenge, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText primary={challenge} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Github size={18} />}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ExternalLink size={18} />}
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default ProjectModal;