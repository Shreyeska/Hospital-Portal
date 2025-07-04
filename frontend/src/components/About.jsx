// src/components/About/About.jsx
import "../assets/scss/main.scss";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Medical team"
            />
          </div>
          <div className="about-text">
            <h2 className="section-title">About Us</h2>
            <p>
              HealthConnect is a revolutionary platform that bridges the gap
              between patients and healthcare providers. Our mission is to make
              healthcare accessible, affordable, and convenient for everyone.
            </p>
            <p>
              Founded in 2023, we've been at the forefront of digital healthcare
              solutions, serving thousands of patients and hundreds of medical
              professionals across the country.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Patients Served</p>
              </div>
              <div className="stat-item">
                <h3>500+</h3>
                <p>Healthcare Providers</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
