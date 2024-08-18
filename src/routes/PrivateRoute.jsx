import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <h2>loading...</h2>;

  if (user) return children;
  return <Navigate to="/login" navigate={location.pathname} replace={true} />;
};
export default PrivateRoute;
