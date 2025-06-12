import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      if (formData.email && formData.password) {
        const res = await loginUser(formData);
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/app");
      } else {
        alert("Enter all the details");
      }
    } catch (error) {
      alert(error.response?.data?.message || "SignIn failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] text-[#d4d4d4] px-4">
      <div className="bg-[#2a2a2a] rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          InstantChat
        </h1>
        <form onSubmit={handleSignIn} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg font-semibold"
          >
            Sign In
          </button>

          <div className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              className="text-blue-400 underline hover:text-blue-300"
            >
              Click here
            </button>{" "}
            to Register
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
