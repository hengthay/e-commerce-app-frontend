import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  
  // Only check for token existence
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, allow access to protected routes
  return <Outlet />;
};

export default ProtectedRoutes;
