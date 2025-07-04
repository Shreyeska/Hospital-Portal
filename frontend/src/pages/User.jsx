// src/pages/User/User.jsx
import { FaUser } from "react-icons/fa";
import "../assets/scss/main.scss";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const User = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="user-page admin-dashboard-container">
      <nav className="admin-nav">
        <h3>HealthConnect</h3>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
      <div className="user-container">
        <div className="user-header">
          <FaUser className="user-icon" />
          <h1>Welcome to Your Dashboard</h1>
          <p className="user-subtitle">This is your personalized user space</p>
        </div>

        <div className="user-content">
          <div className="user-card">
            <h2>User Information</h2>
            <p>Manage your profile, appointments, and health records here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
