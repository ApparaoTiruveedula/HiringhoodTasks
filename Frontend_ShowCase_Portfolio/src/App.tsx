import React, { useState, useMemo, useEffect } from 'react';
import { Container,Grid,Typography, Box,CssBaseline,ThemeProvider,} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import getTheme from './theme';
import { FrontendProject, SkillRadarData } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import SkillRadar from './components/SkillRadar';
import InteractiveDemo from './components/InteractiveDemo';
import { demoComponentCode } from './utils/mockData';

function App() {
  const [selectedProject, setSelectedProject] = useState<FrontendProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<FrontendProject[]>([]);
  const [skills, setSkills] = useState<SkillRadarData[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark';
  });

  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/projects'),
          axios.get('http://localhost:3000/api/skills')
        ]);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (project: FrontendProject) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        <Header darkMode={darkMode} onThemeToggle={handleThemeToggle} />
        
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Frontend Technologies Showcase
              </Typography>
              <Typography 
                variant="h6" 
                color="textSecondary" 
                sx={{ maxWidth: 700, mx: 'auto' }}
              >
                A collection of innovative frontend projects showcasing modern web technologies,
                responsive designs, and interactive user experiences.
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ fontWeight: 'bold', mb: 4 }}
            >
              Featured Projects
            </Typography>
            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid item xs={12} sm={6} md={6} key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard 
                      project={project} 
                      onViewDetails={handleViewDetails} 
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: 8 }}>
            <SkillRadar data={skills} />
          </Box>

          <Box>
            <InteractiveDemo demoCode={demoComponentCode} />
          </Box>
        </Container>

        <Footer />
        
        <ProjectModal 
          project={selectedProject} 
          open={modalOpen} 
          onClose={handleCloseModal} 
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;