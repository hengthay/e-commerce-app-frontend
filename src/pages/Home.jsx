import { useEffect, useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";
import RecommendProduct from "../components/Products/RecommendProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  recommendedProducts,
  selectRecommendedProductError,
  selectRecommendedProducts,
  selectRecommendedProductStatus,
} from "../features/products/productSlice";
import Testimonial from "../components/Testimonial";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import testimonialsData from "../utils/testimonialsData";
import WhyChooseUs from "../components/Helpers/WhyChooseUs";

const Home = () => {
  const products = useSelector(selectRecommendedProducts);
  const dispatch = useDispatch();
  const status = useSelector(selectRecommendedProductStatus);
  const errorMessage = useSelector(selectRecommendedProductError);
  // Track of index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(recommendedProducts());
    }
  }, [dispatch, status]);

  // Handle slide render for testimonial live
  const handleOnNext = () => {
    const nextIndex = (currentIndex + 1) % testimonialsData.length;

    setCurrentIndex(nextIndex);
  };
  // console.log(currentIndex);
  const handleOnBack = () => {
    // Store last index
    const lastIndex = testimonialsData.length - 1;
    // Check if currentIndex is 0 assgin to lastIndex, otherwise currentIndex -1
    const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;

    setCurrentIndex(prevIndex);
  };
  // console.log(currentIndex);

  // Handle on automatically side render
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 5000);

    // Clean up function
    return () => clearInterval(intervalId);
  }, [testimonialsData.length]);

  // console.log('Product', products);

  return (
    <section className="w-full overflow-hidden">
      {/* Banner */}
      <div className="mt-18 relative flex justify-center items-center lg:w-full">
        <img
          src="../../images/banner.png"
          alt="Banner-FreeP!k"
          className="md:w-full sm:w-[400px] md:h-[80vh] h-[40vh] object-cover "
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 md:right-20 text-white max-sm:ml-3">
          <h1 className="sm:max-w-sm max-sm:w-1/2 sm:text-2xl text-xl md:text-4xl font-bold mb-4">
            Grab Upto 50% Off On Selected Items.
          </h1>
          <p className="sm:max-w-sm max-sm:w-1/2 text-[12px] md:text-base font-bold mb-4 text-gray-300">
            Shopping is a bit of relaxing hobby for me, which is sometimes
            troubling for the bank balance.
          </p>
          <Link
            to={"/products"}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition flex gap-x-1 cursor-pointer w-[150px] shadow-sm group"
          >
            <MdOutlineShoppingCartCheckout
              size={24}
              className="group-hover:text-indigo-600 transition-colors duration-300 group-hover:scale-115"
            />
            Shop Now
          </Link>
        </div>
      </div>
      {/* Quality of us */}
      <div className="section-container w-full mx-auto flex flex-col justify-center items-center gap-y-4 lg:my-20 md:my-10 my-8">
        <h2 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 font-sans text-gray-600">
          Why choose us?
        </h2>
        <WhyChooseUs />
      </div>

      {/* Product Overview */}
      <div className="section-container mx-auto w-full px-4 py-4 flex flex-col justify-center md:items-start item-center gap-y-4 lg:my-20 md:my-10 my-8">
        <h3 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 font-sans text-gray-600">
          Recommended Products
        </h3>
        {/* If loading success */}
        {status === "succeeded" && (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full justify-between gap-8 relative mr-2.5!">
            {products.map((product) => (
              <RecommendProduct product={product} key={product.id} />
            ))}
          </div>
        )}

        {/* Handle Status */}
        {status === "loading" && (
          <div className="flex justify-center items-center h-64">
            <h4 className="text-gray-700 font-medium md:text-lg text-base flex items-center gap-x-2">
              Loading<p className="w-6 h-6 rounded-full border-b-transparent border-t-transparent border-2 border-gray-400 animate-spin"></p>
            </h4>
          </div>
        )}
        {status === "failed" && (
          <div className="section-container flex items-center  gap-2 p-4 rounded-md bg-red-50 border border-red-300 text-red-700 my-2 w-full mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="md:text-lg text-sm font-medium">
              Sorry, failed to display products
            </p>
          </div>
        )}
      </div>

      {/* Testimonials */}
      <div className="w-full bg-gray-100/40 py-2">
        <div className="section-container w-full mx-auto max-sm:w-[400px] px-4 py-4 flex flex-col justify-center items-center gap-x-3 lg:my-20 md:my-10 my-8">
          <h3 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 font-sans text-gray-600">
            Testimonials
          </h3>
          {/* Carousel Wrapper */}
          <div className="w-full max-w-6xl relative overflow-hidden mr-3 max-sm:mr-6">
            {/* Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonialsData.map((testimonial) => (
                <div
                  className="w-full shrink-0 flex justify-center items-center"
                  key={testimonial.id}
                >
                  <Testimonial testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="sm:flex hidden justify-center items-center absolute top-1/2 left-0 right-0">
              <button
                onClick={handleOnBack}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out"
              >
                <MdOutlineNavigateBefore size={28} />
              </button>
              <button
                onClick={handleOnNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out"
              >
                <MdOutlineNavigateNext size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
