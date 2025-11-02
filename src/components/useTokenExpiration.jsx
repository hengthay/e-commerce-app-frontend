import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice';

const useTokenExpiration = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!token) return; // no token mean token is not valid

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // convert to seconds
      const timeLeft = decodedToken.exp - currentTime;

      if(timeLeft <= 0) {
        // Token is already expired
        alert('Token is expired! Please re-login');
        dispatch(logout());
        return;
      }

      const timer = setTimeout(() => {
        dispatch(logout());
        window.location.href = '/login';
      }, timeLeft * 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Invalid token:", error);
      dispatch(logout());
      return;
    }
  }, [dispatch]);
}

export default useTokenExpiration