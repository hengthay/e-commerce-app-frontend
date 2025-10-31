import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProduct, getProductDetailById, selectProductById, selectProductByIdError, selectProductByIdStatus } from "../features/products/productSlice";
import { Link, useParams } from "react-router-dom";
import { selectUserToken } from "../features/auth/authSlice";
import Swal from "sweetalert2";

const ProductDetail = () => {

  // Redux state
  const product = useSelector(selectProductById);
  const status = useSelector(selectProductByIdStatus);
  const errorMessage = useSelector(selectProductByIdError);
  // Token
  const token = useSelector(selectUserToken);
  // ProductId
  const { id } = useParams();
  const productId = parseInt(id, 10);
  // console.log('ID: ', id);
  // Action
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if(productId) {
        dispatch(getProductDetailById(productId))
      }
    } catch (error) {
      console.log(error);
    }

    return () => dispatch(clearSelectedProduct())
  }, [productId, dispatch]);

  // console.log('Product', product);
  // Handle add to cart
  const handleAddToCart = async (productId) => {
    // Case for guest user
    if(!token) {
      const carts = JSON.parse(localStorage.getItem("cartTemp")) || [];

      // If item already exists
      const existingCartItem = carts.find((item) => item.id === productId);
      console.log('Exists', existingCartItem);
      
      if(existingCartItem) {
        existingCartItem.quantity += 1;
      }else {
        carts.push({
          id: productId,
          title: product.title,
          price: product.price,
          image_url: product.image_url,
          type: product.type,
          quantity: 1,
        })
      };

      // Set to localStorage
      localStorage.setItem('cartTemp', JSON.stringify(carts));
      console.log("Cart items: ", carts);
      // ✅ SweetAlert for guest user
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: 'Item added to cart (Guest Mode)',
        showConfirmButton: false,
        timer: 1500
      });
    }else {
      alert(`Added to cart successful with id: ${productId}`);
    }
  }
 
  return (
    <section className="w-full">
      <div className="section-container mx-auto lg:my-20 md:my-15 my-10 max-sm:w-[400px] w-full md:px-4 md:py-4 flex flex-col justify-center space-y-3">
        <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-start w-full max-w-6xl mx-auto gap-10 my-15">
          {/* Product details will go here */}
          {/* Product Image */}
          <div className="w-full flex justify-center">
            <img
              src={`../../images/${product?.image_url}`}
              alt={product?.title}
              className="object-contain md:h-[480px] h-[350px] w-full max-w-md max-sm:w-[400px] rounded-xl shadow-md transition-transform duration-300 hover:scale-105 p-3"
            />
          </div>
          {/* Product Info */}
          <div className="w-full flex flex-col md:space-y-6 space-y-2">
            {/* Title */}
            <h4 className="text-gray-800 md:text-4xl sm:text-3xl text-2xl font-bold leading-tight">
              {product?.title}
            </h4>
            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-lg">Price:</span>
              <span className="text-3xl font-semibold text-indigo-600">
                $ {product?.price}
              </span>
            </div>
            {/* Description */}
            <p className="text-gray-500 leading-relaxed md:text-lg text-sm">
              {product?.description}
            </p>
            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <p className="text-gray-700 md:text-base text-sm">
                Quantity:{" "}
                <span className="font-semibold text-indigo-600">2</span>
              </p>
              <button 
              onClick={() => handleAddToCart(product?.id)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-all shadow hover:shadow-lg cursor-pointer">
                Add to Cart
              </button>
            </div>
            <div className="flex justify-start items-center gap-x-3 my-2">
              <p className="text-gray-700 md:text-base text-sm">Available Stock: <span>{product?.stock}</span></p>
              <p className="text-gray-500 leading-relaxed md:text-lg text-sm">Type: {product?.type}</p>
            </div>
            <Link to={'/products'} className="bg-black hover:bg-transparent border border-transparent text-white py-3 px-6 rounded-lg font-medium transition-all shadow hover:text-black hover:border-black hover:shadow-lg cursor-pointer w-50 text-center">
              Continue Shopping
            </Link>
            {/* Divider */}
            <hr className="border-gray-200" />
            {/* Additional mini-info list (optional enhancement) */}
            <ul className="text-sm text-gray-500 space-y-1">
              <li>✅ Free Shipping on orders above $50</li>
              <li>✅ 7-Days Return Policy</li>
              <li>✅ Secure Payment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
