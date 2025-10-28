import { useEffect, useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";
import { MdOutlineLocalOffer } from "react-icons/md";
import { LiaMedalSolid } from "react-icons/lia";
import RecommendProduct from "../components/RecommendProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  recommendedProducts,
  selectProductStatus,
  selectRecommendedProducts,
} from "../features/products/productSlice";
import Testimonial from "../components/Testimonial";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import testimonialsData from "../utils/testimonialsData";
const qualityMenus = [
  {
    id: 1,
    title: "Free delivery",
    iconName: TbTruckDelivery,
    description: "Free Delivery for all customer who buying from us",
  },
  {
    id: 2,
    title: "Quality guarantee",
    iconName: LiaMedalSolid,
    description: "Free Delivery for all customer who buying from us",
  },
  {
    id: 3,
    title: "Special offers",
    iconName: MdOutlineLocalOffer,
    description: "Free Delivery for all customer who buying from us",
  },
  {
    id: 4,
    title: "Secure payment",
    iconName: GrSecure,
    description: "Free Delivery for all customer who buying from us",
  },
];

const Home = () => {
  const products = useSelector(selectRecommendedProducts);
  const dispatch = useDispatch();
  const status = useSelector(selectProductStatus);
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

  // console.log('Product', products)
  return (
    <section className="w-full overflow-hidden">
      {/* Banner */}
      <div className="mt-18 relative flex justify-center items-center lg:w-full">
        <img
          src="../../images/banner.png"
          alt="Banner-FreeP!k"
          className="md:w-full sm:w-[400px] md:h-[80vh] h-[40vh] object-cover "
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 md:right-20 text-white group max-sm:ml-3">
          <h1 className="sm:max-w-sm max-sm:w-1/2 sm:text-2xl text-xl md:text-4xl font-bold mb-4">
            Grab Upto 50% Off On Selected Items.
          </h1>
          <p className="sm:max-w-sm max-sm:w-1/2 text-[12px] md:text-base font-bold mb-4 text-gray-300">
            Shopping is a bit of relaxing hobby for me, which is sometimes
            troubling for the bank balance.
          </p>
          <Link
            to={"/products"}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition flex gap-x-1 cursor-pointer w-[150px] shadow-sm"
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
      <div className="section-container max-sm:w-[400px] flex flex-col justify-center items-center gap-y-4 lg:my-20 md:my-10 my-8">
        <h2 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 font-sans text-gray-600">
          Why choose us?
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center items-center gap-8 max-sm:w-[350px] mt-2 mr-2!">
          {/* Free Deliivery */}
          {qualityMenus.map((item) => {
            // Store Icons
            const Icons = item.iconName;

            return (
              <div
                className="flex flex-col justify-center shadow-md rounded-lg lg:px-4 lg:py-4 px-2 py-2 border border-gray-300"
                key={item.id}
              >
                <div className="flex gap-x-2">
                  <div className="mt-2">
                    <Icons size={28} className="text-indigo-600" />
                  </div>
                  <div className="block">
                    <h3 className="lg:text-2xl md:text-xl text-base font-medium text-nowrap">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base mb-4 mt-1.5 max-w-[250px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Product Overview */}
      <div className="section-container max-sm:w-[400px] px-4 py-4 flex flex-col justify-center md:items-start item-center gap-y-4 lg:my-20 md:my-10 my-8">
        <h3 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 font-sans text-gray-600">
          Recommended Products
        </h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between gap-8 relative mr-2.5!">
          {products.map((product) => (
            <RecommendProduct product={product} key={product.id} />
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="w-full bg-gray-100/40 py-2">
        <div className="section-container max-sm:w-[400px] px-4 py-4 flex flex-col justify-center items-center gap-x-3 lg:my-20 md:my-10 my-8">
        <h3 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 font-sans text-gray-600">
          Testimonials
        </h3>
        {/* Carousel Wrapper */}
        <div className="w-full max-w-6xl relative overflow-hidden mr-2.5">
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
