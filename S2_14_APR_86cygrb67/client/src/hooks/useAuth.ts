import { useAppSelector } from '../redux/store';
import { selectIsAuthenticated, selectUserRole } from '../redux/slices/authSlice';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectUserRole);
  return { isAuthenticated, role };
};