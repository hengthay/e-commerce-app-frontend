import React from 'react'
import { logout, selectUser } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  console.log('User', user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      {/* Cart items will go here */}
      <button 
      type='submit'
      onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Cart