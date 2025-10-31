import { useEffect } from 'react'
import CartCard from '../components/CartCard'
import { Link } from 'react-router-dom'
import { IoArrowForwardSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarts, loadGuestCarts, selectCartDelivery, selectCartItemsStatus, selectCartSubtotal } from '../features/carts/cartSlice';
import { selectUserToken } from '../features/auth/authSlice';

const Cart = () => {
  // State from redux
  const status = useSelector(selectCartItemsStatus);
  const token = useSelector(selectUserToken);
  // Check if token exists we fetch from cartItems, otherwise we fetch from cartTempItems localStorage for guest user.
  const cartItems = useSelector(state => token ? state.carts.cartItems : state.carts.cartTempItems);
  const subtotal = useSelector(selectCartSubtotal);
  const delivery = useSelector(selectCartDelivery);
  const total = subtotal + delivery;

  // console.log(subtotal);
  // console.log(total);

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if(token) {
        dispatch(fetchCarts())
      }else {
        dispatch(loadGuestCarts())
      }
    } catch (error) {
      console.log('Error', error);
    }
  }, [dispatch, token]);

  console.log('Carts: ', cartItems);

  return (
    <section className='w-full bg-gray-100/50 min-h-40'>
      {/* Cart items will go here */}
      <div className='section-container max-sm:w-[350px] mt-10 flex flex-col justify-center space-y-3 mx-auto'>
        <h1 className='mt-10 md:text-3xl lg:text-4xl text-2xl font-medium text-gray-700'>Shopping Cart</h1>
        <div className='mt-20 flex flex-row w-full mx-auto justify-center'>
          <div className='w-full max-w-6xl flex justify-center items-center flex-col mx-auto space-y-4'>
            {/* ✅ Scrollable container for small screens */}
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto min-w-[700px]">
                <thead>
                  <tr className="border-b-2 text-gray-700">
                    <th className="py-4 px-4">Image</th>
                    <th className="py-4 px-4">Product</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Quantity</th>
                    <th className="py-4 px-4">Total</th>
                    <th className="py-4 px-4">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItems.map((item) => (
                      <CartCard item={item} key={item.id}/>
                    ))
                  }
                </tbody>
              </table>
            </div>
            {/* ✅ End scrollable container */}
            {/*  */}
            <div className='my-10 flex md:flex-row flex-col w-full max-sm:w-[350px] justify-between items-start space-y-10'>
              {/* Continue shopping */}
              <div className='max-w-[500px] flex flex-col space-y-4'>
                <Link to={'/products'} className="bg-black hover:bg-transparent border border-transparent text-white py-3 px-6 rounded-lg font-medium transition-all shadow hover:text-black hover:border-black hover:shadow-lg cursor-pointer w-50 text-center">
                  Continue Shopping
                </Link>
                <div className='flex gap-x-3 w-full mt-4'>
                  <input type="text" placeholder='Apply promo code' className='px-4 py-2.5 rounded-md border border-gray-300 placeholder:text-sm w-full'/>
                  <button className='bg-black hover:bg-transparent border border-transparent text-white px-4 py-1.5 rounded-lg font-medium transition-all shadow hover:text-black hover:border-black hover:shadow-lg cursor-pointer text-center min-w-30'>
                    Apply
                  </button>
                </div>
                {/* Description */}
                <div className='mt-2 max-w-sm'>
                  <span className='text-gray-500 md:text-base text-sm'>To more you shopping with us the more you get your fresh feeling of enjoy to spent your self a beatiful days.</span>
                </div>
              </div>
              {/* Cart summary */}
              <div className='flex flex-col w-full max-w-[350px] shadow p-5 space-y-3 rounded-md'>
                <h3 className='md:text-lg lg:text-xl text-base font-semibold'>Order Summary</h3>
                <hr className='text-gray-300 my-2'/>
                <div className='flex justify-between items-center mt-2'>
                  <div className='text-gray-500 md:text-base text-sm'>
                    <p>Subtotal</p>
                  </div>
                  <div className='md:text-base text-sm font-semibold'>
                    <p>$ {subtotal.toFixed(2)}</p>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='text-gray-500 md:text-base text-sm'>
                    <p>Delivery Fee</p>
                  </div>
                  <div className='md:text-base text-sm font-semibold'>
                    <span>{delivery === 0 ? "Free" : delivery}</span>
                  </div>
                </div>
                <hr className='text-gray-300 my-2'/>
                <div className='flex justify-between items-center'>
                  <div className='text-gray-800 text-lg'>
                    <p>Total</p>
                  </div>
                  <div className='text-gray-800 text-lg font-semibold'>
                    <p>$ {total.toFixed(2)}</p>
                  </div>
                </div>
                <div className='flex my-2 w-full'>
                  <button className='flex w-full justify-center items-center bg-black hover:bg-transparent border border-transparent text-white py-2.5 rounded-4xl font-medium transition-all shadow hover:text-black hover:border-black hover:shadow-lg cursor-pointer text-center group'>
                    <span>Go to Checkout</span>
                    <IoArrowForwardSharp size={24} className='transition duration-300 transform group-hover:translate-x-2'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart