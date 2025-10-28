import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TbDeviceDesktopShare } from "react-icons/tb";
import {
  registerUser,
  selectAuthError,
  selectAuthStatus,
} from "../features/auth/authSlice";
import Swal from "sweetalert2";
import { PiUserFocus } from "react-icons/pi";
import { CgRename } from "react-icons/cg";
import EyeToggleIcon from "../components/EyeToggleIcon";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const errorMessage = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCheckedPassword, setIsCheckedPassword] = useState(false);
  // 1. State to track focus and input value
  const [focusedField, setFocusedField] = useState(null);

  // 2. Event Handlers
  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  // Toggle password
  const togglePasswordVisibility = () => setIsCheckedPassword((prev) => !prev);

  // 3. Conditional Logic: The label should be "up" if it's focused OR if it has a value
  const shouldNameLabelFloat =
    focusedField === "name" || formData.name.length > 0;
  const shouldEmailLabelFloat =
    focusedField === "email" || formData.email.length > 0;
  const shouldPasswordLabelFloat =
    focusedField === "password" || formData.password.length > 0;

  // Validate email
  const validateEmail = (email) => {
    // Trim the email string to remove leading/trailing whitespace
    const trimmedEmail = email.trim();
    // The widely accepted standard regex pattern
    const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Test the email string against the regex
    return emailRegax.test(trimmedEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Validate user input
      if (!formData.name || !formData.email || !formData.password) {
        setIsValid(true);
        return;
      }

      if (!validateEmail(formData.email)) {
        setError("Please enter a valid email address.");
        return;
      }

      const result = await dispatch(registerUser(formData)).unwrap();

      if (result) {
        Swal.fire({
          title: "Register Successed",
          text: "Your register is successfully",
          icon: "success",
        });
      }
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Failed to register",
        text: "You failed to registered",
        icon: "warning",
      });
      console.log("Login failed:", error);
      setIsValid(false);
      setIsLoading(false);
      setError(error || "Unable to register account");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // console.log('FormData-', formData);
  return (
    <section className="bg-gray-200 w-screen h-screen flex mx-auto justify-center items-center">
      <div className="sm:w-[450px] w-[350px] mx-4 container bg-white/90 space-y-3 py-5 rounded-lg shadow-md">
        <div className="md:text-2xl text-slate-800/80 font-semibold flex justify-center items-center gap-x-1">
          <TbDeviceDesktopShare size={24} className="text-blue-500" />
          <h2>Register Account</h2>
        </div>
        <hr className="text-gray-300 w-[250px] mx-auto" />
        <form
          className="space-y-6 flex flex-col justify-center items-center my-4"
          onSubmit={handleSubmit}
        >
          <div className="relative flex flex-col space-y-2 w-[250px]">
            <label
              htmlFor="name"
              className={`
              absolute left-2 transition-all duration-200 ease-in-out cursor-text px-2
              ${
                shouldNameLabelFloat
                  ? // State for Floating (Top position, smaller size, active color)
                    "-top-2 text-xs text-blue-600 bg-white px-1"
                  : // State for Default (Middle position, larger size, default color)
                    "top-2 text-base text-gray-500"
              }
            `}
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              value={formData.name} // Controlled component
              onChange={handleChange}
              onFocus={() => handleFocus("name")} // Track focus
              onBlur={handleBlur} // Track blur
              className="
              border border-gray-400 rounded-md w-full bg-white px-2 py-2 
              focus:outline-none focus:border-blue-600 placeholder:opacity-0 focus:placeholder:opacity-100
            "
              placeholder="Enter your name"
              autoComplete="name"
            />
            <CgRename
              onFocus={() => handleFocus("name")}
              size={24}
              className={`absolute right-2 top-2 transition-colors ${
                shouldNameLabelFloat ? "text-blue-400" : ""
              }`}
            />
          </div>
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
              aria-label="Register button"
            >
              {isLoading ? "loading" : "Register"}
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-black">
              Already have an account?
              <span className="ml-1 underline underline-offset-2">
                <Link to={"/login"} className="hover:text-blue-400">
                  Login
                </Link>
              </span>
            </p>
          </div>
        </form>
        {/* API error message */}
        <div className="text-center text-red-500">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        {/* Error message */}
        <div className="text-center text-red-500">
          {error && <p>{error}</p>}
        </div>
        <div className="text-center text-red-500">
          {isValid && <p>Please fill out the fleid.</p>}
        </div>
      </div>
    </section>
  );
};

export default Register;
