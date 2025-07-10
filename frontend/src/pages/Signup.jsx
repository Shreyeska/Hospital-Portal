import React, { useState } from "react";
import Eye from "../assets/icons/Eye.svg";
import EyeSlash from "../assets/icons/EyeSlash.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/TM full.png";
import api from "../network/api";
import Header from "../components/Header";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Mock validation - replace with real API call later
    if (
      !email ||
      !password ||
      !address ||
      !phoneNumber ||
      !gender ||
      !fullName
    ) {
      toast.error("Please fill the entire form");
      return;
    }
    try {
      const response = await api.post("/auth/signup", {
        email: email.trim(),
        password: password.trim(),
        address: address.trim(),
        phoneNumber: phoneNumber.trim(),
        gender: gender.trim(),
        fullName: fullName.trim(),
      });

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      if (errorMessage === "User already exists") {
        toast.error("Email already exists");
      } else {
        toast.error("Email already exists");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="min-h-screen flex justify-center items-center py-5 px-5 bg-[#f5f7fa] mt-5">
          <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-3xl mb-5 text-[#1c4532]">Sign up</h2>

            <form onSubmit={handleRegister}>
              <div className="mb-5 text-left">
                <label
                  htmlFor="email"
                  className="block mb-1 font-semibold text-[#1c4532]"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 border-2 border-[#1c4532] rounded-xl text-base box-border appearance-none focus:border-[#133224] placeholder-[#888]"
                />
              </div>
              <div className="mb-5 text-left">
                <label
                  htmlFor="name"
                  className="block mb-1 font-semibold text-[#1c4532]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full p-4 border-2 border-[#1c4532] rounded-xl text-base box-border appearance-none focus:border-[#133224] placeholder-[#888]"
                />
              </div>
              <div className="mb-5 text-left">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-[#1c4532]"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full p-4 border-2 border-[#1c4532] rounded-xl text-base box-border appearance-none focus:border-[#133224] placeholder-[#888]"
                />
              </div>
              <div className="mb-5 text-left">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-1 font-semibold text-[#1c4532]"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full p-4 border-2 border-[#1c4532] rounded-xl text-base box-border appearance-none focus:border-[#133224] placeholder-[#888]"
                />
              </div>
              <div className="mb-5 text-left">
                <label
                  htmlFor="gender"
                  className="block mb-1 font-semibold text-[#1c4532]"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="w-full p-4 border-2 border-[#1c4532] rounded-xl text-base box-border appearance-none focus:border-[#133224] placeholder-[#888]"
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>
              <div className="mb-5 text-left relative">
                <label
                  htmlFor="password"
                  className="block mb-1 font-semibold text-[#1c4532]"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-4 pr-10 border-2 border-[#1c4532] rounded-xl text-base box-border appearance-none focus:border-[#133224] placeholder-[#888]"
                />
                <div
                  className="absolute top-[70%] right-2.5 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? EyeSlash : Eye}
                    alt="Toggle password visibility"
                  />
                </div>
              </div>
              {error && <div className="error-message"></div>}

              <button
                type="submit"
                class="bg-[rgb(28,69,50)] text-white py-3 px-4 border-none rounded-full w-full text-base font-semibold cursor-pointer mt-2.5 hover:bg-[rgb(19,50,36)]"
              >
                Sign up
              </button>
              <p className="text-base text-[#666]">
                Already have an account?{" "}
                <a href="/login" className="text-[#1c4532] font-semibold">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
