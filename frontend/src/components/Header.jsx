// src/components/Header/Header.jsx
import { FaUser, FaSignInAlt } from "react-icons/fa";
import "../assets/scss/main.scss";

import logo from "../assets/images/TM full.png";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <a href="/" className="logo">
          Health<span>Connect</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          <a href="/login" className="btn btn-outline">
            <FaSignInAlt /> Login
          </a>
          <a href="/signup" className="btn btn-primary">
            <FaUser /> Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
