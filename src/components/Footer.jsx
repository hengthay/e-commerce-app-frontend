import { MdOutlineForwardToInbox } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {

  const location = useLocation();

  return (
    <footer className="w-full">
      <div className="section-container max-sm:w-[400px] flex flex-col lg:my-20 md:my-10 my-8">
        {/* Subscribe to NewsLetter */}
        <div className="flex flex-col space-y-4 sm:items-start justify-center items-center">
          {/* Heading */}
          <div className="flex items-center gap-x-2">
            <MdOutlineForwardToInbox size={28} className="text-indigo-500" />
            <p className="md:text-xl text-lg text-gray-800 font-semibold">
              Subscribe to Newsletter
            </p>
          </div>
          <form className="flex md:flex-row flex-col w-[450px] max-sm:w-[300px] gap-3 md:gap-x-4">
            <input
              type="text"
              name="full-name"
              placeholder="Full Name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <div className="w-full max-sm:w-[300px] flex md:flex-row gap-x-2.5">
              <input
                type="email"
                name="gmail"
                placeholder="Email Address"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-6 py-3.5 transition w-full md:w-auto"
              >
                <FiSend size={20} className="mr-1" />
              </button>
            </div>
          </form>
        </div>
        {/* Footer side */}
        <div className="mt-20 flex md:flex-row flex-col justify-between items-center">
          {/* Footer description */}
          <div className="flex flex-col space-y-5">
            <Link to={"/"}>
              {/* Use a strong primary color (e.g., indigo-600) and bolder font for a modern brand look */}
              {/* <h2 className="text-3xl lg:text-4xl font-extrabold text-indigo-600 hover:text-indigo-800 transition duration-300">
                T.shop
              </h2> */}
              <img src="../../images/footer-logo.png" alt="navbar-logo" className="object-cover w-[200px] h-20"/>
            </Link>
            <p className="md:text-base text-sm max-w-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              numquam cupiditate eveniet dolorem aliquam qui et consequuntur
              repudiandae incidunt dolores.
            </p>
            <div className="flex justify-start items-center gap-x-3 my-2">
              <span className="bg-indigo-100 hover:bg-indigo-600 p-2 rounded-md group transition-colors duration-300 ease-in-out">
                <FaFacebookF
                  size={20}
                  className="text-indigo-600 group-hover:text-white transition"
                />
              </span>

              <span className="bg-indigo-100 hover:bg-indigo-600 p-2 rounded-md group transition-colors duration-300 ease-in-out">
                <FaTelegramPlane
                  size={20}
                  className="text-indigo-600 group-hover:text-white transition"
                />
              </span>

              <span className="bg-indigo-100 hover:bg-pink-600 p-2 rounded-md group transition-colors duration-300 ease-in-out">
                <FaInstagram
                  size={20}
                  className="text-indigo-600 group-hover:text-white transition"
                />
              </span>

              <span className="bg-indigo-100 hover:bg-indigo-600 p-2 rounded-md group transition-colors duration-300 ease-in-out">
                <FaLinkedin
                  size={20}
                  className="text-indigo-600 group-hover:text-white transition"
                />
              </span>
            </div>
          </div>
          {/* Footer site map */}
          <div className="flex flex-col justify-center items-center space-y-2 mt-15 max-sm:mt-15">
            <p className="font-medium md:text-lg text-base text-gray-800">
              Sites Map
            </p>
            <ul className="space-y-2 max-sm:text-center">
              <li>
                <Link
                  to={"/"}
                  className={`text-gray-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out ${location.pathname === '/' ? "underline underline-offset-4 text-indigo-600" : "text-gray-500"}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/products"}
                  className={`text-gray-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out ${location.pathname === '/products' ? "underline underline-offset-4 text-indigo-600" : "text-gray-500"}`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className={`text-gray-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out ${location.pathname === '/about' ? "underline underline-offset-4 text-indigo-600" : "text-gray-500"}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className={`text-gray-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out ${location.pathname === '/contact' ? "underline underline-offset-4 text-indigo-600" : "text-gray-500"}`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Copy Right */}
        <hr className="w-full mt-8 text-gray-200"/>
        <p className="mt-5 text-gray-500 md:text-base text-sm max-sm:text-center"><span className="font-medium">&copy;</span> 2025 Heng Thay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
