import { FaClinicMedical, FaUserMd, FaCalendarAlt } from "react-icons/fa";
import "../assets/scss/main.scss";

const Services = () => {
  const services = [
    {
      icon: <FaClinicMedical />,
      title: "Comprehensive Care",
      description:
        "Access to a wide range of medical services from primary care to specialized treatments.",
    },
    {
      icon: <FaUserMd />,
      title: "Expert Doctors",
      description:
        "Consult with board-certified physicians and specialists in various fields.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Scheduling",
      description:
        "Book appointments online at your convenience with our easy-to-use platform.",
    },
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We provide comprehensive healthcare services to meet all your medical
          needs.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
