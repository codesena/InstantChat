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
        console.log("SignInpage : " + formData.email);
        const res = await loginUser(formData);
        const token = res.data.token;
        localStorage.setItem("token", token);
        // console.log("Token saved:", token);
        navigate("/app");
      } else alert("Enter all the details");
    } catch (error) {
      alert(error.response?.data?.message || "SignIn failed");
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center justify-center content-center  text-2xl  h-screen w-screen  bg-[#1f1f1f] text-[#d4d4d4] gap-5 ">
        <h1 className=" text-4xl font-bold text-green-400 ">InstantChat</h1>
        <form onSubmit={handleSignIn}>
          <div className="flex  flex-col gap-2 ">
            <div className=" flex flex-col gap-2  ">
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className=" hover:cursor-text border-2 outline-none px-2 py-1.5  text-xl rounded-2xl"
              />
            </div>
            <div className=" flex flex-col gap-2   ">
              <label>Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className=" hover:cursor-text border-2 outline-none px-2 py-1.5  text-xl rounded-2xl"
              />
            </div>
            <div className=" flex flex-col gap-2 ">
              <button
                type="submit"
                onClick={handleSignIn}
                className=" hover:cursor-pointer"
              >
                SignIn
              </button>
            </div>
            <div>
              {" "}
              Click
              <button
                onClick={(e) => {
                  e.preventDefault(), navigate("/signup");
                }}
                className="text-blue-500 hover:cursor-pointer p-2"
              >
                here
              </button>
              to Register
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
