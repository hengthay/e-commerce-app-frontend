import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import OrderHistory from './pages/OrderHistory'
import ProtectedRoutes from './components/ProtectedRoutes'
import NavBar from './components/NavBar'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import useTokenExpiration from './components/Helpers/useTokenExpiration'
import { useDispatch } from 'react-redux'
import { fetchCarts } from './features/carts/cartSlice'

const App = () => {
  // Set hamburger button for navbar
  const [isOpen, setIsOpen] = useState(false);
  // Get token from localStorage
  const token = localStorage.getItem('token');
  // Action
  const dispatch = useDispatch();
  // Handle on closed hamburger
  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  useTokenExpiration(); // Run to check token expiration time.
  // Fetch carts for logged user
  useEffect(() => {
    if(token) {
      dispatch(fetchCarts());
    }
  }, [dispatch, token]);

  return (
    <>
      {/* <Navigation /> */}
      <NavBar isOpen={isOpen} handleOpenMenu={handleOpenMenu}/>
      <Routes>
        {/* Public routes */}
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        
        {/* Protected routes - require authentication */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<OrderHistory />} />
        </Route>
      </Routes>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default App