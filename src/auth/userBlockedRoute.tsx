import { Navigate } from 'react-router-dom';

export const UserBlockedRoute = ({ children, user }: any) => {
  return user ? <Navigate to="/"></Navigate> : children;
};
