// src/components/Hero/Hero.jsx
import "../assets/scss/main.scss";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Health, Our <span>Priority</span>
            </h1>
            <p className="hero-description">
              Connecting patients with healthcare professionals for seamless
              medical experiences. Book appointments, get prescriptions, and
              manage your health records all in one place.
            </p>
            <div className="hero-actions">
              <a href="/signup" className="btn btn-primary">
                Get Started
              </a>
              <a href="#services" className="btn btn-outline">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Doctor and patient"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
