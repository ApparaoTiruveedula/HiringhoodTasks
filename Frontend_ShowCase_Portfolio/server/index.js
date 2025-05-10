import express from 'express';
import cors from 'cors';
import { projects, skillsData } from './data.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Get all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Get a single project by ID
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(project);
});

// Get skills data
app.get('/api/skills', (req, res) => {
  res.json(skillsData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});