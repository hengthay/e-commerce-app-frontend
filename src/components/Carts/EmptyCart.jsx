import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 lg:py-8 text-center">
      {/* Image */}
      <img
        src="/images/empty.gif" // ✅ update to your real path
        alt="Empty cart illustration"
        className="w-[260px] sm:w-[320px] h-auto object-contain animate-[float_3s_ease-in-out_infinite]"
      />

      {/* Title */}
      <h2 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
        Your cart is empty
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-md">
        Looks like you haven’t added anything yet. Start exploring our products and fill your cart.
      </p>

      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default EmptyCart;
