import React from "react";

const Testimonial = ({ testimonial }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center space-y-4 p-4 sm:p-6">
      {/* Feedback */}
      <p className="max-w-md sm:max-w-3xl text-gray-500 text-base sm:text-lg leading-relaxed">
        {testimonial.feedback}
      </p>

      {/* Rating */}
      <img
        src={`../../images/ratings/rating-${testimonial.rating * 10}.png`}
        alt="Rating"
        className="sm:w-[200px] w-[150px] mx-auto"
      />

      {/* Avatar + Info */}
      <div className="flex flex-col items-center space-y-1 mt-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="size-20 rounded-full object-cover"
        />
        <p className="text-lg sm:text-xl font-semibold text-amber-900">
          {testimonial.name}
        </p>
        <p className="text-sm sm:text-base text-gray-700">
          {testimonial.location}
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
