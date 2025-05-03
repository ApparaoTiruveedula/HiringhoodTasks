import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import Login from '../pages/Login';
import RegisterPage from '../pages/RegisterPage';
import JobListPage from '../pages/JobListPage';
import JobDetailPage from '../pages/JobDetailPage';
import ProfilePage from '../pages/ProfilePage';
import CreateJobPage from '../pages/employer/CreateJobPage';
import MyApplicationsPage from '../pages/jobseeker/MyApplicationsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/jobs" element={<JobListPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/employer/create" element={<CreateJobPage />} />
      <Route path="/applications" element={<MyApplicationsPage />} />
    </Routes>
  );
};

export default AppRoutes;
