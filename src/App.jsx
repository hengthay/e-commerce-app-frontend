import { useState } from 'react'
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

const App = () => {
  // Set hamburger button for navbar
  const [isOpen, setIsOpen] = useState(false);

  // Handle on closed hamburger
  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

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
          <Route path="/orders" element={<OrderHistory />} />
        </Route>
      </Routes>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default App