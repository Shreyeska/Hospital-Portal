import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";
import Header from "../components/Header";

const Landing = () => (
  <div className="page">
    <Header />
    <Hero />
    <Services />
    <About />
    <Contact />
  </div>
);

export default Landing;
