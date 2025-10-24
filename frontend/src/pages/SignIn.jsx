import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.jsx";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../states/atoms.jsx";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const setToken = useSetRecoilState(tokenState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (formData.email && formData.password) {
        const res = await loginUser(formData);
        const token = res.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        navigate("/app");
      } else {
        setErrorMessage("Please enter both email and password.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Sign in failed. Please try again.");
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const guestData = {
      email: "guest@gmail.com",
      password: "guest",
    };

    try {
      const res = await loginUser(guestData);
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/app");
    } catch (error) {
      // Replaced alert
      setErrorMessage(error.response?.data?.message || "Guest login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] text-[#d4d4d4] px-4">
      <div className="bg-[#2a2a2a] rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          InstantChat
        </h1>
        {errorMessage && (
          <div className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded-lg mb-4 text-center text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full border-2 border-[#3b3b3b] focus:border-green-500 outline-none px-4 py-2 rounded-lg bg-[#3b3b3b] text-white transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full border-2 border-[#3b3b3b] focus:border-green-500 outline-none px-4 py-2 rounded-lg bg-[#3b3b3b] text-white transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg font-semibold transition-colors duration-200"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg text-lg font-semibold transition-colors duration-200"
          >
            Guest Login
          </button>

          <div className="text-center text-sm mt-2">
            Don't have an account?{" "}
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


