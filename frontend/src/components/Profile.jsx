import { ArrowLeft, Camera, Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import { useCloudinaryUpload } from "../utils";
import { motion } from "framer-motion";

const Profile = ({ user }) => {
  //   console.log(user);
  const { uploadToCloudinary } = useCloudinaryUpload();

  // Initialize formData with user details if available
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nin: "",
    dateOfBirth: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);

  // Populate form data with user details when component mounts or `user` changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        nin: user.nin || "",
        dateOfBirth: user.dateOfBirth || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const uploadedImageUrl = await uploadToCloudinary(file);
        setFormData((prev) => ({ ...prev, profileImage: uploadedImageUrl }));
      } catch (error) {
        alert("Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your API endpoint for updating the user profile
      console.log("Form data to submit:", formData);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-8"
    >
      <Link
        className="text-base text-[#000000A3] flex items-center gap-2 mb-4"
        to="/space"
      >
        <ArrowLeft className="size-4" />
        <span>Go back</span>
      </Link>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="mb-6 text-gray-600">
        Check your profile, update personal details, and how we can reach you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative overflow-hidden">
            <img
              src={formData.profileImage || "/assets/profile.jpeg"}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <label
              htmlFor="profileImageUpload"
              className="absolute bottom-0 right-0 bg-black bg-opacity-80 p-1 rounded-full cursor-pointer"
            >
              <input
                type="file"
                id="profileImageUpload"
                className="hidden"
                onChange={handleImageUpload}
              />
              <span className="text-white text-sm">
                <Camera className="size-4" />
              </span>
            </label>
          </div>
          <button
            type="button"
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            Edit photo
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            <Input
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="focus:outline-none"
          />
          <div className="relative">
            <Input
              label="NIN Number"
              name="nin"
              value={formData.nin}
                onChange={null}
            />
            {!user?.isNinVerified ? (
              <span className="absolute -top-[2px] left-[90px] bg-[#23a31a0a] border-[1px] border-[#28a31a33] px-2 py-1 text-xs font-bold rounded-xl text-[#1aa31f]">
                NIN verified
              </span>
            ) : (
              <span className="absolute -top-[2px] left-[90px] bg-[#A3761A0A] border-[1px] border-[#A3761A33] px-2 py-1 text-xs font-bold rounded-xl text-[#A3761A]">
                Verification pending
              </span>
            )}
          </div>
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            type="submit"
            disabled={loading}
            className={`w-fit px-4 py-2 rounded-lg text-white transition-all ${
              !loading
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? (
               <Loader className=" animate-spin mx-auto" size={24} />
            ) : (
              "Update profile"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Profile;
