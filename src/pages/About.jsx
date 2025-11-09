import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/Helpers/WhyChooseUs";
import Testimonial from "../components/Testimonial";
import testimonialsData from "../utils/testimonialsData";
import { useEffect, useState } from "react";
import TrustBadge from "../components/Helpers/TrustBadge";

const About = () => {

  // Track of index
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const trustBadgeDatas = [
    {id: 1, amount: 10, type: 'Customers'},
    {id: 2, amount: 30, type: 'Day Returns'},
    {id: 3, amount: 45, type: 'Countries'},
    {id: 4, amount: 95, type: 'Star Reviews'},
  ]

  return (
    <section className="w-full">
      {/* HERO */}
      <div className="bg-indigo-50 w-full">
        <div className="section-container max-sm:w-[350px] mx-auto md:px-6 py-8 lg:py-12 flex flex-col lg:flex-row items-center gap-8 md:my-10 my-14">
          <div className="lg:w-1/2 w-full flex flex-col justify-start sm:order-1 order-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800">
              We make everyday life feel exceptional — responsibly.
            </h1>
            <p className="mt-4 max-w-xl text-gray-600 text-base sm:text-lg">
              Handcrafted products, transparent sourcing, and simple shopping.
              Built to last — shipped to your door with secure payment and easy
              returns.
            </p>
            <div className="mt-6">
              <Link
                to={"/products"}
                className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 gap-x-1.5"
              >
                <MdOutlineShoppingCartCheckout
                  size={24}
                  className="group-hover:text-indigo-600 transition-colors duration-300 group-hover:scale-115"
                />
                Shop Now
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full sm:order-2 order-1">
            <img
              src="../../images/about-hero.png"
              alt=""
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        </div>
      </div>
      {/* Why Choose us */}
      <div className="section-container w-full mx-auto flex flex-col justify-center items-center gap-y-4 lg:my-20 md:my-10 my-8">
        <h2 className="text-gray-700 font-bold font-sans text-2xl sm:text-3xl md:text-4xl mb-4">
          Why choose us?
        </h2>
        <WhyChooseUs />
      </div>
      {/* Our Customer, Trust Badge */}
      <div className="section-container w-full mx-auto flex flex-col justify-center items-center gap-y-4 lg:my-20 md:my-10 my-8">
        <h2 className="text-gray-700 font-bold font-sans text-2xl sm:text-3xl md:text-4xl mb-4">
          Our Customer Overview
        </h2>
        <p className="max-w-xl text-gray-500 text-sm sm:text-base md:text-lg text-center">
          Trusted by thousands around the world, we’re proud to bring quality and
          convenience together. Here’s a quick look at our growing community.
        </p>
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
          {
            trustBadgeDatas.map((trust) => (
              <TrustBadge trust={trust} key={trust.id}/>
            ))
          }
        </ul>
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

export default About;
