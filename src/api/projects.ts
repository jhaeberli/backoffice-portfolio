import { v4 as uuidv4 } from 'uuid';
import type { Project } from '../types';

let projects: Project[] = [
  {
    id: uuidv4(),
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with cart, checkout, and payment integration.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://ecommerce.example.com',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Portfolio Website',
    description: 'Personal portfolio website showcasing projects and skills.',
    technologies: ['React', 'TypeScript', 'Vite', 'MUI'],
    githubUrl: 'https://github.com/example/portfolio',
    liveUrl: 'https://portfolio.example.com',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Task Management App',
    description: 'A kanban-style task management application with drag-and-drop support.',
    technologies: ['React', 'Redux', 'Firebase', 'DnD Kit'],
    githubUrl: 'https://github.com/example/taskmanager',
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
  },
];

export const getProjects = (): Promise<Project[]> =>
  Promise.resolve([...projects]);

export const getProject = (id: string): Promise<Project> => {
  const project = projects.find((p) => p.id === id);
  if (!project) return Promise.reject(new Error(`Project ${id} not found`));
  return Promise.resolve({ ...project });
};

export const createProject = (
  data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Project> => {
  const now = new Date().toISOString();
  const newProject: Project = { ...data, id: uuidv4(), createdAt: now, updatedAt: now };
  projects = [...projects, newProject];
  return Promise.resolve({ ...newProject });
};

export const updateProject = (id: string, data: Partial<Project>): Promise<Project> => {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return Promise.reject(new Error(`Project ${id} not found`));
  const updated: Project = { ...projects[idx], ...data, id, updatedAt: new Date().toISOString() };
  projects = [...projects.slice(0, idx), updated, ...projects.slice(idx + 1)];
  return Promise.resolve({ ...updated });
};

export const deleteProject = (id: string): Promise<void> => {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return Promise.reject(new Error(`Project ${id} not found`));
  projects = projects.filter((p) => p.id !== id);
  return Promise.resolve();
};
