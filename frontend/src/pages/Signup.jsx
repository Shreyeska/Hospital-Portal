import React, { useState } from "react";
import Eye from "../assets/icons/Eye.svg";
import EyeSlash from "../assets/icons/EyeSlash.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/TM full.png";
import api from "../network/api";
import "../assets/scss/main.scss";
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
      <div className="container">
        <div className=" login-container">
          <div className="login-box">
            <h2>Sign up</h2>

            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>
              <div className="input-group password-container">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="password-eye"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? EyeSlash : Eye}
                    alt="Toggle password visibility"
                  />
                </div>
              </div>
              {error && <div className="error-message"></div>}

              <button type="submit" className="login-button">
                Sign up
              </button>
              <p>
                Already have an account? <a href="/login">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
