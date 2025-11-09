import React from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="section-container max-sm:w-[350px] mx-auto md:px-6 py-8 lg:py-12 flex flex-col justify-center items-center gap-8 md:my-10 my-14">
        <div className="w-full space-y-4 flex flex-col justify-center sm:items-start items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 mt-6">
            Contact
          </h2>
          <p className="max-w-xl text-gray-600 text-base sm:text-lg sm:text-left text-center">
            We’re here to help with orders, returns, or product questions. Reach
            out and our team will get back to you as soon as possible.
          </p>
          <Link
            to={"/products"}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-transparent hover:text-black border border-transparent hover:border-black transition flex gap-x-1 cursor-pointer w-[150px] group text-nowrap hover:shadow-md shadow-indigo-400"
          >
            <MdOutlineShoppingCartCheckout
              size={24}
              className="group-hover:text-indigo-600 transition-colors duration-300 group-hover:scale-115"
            />
            Shop Now
          </Link>
        </div>
      </div>
      <div className="section-container max-sm:w-[350px] mx-auto md:px-6 py-8 lg:py-12 flex flex-col md:flex-row justify-between items-center gap-8 md:my-10 my-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start justify-center">
          {/* Left Side */}
          <div className="w-full max-w-lg space-y-4">
            <h3 className="text-4xl md:text-6xl font-semibold text-gray-800">
              Get in - <br />touch with us
            </h3>

            <p className="text-gray-600 leading-relaxed">
              We're here to help! Whether you have a question about our
              services, need assistance with your account, or want to provide
              feedback, our team is ready to assist you.
            </p>

            <div className="space-y-1 mt-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Email
              </p>
              <a
                href="mailto:e-commerce@sup.com"
                className="text-lg text-gray-800 font-semibold hover:underline"
              >
                e-commerce@sup.com
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Phone
              </p>
              <a
                href="tel:1231231231"
                className="text-lg text-gray-800 font-semibold  hover:underline"
              >
                +1800 20030020
              </a>
            </div>

            <p className="text-gray-500 text-sm mt-3">
              Available Monday - Friday,
              9 AM - 6 PM GMT
            </p>
            {/* Live Chat pill */}
            <Link
              to={'/contact'}
              className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 bg-neutral-900 text-white shadow-lg transition hover:opacity-90 group"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-lime-400" />
              Live Chat
              <span className="ml-2 grid place-items-center h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/30 transform group-hover:translate-x-2 transition-all ease-linear duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>
          {/* Right Side */}
          <div className="w-full">
            <form
              className="relative rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-xl ring-1 ring-neutral-200 lg:w-[600px]"
              
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name…"
                    className="w-full rounded-xl border border-neutral-200 bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name…"
                    className="w-full rounded-xl border border-neutral-200 bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address…"
                  className="w-full rounded-xl border border-neutral-200 bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-900"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  How can we help you?
                </label>
                <textarea
                  rows={5}
                  placeholder="Enter your message…"
                  className="w-full rounded-xl border border-neutral-200 bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                  required
                />
              </div>

              {/* Send Message pill */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full px-6 py-3 bg-neutral-900 text-white font-medium shadow-lg transition hover:opacity-90 cursor-pointer group"
                >
                  Send Message
                  <span className="ml-1 grid place-items-center h-9 w-9 rounded-full bg-white text-neutral-900 transform group-hover:translate-x-2 transition-all ease-linear duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
