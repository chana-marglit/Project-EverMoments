// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { getStoredUser } from '../api/api';

// const PrivateRoute: React.FC = () => {
//   const user = getStoredUser();

//   return user && user.token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';


const PrivateRoute: React.FC = () => {
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div style={{ textAlign: 'center' }}>טוען...</div>
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
