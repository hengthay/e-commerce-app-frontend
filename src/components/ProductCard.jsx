import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUserToken } from "../features/auth/authSlice";
import { FaArrowsToEye } from "react-icons/fa6";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  // State
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const navigate = useNavigate();
  // Must user login for add to cart
  const token = useSelector(selectUserToken);

  // Handle Cart Click
  const handleAddToCart = (productId) => {
    if (!token) {
      // Store cart for guest
      const carts = JSON.parse(localStorage.getItem("cartTemp")) || [];
      // Check if products existing items
      const existingItem = carts.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        carts.push({
          id: productId,
          title: product.title,
          price: product.price,
          image_url: product.image_url,
          type: product.type,
          quantity: 1,
        });
      }

      // Set to localStorage
      localStorage.setItem("cartTemp", JSON.stringify(carts));
      console.log("Cart items: ", carts);
      // ✅ SweetAlert for guest user
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: 'Item added to cart (Guest Mode)',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else {
      alert(`Added to cart successful with id: ${productId}`);
    }
  };
  // Log token
  // console.log('User Token: ', token);
  return (
    <div
      className="relative flex flex-col justify-center items-center py-4 px-4 space-y-2 rounded-lg group"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      key={product.id}
    >
      {/* 1. Animated Background "Push" Effect (Add this back if you want the BG push) */}
      <div
        className={`
          absolute inset-x-0 bottom-0 bg-gray-100 transition-all duration-300 ease-in-out rounded-md
          ${isHovered ? "h-1/2" : "h-0"}
        `}
      ></div>
      {/* 2. Product Image */}
      <Link to={`/product/${product.id}`} className="relative group">
        {/* Hover View Icon */}
        <div
          className="
            absolute inset-0 flex justify-center items-center 
            opacity-0 group-hover:opacity-100 
            transition-all duration-300 ease-in-out 
            z-20
          "
        >
          <div
            className="
              bg-white bg-opacity-70 backdrop-blur-md 
              p-3 rounded-full shadow-md 
              scale-75 group-hover:scale-100 
              transition-all duration-300 ease-in-out
            "
          >
            <FaArrowsToEye size={24} className="text-gray-800" />
          </div>
        </div>
        <img
          src={`../../images/${product.image_url}`}
          alt={product.title}
          className="object-contain md:w-[400px] md:h-[350px] w-[250px] h-[300px] transition-all ease-in-out duration-300 transform group-hover:-translate-y-2 relative z-10 group-hover:blur-[1px]"
          aria-label="product-image"
        />
      </Link>

      {/* 3. Product Info Container */}
      <div className="flex flex-col justify-center items-center space-y-1.5 relative z-10 md:my-3">
        <h3
          className="text-gray-600 text-wrap font-semibold text-center lg:text-xl md:text-lg text-base"
          aria-label="product-title"
        >
          {product.title}
        </h3>
        <p
          className="text-gray-800 text-wrap font-semibold text-center lg:text-xl md:text-lg text-base"
          aria-label="product-prices"
        >
          $ {product.price}
        </p>
        {/* 4. ALWAYS RENDER THE BUTTON, Control visibility with classes */}
        <button
          onClick={() => handleAddToCart(product.id)}
          className={`
            absolute
            left-1/2 -translate-x-1/2
            bottom-[-45px] 
            p-3 
            transition-all duration-300 whitespace-nowrap cursor-pointer
            // Core visibility logic:
            ${
              isHovered
                ? "opacity-100 translate-y-3"
                : "opacity-0 translate-y-8 pointer-events-none" // pointer-events-none prevents clicking an invisible button
            }
          `}
          aria-label="Add-to-cart button"
        >
          <IoIosAddCircle size={40} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
