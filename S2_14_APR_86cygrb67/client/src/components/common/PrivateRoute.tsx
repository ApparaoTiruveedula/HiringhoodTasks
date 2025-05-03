import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { selectIsAuthenticated, selectUserRole } from '../../redux/slices/authSlice';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;