import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>
      <div className="nav-right">
        {token ? (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Orders</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;