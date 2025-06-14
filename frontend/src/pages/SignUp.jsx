import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.jsx";
import { handleImageUpload } from "../services/cloudinaryUrl.js";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e) => {
    setUploading(true);
    const profileUrl = await handleImageUpload(e);
    if (profileUrl) setFormData((prev) => ({ ...prev, profileUrl }));
    setUploading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (formData.name && formData.email && formData.password) {
        await registerUser(formData);
        navigate("/signin");
      } else {
        alert("Enter all the details");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] text-[#d4d4d4] px-4">
      <div className="bg-[#2a2a2a] rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          InstantChat
        </h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="w-full border-2 outline-none px-4 py-2 rounded-lg bg-[#3b3b3b] text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full border-2 outline-none px-4 py-2 rounded-lg bg-[#3b3b3b] text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full border-2 outline-none px-4 py-2 rounded-lg bg-[#3b3b3b] text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {uploading && (
              <p className="text-sm text-yellow-400 mt-2">Uploading...</p>
            )}
            {formData.profileUrl && (
              <img
                src={formData.profileUrl}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full mt-3 border-2 border-gray-500 object-cover mx-auto"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full flex justify-center items-center gap-2 bg-green-500 text-white py-2 rounded-lg text-lg font-semibold transition-opacity duration-300 ${
              uploading ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
            }`}
          >
            {uploading && (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Sign Up
          </button>

          <div className="text-center text-sm mt-2">
            Already Registered?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/signin");
              }}
              className="text-blue-400 underline hover:text-blue-300"
            >
              Click here
            </button>{" "}
            to Sign In
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
