import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import JobApplicationPage from './pages/JobApplicationPage';
import MyApplicationsPage from './pages/jobseeker/MyApplicationPage';
import CreateJobPage from './pages/employer/CreateJobPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './routes/protectetdRoutes';
import MyJobsPage from './pages/employer/PostedJobs';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      
        <Navbar />
        <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/jobs" element={<JobListPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    <Route 
          path="/employer/create" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <CreateJobPage />
            </ProtectedRoute>
          } 
        /> 
        <Route 
          path="/employer/myjobs" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <MyJobsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jobs/:id/edit" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EditJobPage />
            </ProtectedRoute>
          } 
        />
      <Route 
          path="/applications" 
          element={
            <ProtectedRoute allowedRoles={['jobseeker']}>
              <MyApplicationsPage />
            </ProtectedRoute>
          } 
        /> 
      <Route path="/job/:id/apply" element={<JobApplicationPage />} />
    </Routes>
    </ThemeProvider>
  );
};

export default App;
