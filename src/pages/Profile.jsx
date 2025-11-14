import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserProfile,
  selectUserProfile,
  selectUserProfileError,
  selectUserProfileStatus,
} from "../features/profile/profileSlice";
import ErrorMessage from "../components/ErrorHandle/ErrorMessage";
import { selectUserToken } from "../features/auth/authSlice";
import { MdOutlineNavigateBefore } from "react-icons/md";

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);

  // profile selectors
  const profileData = useSelector(selectUserProfile) || {};
  const profileStatus = useSelector(selectUserProfileStatus);
  const profileError = useSelector(selectUserProfileError);

  useEffect(() => {
    if (!token) return;
    // always fetch when token changes (handles switching users)
    dispatch(getUserProfile());
  }, [dispatch, token]);

  // convenience display vars (safe)
  const name = profileData?.name || "";
  const role = profileData?.role || "";
  const email = profileData?.email || "";
  const phone = profileData?.phone_number
    ? profileData?.phone_number.startsWith("+")
      ? profileData?.phone_number
      : `+855 ${profileData?.phone_number}`
    : "";
  const street = profileData?.street || "";
  const city = profileData?.city || "";
  const country = profileData?.country || "";

  const hasAddress = Boolean(
    street || city || country || profileData.phone_number
  );

  return (
    <section className="section-container max-w-5xl max-sm:w-[350px] mx-auto md:px-6 py-8 lg:py-12 flex flex-col gap-8 md:my-10 my-14">
      <div className="w-full mt-10 shadow bg-white lg:p-8 p-4 rounded-md">
        <div className="w-full flex flex-col justify-center items-center gap-y-6">
          <div className="my-4 w-full space-y-4">
            <div className="flex justify-start items-center gap-x-2.5 mb-4">
              <Link to={"/"}>
                <MdOutlineNavigateBefore
                  size={28}
                  className="hover:text-indigo-500 ease-initial duration-300"
                />
              </Link>
              <h3 className="md:text-2xl text-xl lg:text-3xl font-extrabold leading-tight text-gray-800">
                My Profile
              </h3>
            </div>
            {profileStatus === "succeeded" && (
              <>
                {/* Account Overview */}
                <div className="w-full flex flex-col md:flex-row justify-between shadow py-6 px-6 md:px-8 rounded-lg gap-6">
                  {/* Image + Info */}
                  <div className="flex md:flex-row flex-col sm:items-center items-start gap-x-6 w-full md:w-auto space-y-2">
                    {/* <img
                      src={
                        profileData.avatar ||
                        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
                      }
                      alt="Avatar-User"
                      className="md:w-28 md:h-28 w-16 h-16 rounded-full shadow object-cover"
                    /> */}
                    <div className="md:w-28 md:h-28 w-16 h-16 rounded-full shadow object-cover flex justify-center bg-gray-200 items-center">
                      <span className="md:text-4xl lg:text-5xl text-2xl">{name[0]?.toUpperCase() || ""}</span>
                    </div>
                    <div className="flex flex-col justify-center space-y-1.5">
                      <h4 className="md:text-2xl text-xl font-semibold text-gray-900 text-start">
                        {name}
                      </h4>
                      <p className="text-gray-700 text-base">Role: {role}</p>
                      <p className="text-gray-500 text-base">
                        City - {city || "N/A"}, Country - {country || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="flex justify-start items-center md:items-start sm:mt-2">
                    <Link
                      to="/profile/edit"
                      className="flex items-center gap-x-1.5 text-base text-gray-600 border border-gray-300 px-3 py-1.5 rounded-4xl hover:shadow-sm hover:bg-gray-50 transition-all"
                    >
                      Edit{" "}
                      <CiEdit
                        size={22}
                        className="font-semibold text-gray-700"
                      />
                    </Link>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="w-full flex flex-col shadow py-6 px-6 md:px-8 rounded-lg space-y-6">
                  <div className="w-full flex justify-between items-center">
                    <h3 className="md:text-2xl text-xl font-semibold text-gray-800">
                      Personal Information
                    </h3>
                    <Link
                      to="/profile/edit"
                      className="flex items-center gap-x-1.5 text-base text-gray-600 border border-gray-300 px-3 py-1.5 rounded-4xl hover:shadow-sm hover:bg-gray-50 transition-all"
                    >
                      Edit{" "}
                      <CiEdit
                        size={22}
                        className="font-semibold text-gray-700"
                      />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-base font-medium text-gray-800">
                        {name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-base font-medium text-gray-800">
                        {email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-base font-medium text-gray-800">
                        {phone || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-base font-medium text-gray-800">
                        {role || "User"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="w-full flex flex-col shadow py-6 px-6 md:px-8 rounded-lg space-y-6">
                  <div className="w-full flex justify-between items-center">
                    <h3 className="md:text-2xl text-xl font-semibold text-gray-800">
                      Addresses
                    </h3>
                    <Link
                      to="/profile/edit"
                      className="flex items-center gap-x-1.5 text-base text-gray-600 border border-gray-300 px-3 py-1.5 rounded-4xl hover:shadow-sm hover:bg-gray-50 transition-all"
                    >
                      Edit{" "}
                      <CiEdit
                        size={22}
                        className="font-semibold text-gray-700"
                      />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Default Address</p>
                      <p className="text-base font-medium text-gray-800">
                        {street
                          ? `Street ${street}, ${city}`
                          : "No default address yet"}
                      </p>
                      <p className="text-sm text-gray-500">{country || ""}</p>
                      {!hasAddress && (
                        <Link
                          to="/profile/edit"
                          className="text-sm text-teal-600 hover:underline mt-2 inline-block"
                        >
                          + Add address
                        </Link>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Billing Address</p>
                      <p className="text-base font-medium text-gray-800">
                        {street
                          ? `Street ${street}, ${city}`
                          : "No billing address yet"}
                      </p>
                      <p className="text-sm text-gray-500">{country || ""}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Status / Error UI */}
            {profileStatus === "loading" && (
              <div className="flex justify-center items-center h-64">
                <h4 className="text-gray-700 font-medium md:text-lg text-base flex items-center gap-x-2">
                  Loading
                  <span className="w-6 h-6 rounded-full border-b-transparent border-t-transparent border-2 border-gray-400 animate-spin" />
                </h4>
              </div>
            )}

            {profileStatus === "failed" && (
              <ErrorMessage
                message={profileError || "Failed to load user profile"}
              />
            )}

            {profileError && profileStatus !== "failed" && (
              <p className="text-red-500 text-lg font-medium">{profileError}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
