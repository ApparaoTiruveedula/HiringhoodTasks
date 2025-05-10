import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Chip, Button } from '@mui/material';
import { Github, ExternalLink, Info } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { FrontendProject } from '../types';

const StyledCard = styled(motion(Card))(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const TechChip = styled(Chip)(({ theme }) => ({
  margin: '0 4px 4px 0',
  fontWeight: 500,
}));

interface ProjectCardProps {
  project: FrontendProject;
  onViewDetails: (project: FrontendProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  return (
    <StyledCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          {project.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {project.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {project.techStack.map((tech) => (
            <TechChip key={tech} label={tech} size="small" color="primary" />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<ExternalLink size={16} />}
          href={project.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Info size={16} />}
          onClick={() => onViewDetails(project)}
        >
          View Details
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ProjectCard;