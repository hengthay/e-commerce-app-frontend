import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  loginUser,
  selectAuthError,
  selectAuthStatus,
  selectUser,
  selectUserToken,
} from "../features/auth/authSlice";
import Swal from "sweetalert2";
import { CiDesktop } from "react-icons/ci";
import { PiUserFocus } from "react-icons/pi";
import EyeToggleIcon from "../components/EyeToggleIcon";
import axios from "axios";

const Login = () => {
  // State and action
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectUserToken);
  const errorMessage = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isCheckedPassword, setIsCheckedPassword] = useState(false);
  // 1. State to track focus and input value
  const [focusedField, setFocusedField] = useState(null);

  // 2. Event Handlers
  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  // Toggle password
  const togglePasswordVisibility = () => setIsCheckedPassword((prev) => !prev);

  // 3. Conditional Logic: The label should be "up" if it's focused OR if it has a value
  const shouldEmailLabelFloat =
    focusedField === "email" || formData.email.length > 0;
  const shouldPasswordLabelFloat =
    focusedField === "password" || formData.password.length > 0;

  // Handle successful login
  useEffect(() => {
    if (token) {
      // Navigate to the protected route the user tried to visit, or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [token, navigate, location]);

  // Validate email
  const validateEmail = (email) => {
    // Trim the email string to remove leading/trailing whitespace
    const trimmedEmail = email.trim();
    // The widely accepted standard regex pattern
    const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Test the email string against the regex
    return emailRegax.test(trimmedEmail);
  };
  // Handle submit on login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(null);
      if (!formData.email || !formData.password) {
        setIsValid(true);
        setIsLoading(false);
        return;
      }

      // validateEmail expects the email string from formData
      if (!validateEmail(formData.email)) {
        setIsError("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }
      // Copy the payload to send to backend
      const payload = { ...formData };
      // Clear the form immediately so Redux / network won't contain email/password in payload.
      setFormData({ email: "", password: ""});

      const result = await dispatch(loginUser(payload)).unwrap();

      // console.log("Token received:", result.token); // should log the token
      if (result?.token) {
        const guestCartItems =
          JSON.parse(localStorage.getItem("cartTemp")) || [];
        // Check if guestCartItems is greater than 0
        if (guestCartItems.length > 0) {
          await axios.post(
            "http://localhost:3000/api/cart/sync",
            {
              // Loop through guestItem and assign productId and quantity to match backend.
              items: guestCartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity
              })),
            },
            { headers: { Authorization: `Bearer ${result.token}` } }
          );

          // Remove guest cart from localstorage
          localStorage.removeItem("cartTemp");
          console.log("Guest cart synced to user cart successfully!");
        }

        setFormData({ email: "", password: ""})
      }
      Swal.fire({
        title: "Login Successed",
        text: "Your login is successfully",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Failed to Login",
        text: "Your failed to login",
        icon: "warning",
      });
      console.log("Login failed:", error);
      setIsLoading(false);
      setIsError("Invalid credentials");
    } finally {
      setIsError("");
    }
  };
  // Handle on change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // console.log('Form Data: ', formData);

  return (
    <section className="bg-gray-200 w-screen h-screen flex mx-auto justify-center items-center">
      <div className="sm:w-[450px] w-[350px] mx-4 container bg-white/90 space-y-3 py-3 rounded-lg shadow-md">
        <div className="md:text-2xl text-slate-800/80 font-semibold flex justify-center items-center gap-x-1">
          <CiDesktop size={24} className="text-blue-500" />
          <h2>Login Account</h2>
        </div>
        <hr className="text-gray-300 w-[250px] mx-auto" />
        <form
          className="space-y-6 flex flex-col justify-center items-center my-4"
          onSubmit={handleSubmit}
        >
          <div className="relative flex flex-col space-y-2 w-[250px]">
            <label
              htmlFor="email"
              className={`
              absolute left-2 transition-all duration-200 ease-in-out cursor-text px-2
              ${
                shouldEmailLabelFloat
                  ? // State for Floating (Top position, smaller size, active color)
                    "-top-2 text-xs text-blue-600 bg-white px-1"
                  : // State for Default (Middle position, larger size, default color)
                    "top-2 text-base text-gray-500"
              }
            `}
            >
              Email
            </label>
            <input
              name="email"
              type="text"
              id="email"
              value={formData.email} // Controlled component
              onChange={handleChange}
              onFocus={() => handleFocus("email")} // Track focus
              onBlur={handleBlur} // Track blur
              className="
              border border-gray-400 rounded-md w-full bg-white px-2 py-2 
              focus:outline-none focus:border-blue-600 placeholder:opacity-0 focus:placeholder:opacity-100
            "
              placeholder="john@example.com"
              autoComplete="email"
            />
            <PiUserFocus
              onFocus={() => handleFocus("email")}
              size={24}
              className={`absolute right-2 top-2 transition-colors ${
                shouldEmailLabelFloat ? "text-blue-400" : ""
              }`}
            />
          </div>
          <div className="relative flex flex-col space-y-2 w-[250px]">
            <label
              htmlFor="password"
              className={`
              absolute left-2 transition-all duration-200 ease-in-out cursor-text px-2
              ${
                shouldPasswordLabelFloat
                  ? "-top-2 text-xs text-blue-600 bg-white px-1"
                  : "top-2 text-base text-gray-500"
              }
            `}
            >
              Password
            </label>
            <input
              name="password"
              type={isCheckedPassword ? "text" : "password"}
              id="password"
              value={formData.password} // Controlled component
              onChange={handleChange}
              onFocus={() => handleFocus("password")} // Track focus
              onBlur={handleBlur} // Track blur
              className="
              border border-gray-400 rounded-md w-full bg-white px-2 py-2 
              focus:outline-none focus:border-blue-600 placeholder:opacity-0 focus:placeholder:opacity-100
            "
              placeholder="Enter your password"
              autoComplete="password"
            />
            <EyeToggleIcon
              isChecked={isCheckedPassword}
              onClick={togglePasswordVisibility}
              shouldPasswordLabelFloat={shouldPasswordLabelFloat}
            />
          </div>
          <div className="flex justify-center items-center space-y-2 mx-auto w-full">
            <button
              type="submit"
              className="bg-black text-white w-[250px] py-1.5 rounded-md font-medium cursor-pointer border border-transparent hover:bg-transparent hover:text-black hover:border hover:border-black transition-colors ease-in-out duration-300"
              aria-label="Login button"
            >
              {isLoading ? "loading" : "Login"}
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-black">
              Don't have an account?
              <span className="ml-1 underline underline-offset-2">
                <Link to={"/register"} className="hover:text-blue-400">
                  Register
                </Link>
              </span>
            </p>
          </div>
        </form>
        {/* API error message */}
        {errorMessage && (
          <p className="text-center text-red-500 text-sm mt-2">
            {errorMessage}
          </p>
        )}

        {/* Error message */}
        <div className="text-center text-red-500">
          {isError && <p>{isError}</p>}
        </div>
        <div className="text-center text-red-500">
          {isValid && <p>Please fill out the fleid.</p>}
        </div>
      </div>
    </section>
  );
};

export default Login;
