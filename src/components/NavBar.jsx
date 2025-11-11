import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuScanSearch } from "react-icons/lu";
import { TbShoppingBagHeart } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectUser,
  selectUserToken,
} from "../features/auth/authSlice";
import { useState } from "react";
import { selectCartItemsQuantity } from "../features/carts/cartSlice";
import { selectSearchTerm, setSearchItemName } from "../features/search/searchSlice";

const NavBar = ({ isOpen, handleOpenMenu }) => {
  const user = useSelector(selectUser);
  // Get cart quantity from cartSlice.
  const quantity = useSelector(selectCartItemsQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Search Term
  const searchTerm = useSelector(selectSearchTerm);
  // const token = useSelector(selectUserToken);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [field, setField] = useState(null);
  // Handle on user setting
  const handleOnClick = () => setIsOpenMenu(!isOpenMenu);

  // console.log('Click on user: ', isOpenMenu);
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    setIsOpenMenu(!isOpenMenu);
    navigate("/login");
  };

  const onFocus = (field) => setField(field);
  const handleBlur = () => setField(null);
  const isFocus = field === "search";

  // console.log(isFocus);
  // Menu of nav bars
  const menuItems = [
    { id: 1, label: "Home", pathName: "/" },
    { id: 2, label: "Shop", pathName: "/products" },
    { id: 3, label: "About", pathName: "/about" },
    { id: 4, label: "Contact us", pathName: "/contact" },
  ];

  // Hidden search box if user is in about and contact us page.
  const hiddenPaths = ["/about", "/contact"];
  const searchBoxHidden = hiddenPaths.includes(location.pathname);

  // console.log("User", user.name);
  // If token expired logout user
  return (
    // Make the header fixed at the top and full width, add a subtle shadow, and a white background
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-40 z-10 md:hidden"
          onClick={handleOpenMenu}
        ></div>
      )}
      {/* Container - use max-w-7xl for a wider desktop feel, center it, and add more vertical padding */}
      <div className="max-w-[1400px] mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0">
          <Link to={"/"}>
            {/* Use a strong primary color (e.g., indigo-600) and bolder font for a modern brand look */}
            {/* <h2 className="text-3xl lg:text-4xl font-extrabold text-indigo-600 hover:text-indigo-800 transition duration-300">
              T.shop
            </h2> */}
            <img src="../../images/navbar-logo.png" alt="" className="object-cover w-[150px] h-[50px]"/>
          </Link>
        </div>
        {/* Search Bar - Larger, more prominent, and centered */}{" "}
        {/* Hide on mobile, show on MD and up */}
        {!searchBoxHidden && (
          <div className="relative grow mx-8 max-w-xl hidden md:block">
            <input
              type="search"
              name="search"
              id="search"
              // Full width, rounded-full for a pill shape, light gray background, and focus ring
              className="w-full border-2 border-gray-200 bg-gray-50 rounded-full py-2 pl-4 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition duration-300"
              placeholder="Search products, categories, and more..."
              onFocus={() => onFocus("search")}
              onBlur={handleBlur}
              value={searchTerm}
              onChange={(e) => dispatch(setSearchItemName(e.target.value))}
            />
            <LuScanSearch
              size={22}
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-600 ${
                isFocus ? "text-indigo-600" : ""
              }`}
            />
          </div>
        )}
        {/* Right side - use flex and items-center for better alignment */}
        <div className="flex items-center space-x-4 max-w-xl">
          {/* Nav bar */}
          {/* Navigation Links */}
          <nav
            className={`${
              isOpen
                ? "flex flex-col items-center bg-white absolute top-16 left-0 shadow-md z-50"
                : "hidden"
            } md:flex md:flex-row md:static md:bg-transparent md:shadow-none w-full`}
          >
            <ul className="flex flex-col w-full md:flex-row justify-center items-center gap-y-4 md:gap-x-3 py-4 md:py-0 font-medium">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.pathName}
                    className={`transition-all duration-300 text-nowrap ${
                      item.pathName === location.pathname
                        ? "bg-indigo-500 text-white px-4 py-1.5 rounded-md hover:bg-indigo-600"
                        : "text-gray-300 hover:text-gray-700 hover:bg-gray-300 px-2 py-1.5 rounded-md"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Cart Icon - clickable for UX, larger, and same color as the logo/links */}
          <Link
            to={"/cart"}
            className="text-gray-600 hover:text-indigo-600 transition duration-300 relative"
          >
            <TbShoppingBagHeart size={28} />
            {/* Optional: Add a simple badge for item count */}
            <span className="absolute top-1.5 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {quantity}
            </span>
          </Link>
          <span className="md:flex hidden text-gray-400">|</span>
          {/* Authentication Links - clear visual separation and hover effect */}
          <div className="flex items-center text-gray-600">
            {" "}
            {/* Hide on small screens to save space */}
            {user ? (
              <div className="relative flex justify-center items-center gap-x-2 border border-transparent hover:border transition-all ease-in-out duration-300 hover:border-black">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full shadow-sm bg-gray-300 cursor-pointer font-medium"
                  onClick={handleOnClick}
                >
                  {user?.name[0].toUpperCase()}
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                <Link
                  to={"/login"}
                  className="font-medium hover:text-indigo-600 transition duration-300"
                >
                  Login
                </Link>
                <span className="text-gray-300">|</span>
                {/* Register button for better visibility */}
                <Link
                  to={"/register"}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-300 text-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleOpenMenu()}
            className="block md:hidden text-gray-600 hover:text-gray-900"
          >
            {isOpen ? (
              <MdOutlineRestaurantMenu size={28} />
            ) : (
              <IoMenu size={28} />
            )}
          </button>
          {/* Tooltip of user setting */}
          {isOpenMenu && (
            <div
              className={`flex flex-col justify-start items-start absolute bg-white w-[250px] -bottom-50 h-auto right-0 rounded-lg py-2 px-3 transition-all ease-in-out border border-gray-300 space-y-3 transform ${
                isOpenMenu ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-gray-800 text-base text-nowrap hover:bg-gray-200 transition-colors duration-300 w-full py-1.5 px-2 font-medium">
                {user?.email}
              </span>
              <Link
                to={"/order"}
                className="text-nowrap text-base hover:bg-gray-200 transition-colors duration-300 w-full py-1.5 px-2"
              >
                {/* <LiaUserLockSolid size={28} /> */}
                My Order
              </Link>
              <Link
                to={"/profile"}
                className="text-nowrap text-base hover:bg-gray-200 transition-colors duration-300 w-full py-1.5 px-2"
              >
                {/* <LiaUserLockSolid size={28} /> */}
                Go to Setting
              </Link>
              <hr className="w-[220px] text-gray-300" />
              {/* Register button for better visibility */}
              <button
                onClick={handleLogout}
                type="button"
                className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-300 text-nowrap cursor-pointer"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
