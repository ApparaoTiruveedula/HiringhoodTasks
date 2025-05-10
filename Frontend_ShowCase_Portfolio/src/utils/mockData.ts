import { FrontendProject, SkillRadarData } from '../types';

// export const projects: FrontendProject[] = [
//   {
//     id: "1",
//     title: "E-Commerce Dashboard",
//     description: "A responsive admin dashboard with interactive charts and dark mode support for monitoring sales and inventory.",
//     techStack: ["React", "TypeScript", "MUI", "Recharts"],
//     liveDemoUrl: "https://example.com/demo1",
//     githubUrl: "https://github.com/example/ecom-dashboard",
//     features: [
//       "Dark/light mode toggle", 
//       "Responsive layout", 
//       "Interactive charts",
//       "Real-time data updates"
//     ],
//     challenges: [
//       "Complex state management across multiple components", 
//       "Performance optimization for large datasets",
//       "Ensuring accessibility across all components"
//     ],
//     screenshots: [
//       "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/4481323/pexels-photo-4481323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     ]
//   },
//   {
//     id: "2",
//     title: "Weather Application",
//     description: "A beautiful weather app with location-based forecasts, animated weather conditions, and hourly predictions.",
//     techStack: ["React", "JavaScript", "Styled Components", "Weather API"],
//     liveDemoUrl: "https://example.com/demo2",
//     githubUrl: "https://github.com/example/weather-app",
//     features: [
//       "Geolocation support", 
//       "5-day forecast", 
//       "Weather animations",
//       "Unit conversion (C°/F°)"
//     ],
//     challenges: [
//       "Managing API rate limits", 
//       "Creating smooth weather transitions",
//       "Handling location permission denials gracefully"
//     ],
//     screenshots: [
//       "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     ]
//   },
//   {
//     id: "3",
//     title: "Task Management System",
//     description: "A Kanban-style task management app with drag and drop interface, task prioritization, and team collaboration features.",
//     techStack: ["React", "TypeScript", "Redux", "Framer Motion"],
//     liveDemoUrl: "https://example.com/demo3",
//     githubUrl: "https://github.com/example/task-manager",
//     features: [
//       "Drag and drop interface", 
//       "Task filtering and sorting", 
//       "User assignments",
//       "Due date reminders"
//     ],
//     challenges: [
//       "Implementing smooth drag and drop", 
//       "Syncing state across multiple users",
//       "Optimizing performance for large task lists"
//     ],
//     screenshots: [
//       "https://images.pexels.com/photos/6956435/pexels-photo-6956435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     ]
//   },
//   {
//     id: "4",
//     title: "Music Streaming App",
//     description: "A Spotify-inspired music streaming interface with playlist creation, audio visualization, and personalized recommendations.",
//     techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Web Audio API"],
//     liveDemoUrl: "https://example.com/demo4",
//     githubUrl: "https://github.com/example/music-stream",
//     features: [
//       "Audio visualizer", 
//       "Playlist management", 
//       "Offline listening",
//       "Cross-device sync"
//     ],
//     challenges: [
//       "Building custom audio controls", 
//       "Optimizing streaming performance",
//       "Managing complex audio state"
//     ],
//     screenshots: [
//       "https://images.pexels.com/photos/6320/smartphone-vintage-technology-music.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     ]
//   }
// ];

// export const skillsData: SkillRadarData[] = [
//   { subject: 'React', A: 90, fullMark: 100 },
//   { subject: 'CSS/SCSS', A: 85, fullMark: 100 },
//   { subject: 'TypeScript', A: 80, fullMark: 100 },
//   { subject: 'JavaScript', A: 95, fullMark: 100 },
//   { subject: 'Redux', A: 75, fullMark: 100 },
//   { subject: 'UI/UX', A: 70, fullMark: 100 },
// ];

export const demoComponentCode = `
import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button\`
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  background-color: \${({ variant }) => 
    variant === 'primary' ? '#3B82F6' : 
    variant === 'secondary' ? '#0EA5E9' : 
    variant === 'accent' ? '#8B5CF6' : '#6B7280'};
  
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.3s, opacity 0.5s;
  }
  
  &:active::after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
\`;

export const FancyButton = ({ 
  children, 
  variant = 'primary',
  ...props 
}) => {
  return (
    <ButtonContainer variant={variant} {...props}>
      {children}
    </ButtonContainer>
  );
};
`;