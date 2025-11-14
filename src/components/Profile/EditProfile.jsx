import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  selectUserProfile,
  selectUserProfileError,
  selectUserProfileStatus,
  updateUserProfileAddress,
} from "../../features/profile/profileSlice";
import Swal from "sweetalert2";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorHandle/ErrorMessage";

const EditProfile = () => {
  const profileData = useSelector(selectUserProfile) || {};
  const profileStatus = useSelector(selectUserProfileStatus);
  const profileError = useSelector(selectUserProfileError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // local form state: mirror the fields you want editable
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    street: "",
    city: "",
    country: "",
    postal_code: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token]);
  // initialize local state when profileData arrives / changes
  useEffect(() => {
    if (!profileData) return;

    const user = profileData.user || profileData;
    const address = profileData.address || profileData;

    setFormData({
      name: user?.name || "",
      phone_number: address?.phone_number || "",
      street: address?.street || "",
      city: address?.city || "",
      country: address?.country || "",
      postal_code: address?.postal_code || "",
    });
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // console.log('User profile data: ', profileData);
  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        street: formData.street.trim(),
        city: formData.city.trim(),
        country: formData.country.trim(),
        postal_code: formData.postal_code.trim(),
        phone_number: formData.phone_number.trim(),
      };
      // dispatch thunk (unwrap to throw on error)
      await dispatch(updateUserProfileAddress(payload)).unwrap();
      // Alert success message
      Swal.fire({
        icon: "success",
        title: "Update Success",
        text: "Your Profile is updated.",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Your profile is updated..");
      // Redirect your to profile page after 1.5 s
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Failed to Update",
        text: "Your Profile is failed to update.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setSaving(false);
    }
  };
  // console.log('FormData--', formData);
  return (
    <section className="section-container max-w-4xl max-sm:w-[350px] mx-auto md:px-8 py-10 lg:py-14 flex flex-col items-center gap-8 md:my-10 my-14">
      <div className="bg-white w-full rounded-3xl shadow-md p-4 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-start mb-8 gap-x-2.5">
          <Link to={"/profile"}>
            <MdOutlineNavigateBefore
              size={28}
              className="hover:text-indigo-500 ease-initial duration-300"
            />
          </Link>
          <h2 className="text-xl lg:text-3xl md:text-2xl font-bold text-gray-900">
            Edit Profile
          </h2>
        </div>

        {profileStatus === "succeeded" && (
          <>
            {/* Profile Image */}
            {/* <div className="flex flex-col justify-center items-center mx-auto sm:w-28 sm:h-28 w-20 h-20 rounded-full shadow-sm mb-6"> */}
              {/* Profile Image */}
              {/* <img
                src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
                alt="Profile"
                className="w-full h-full object-cover"
              /> */}
            {/* </div> */}
            <div className="md:w-28 md:h-28 w-16 h-16 rounded-full shadow object-cover flex justify-center bg-gray-200 items-center mx-auto mb-6">
              <span className="md:text-4xl lg:text-5xl text-2xl">{formData?.name[0]?.toUpperCase() || ""}</span>
            </div>
            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  className="text-gray-600 text-sm font-medium mb-1"
                  id="name"
                >
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="text-gray-600 text-sm font-medium mb-1"
                  id="phone_number"
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-gray-600 text-sm font-medium mb-1"
                  id="street"
                >
                  Street<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-gray-600 text-sm font-medium mb-1"
                  id="city"
                >
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-gray-600 text-sm font-medium mb-1"
                  id="country"
                >
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-gray-600 text-sm font-medium mb-1"
                  id="postal_code"
                >
                  Postal/Zip<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </form>
            {/* Save Button */}
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full md:w-1/3 bg-gray-800 text-white font-semibold py-3 rounded-xl hover:bg-black transition-all"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        )}

        {profileStatus === "loading" && (
          <div className="flex justify-center items-center h-64">
            <h4 className="text-gray-700 font-medium md:text-lg text-base flex items-center gap-x-2">
              Loading
              <p className="w-6 h-6 rounded-full border-b-transparent border-t-transparent border-2 border-gray-400 animate-spin"></p>
            </h4>
          </div>
        )}
        {profileStatus === "failed" && (
          <ErrorMessage message={"Failed to load profile" || profileError} />
        )}
        {/* Handle Error */}
        {profileError && profileStatus !== "failed" && (
          <p className="text-red-500 text-lg font-medium">{profileError}</p>
        )}
      </div>
    </section>
  );
};

export default EditProfile;
