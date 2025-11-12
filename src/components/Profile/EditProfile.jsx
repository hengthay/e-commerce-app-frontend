import React, { useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";

const EditProfile = () => {
  const [formData, setFormDat] = useState({
    firstName: "Junaid",
    lastName: "Ahmad",
    email: "Ahmadjunaid791@gmail.com",
    phone: "+92 3023434506",
    address: "5 Maple Avenue, Richmond, London, TW10 6JR, UK",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="section-container max-w-4xl max-sm:w-[350px] mx-auto md:px-8 py-10 lg:py-14 flex flex-col items-center gap-8 md:my-10 my-14">
      <div className="bg-white w-full rounded-3xl shadow-md p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Edit Profile
          </h2>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col justify-center items-center mx-auto sm:w-28 sm:h-28 w-20 h-20 rounded-full shadow-sm mb-6">
          {/* Profile Image */}
          <img
            src='https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png'
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Address<span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            ></textarea>
          </div>
        </form>

        {/* Save Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="w-full md:w-1/3 bg-gray-800 text-white font-semibold py-3 rounded-xl hover:bg-black transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
