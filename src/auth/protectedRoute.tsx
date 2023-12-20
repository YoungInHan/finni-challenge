import { User } from '@firebase/auth';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  user: User | null;
}

export const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {
  return user ? <>{children}</> : <Navigate to="/auth/login"></Navigate>;
};

export const UserBlockedRoute = ({ children, user }: ProtectedRouteProps) => {
  return user ? <Navigate to="/"></Navigate> : <>{children}</>;
};
