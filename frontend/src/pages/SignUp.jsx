import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.jsx";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("Signuppage : " + formData.email);
      if (formData.name && formData.email && formData.password) {
        await registerUser(formData);
        navigate("/signin");
      } else alert("Enter all the details");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center justify-center content-center  text-2xl  h-screen w-screen  bg-[#1f1f1f] text-[#d4d4d4] gap-5 ">
        <h1 className=" text-4xl font-bold text-green-400 ">InstantChat</h1>
        <form onSubmit={handleSignup}>
          <div className="flex  flex-col gap-2 ">
            <div className=" flex flex-col gap-2  ">
              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className=" hover:cursor-text border-2 outline-none px-2 py-1.5  text-xl rounded-2xl"
              />
            </div>

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
                onClick={handleSignup}
                className=" hover:cursor-pointer"
              >
                SignUp
              </button>
            </div>
            <div>
              Already Registered Click
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signin");
                }}
                className=" text-blue-500 p-2 hover:cursor-pointer"
              >
                 here
              </button>
              to Signin
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
