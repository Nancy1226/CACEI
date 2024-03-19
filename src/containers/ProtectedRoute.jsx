import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get('access-token');
    setIsAuthenticated(!!accessToken);
  }, []);

  if (!Cookies.get('access-token')) {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;