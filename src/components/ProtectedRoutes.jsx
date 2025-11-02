import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const ProtectedRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Only check for token existence
  const token = localStorage.getItem("token");

  // Check if token is expired redirect user to login page
  const isTokenExpired = useCallback(() => {
    if (!token) return true;

    try {
      // Decode the token to get the expiry timestamp (exp)
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

      // Check if the token's expiry time is less than the current time
      return decodedToken.exp < currentTime;
    } catch (error) {
      // If the token is invalid or decoding fails, assume it's unusable
      console.error("Invalid token:", error);
      return true;
    }
  }, [token]);

  useEffect(() => {
    // Run the check on mount/token change
    if (isTokenExpired()) {
      console.log("Token expired. Logging out user.");
      // Dispatch the logout action to clear state and localStorage
      dispatch(logout());
    }
  }, [dispatch, isTokenExpired]);
  
  if (!token || isTokenExpired()) {
    // If no token, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, allow access to protected routes
  return <Outlet />;
};

export default ProtectedRoutes;
