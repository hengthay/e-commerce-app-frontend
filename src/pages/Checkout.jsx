import { useState } from "react";
import CartOrder from "../components/Carts/CartOrder";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCartItems,
  selectCartDelivery,
  selectCartSubtotal,
} from "../features/carts/cartSlice";
import { placeOrder } from "../features/orders/orderSlice";
import Paypal from "../components/Paypal";
import Swal from "sweetalert2";
import CheckoutButton from "../components/Checkout/CheckoutButton";

const Checkout = () => {
  // Redux State
  const cartItems = useSelector(selectAllCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const delivery = useSelector(selectCartDelivery);
  const total = subtotal + delivery;
  const token = localStorage.getItem("token");
  console.log(cartItems);
  // Action
  const dispatch = useDispatch();
  // State
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    country: "",
    postal_code: "",
    phone_number: "",
    fullname: "",
    email: "",
  });
  // Onsuccess
  const onSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Your payment is success✅",
      text: "Thank you for purchasing.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const onError = () => {
    Swal.fire({
      icon: "error",
      title: "Your payment is failed❌",
      text: "Please retry again.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Handle on change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle place order button
  const handlePlaceOrder = async () => {
    if (!token) {
      alert("Please login before placing an order!");
      return;
    }
    try {
      const body = {
        street: formData.street,
        city: formData.city,
        country: formData.country,
        postal_code: formData.postal_code,
        phone_number: formData.phone_number,
      };

      if (
        !body.street ||
        !body.city ||
        !body.country ||
        !body.postal_code ||
        !body.phone_number
      ) {
        alert("Please fill out the required box.");
        return;
      }

      await dispatch(placeOrder(body)).unwrap();
      alert("Place order successful");
    } catch (error) {
      console.error(error);
      alert("Failed to place order!");
    }
  };
  console.log("FormData: ", formData);

  return (
    <section className="w-full bg-[#FDF9EF]">
      <div className="section-container mx-auto lg:my-20 md:my-15 my-10 max-sm:w-[350px] md:px-4 md:py-4 flex flex-col justify-center space-y-3">
        <h4 className="md:text-3xl lg:text-5xl text-2xl font-medium text-gray-700 my-10">
          Checkout
        </h4>
        {/* Payment and information to proceed checkout */}
        <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-start w-full gap-10">
          {/* Billing information */}
          <div className="flex flex-col w-full space-y-4 shadow-md rounded-md p-4 bg-white">
            <div className="flex flex-col">
              <h5 className="text-gray-700 md:text-lg font-semibold text-base">
                Shipping Information
              </h5>
            </div>
            {/* Addresses section */}
            <div className="flex flex-col w-full space-y-3">
              <div className="flex flex-col space-y-2">
                <label htmlFor="country" className="text-gray-800 text-base">
                  <span className="text-red-500 font-semibold">*</span> Country
                </label>
                <select
                  name="country"
                  id="country"
                  className="p-3 border border-gray-300 focus:outline focus:outline-indigo-500"
                  value={formData.country}
                  onChange={handleOnChange}
                >
                  <option value="">Select a country</option>
                  {/* CHANGE THESE VALUES */}
                  <option value="KH">Cambodia</option>
                  <option value="US">United States</option>
                  <option value="JP">Japan</option>
                  <option value="BR">Brazil</option>
                  <option value="CA">Canada</option>
                  <option value="DE">Germany</option>
                  <option value="AU">Australia</option>
                  <option value="ZA">South Africa</option>
                  <option value="MX">Mexico</option>
                  <option value="IT">Italy</option>
                  <option value="IN">India</option>
                  <option value="FR">France</option>
                  <option value="TH">Thailand</option>
                  {/* Add other countries with their ISO codes */}
                </select>
              </div>
              <div className="flex md:flex-row flex-col space-y-2 gap-x-3">
                <div className="flex flex-col md:w-1/2 w-full space-y-2">
                  <label htmlFor="fullname" className="text-gray-800 text-base">
                    Fullname <span className="text-red-500">(Optional)</span>
                  </label>
                  <input
                    name="fullname"
                    id="fullname"
                    className="p-3 border border-gray-300 focus:outline focus:outline-indigo-500"
                    value={formData.fullname}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex flex-col md:w-1/2 w-full space-y-2">
                  <label htmlFor="email" className="text-gray-800 text-base">
                    Email <span className="text-red-500">(Optional)</span>
                  </label>
                  <input
                    name="email"
                    id="email"
                    className="p-3 border border-gray-300 focus:outline focus:outline-indigo-500"
                    value={formData.email}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2 gap-x-3">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="street" className="text-gray-800 text-base">
                    <span className="text-red-500">*</span> Address
                  </label>
                  <input
                    name="street"
                    id="street"
                    className="p-3 border border-gray-300 focus:outline focus:outline-indigo-500"
                    placeholder="Street Address (st, 508)"
                    value={formData.street}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2 gap-x-3">
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="phone_number"
                    className="text-gray-800 text-base"
                  >
                    <span className="text-red-500">*</span> Phone number
                  </label>
                  <input
                    name="phone_number"
                    id="phone_number"
                    className="p-3 border border-gray-300 focus:outline focus:outline-indigo-500"
                    placeholder="Phone number"
                    value={formData.phone_number}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col space-y-2 gap-x-3">
                <div className="flex flex-col md:w-1/2 w-full space-y-2">
                  <label htmlFor="city" className="text-gray-800 text-base">
                    <span className="text-red-500">*</span> City
                  </label>
                  <input
                    name="city"
                    id="city"
                    className="p-3 border border-gray-300 focus:outline focus:outline-indigo-500"
                    value={formData.city}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex flex-col md:w-1/2 w-full space-y-2">
                  <label
                    htmlFor="postal_code"
                    className="text-gray-800 text-base"
                  >
                    <span className="text-red-500">*</span> Posta / Zip
                  </label>
                  <input
                    name="postal_code"
                    id="postal_code"
                    className="p-3 border border-gray-300 focus:outline focus:outline-indigo-500"
                    value={formData.postal_code}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary and Select payment */}
          <div className="flex flex-col w-full space-y-4 shadow-md rounded-md p-4 bg-white">
            <div className="flex flex-col space-y-4">
              <h5 className="text-gray-800 font-semibold md:text-lg text-base">
                Order Summary
              </h5>
              <hr className="text-gray-300" />
            </div>
            {/* Cart Orders */}
            <div className="flex flex-col w-full">
              <div className="w-full space-y-3">
                {cartItems.map((item) => (
                  <CartOrder item={item} key={item.id} />
                ))}
              </div>
            </div>
            <hr className="text-gray-300" />
            {/* Order Totals */}
            <div className="flex justify-between items-center">
              <p className="text-base text-gray-500">Subtotal</p>
              <p className="text-base font-semibold text-gray-800">
                $ {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-gray-500">Delivery Fee</p>
              <p className="text-base font-semibold text-gray-800">
                {delivery === 0 ? "Free" : delivery}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base font-semibold text-gray-800">Total</p>
              <p className="text-base font-semibold text-gray-800">
                $ {total.toFixed(2)}
              </p>
            </div>
            {/* Payment Methods */}
            <div className="flex flex-col space-y-3 pt-4">
              <h5 className="text-gray-800 font-semibold md:text-lg text-base">
                Payment Method
              </h5>
              <div className="w-full">
                <CheckoutButton
                  formData={formData}
                  onSuccess={onSuccess}
                  onError={onError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
