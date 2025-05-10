export type TechStack = {
  name: string;
  proficiency: number;
};

export type FrontendProject = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveDemoUrl: string;
  githubUrl: string;
  features: string[];
  challenges: string[];
  screenshots: string[];
};

export type SkillRadarData = {
  subject: string;
  A: number;
  fullMark: number;
};