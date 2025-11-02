import { useState, useEffect, useRef } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './Home.css';

const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon">
    {children}
  </a>
);

const ContactSection = () => {
  const teamMembers = [
    {
      name: "Prince Kumar",
      role: "Technical Lead",
      email: "221FA04451@gmail.com",
      image: "prince.jpg"
    },
    {
      name: "Pallavi",
      role: "Frontend Developer",
      email: "221FA04538@gmail.com",
      image: ".jpg"
    },
    {
      name: "Bhargavi",
      role: "Backend Developer",
      email: "221FA04498@gmail.com",
      image: ".jpg"
    },
    {
      name: "Harshini",
      role: "Backend Developer",
      email: "221FA04269@gmail.com",
      image: ".jpg"
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <h2>Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="team-photo-wrapper">
              <img src={member.image} alt={member.name} className="team-photo" />
            </div>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <a href={`mailto:${member.email}`} className="team-email">
              {member.email}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const contactRef = useRef(null);

  const images = [
    'h1.jpg',
    'h2.jpg',
    'h3.jpg',
    'h4.jpg',
    'h5.jpg',
    'h6.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Digital Complaint & Feedback Portal</h1>
          <p>Voice your concerns, share feedback, and stay informed</p>
        </div>
      </section>

      <div className="info-links-section">
        <div className="about-us" id="about">
          <h2>About Our Portal</h2>
          <p>
            This portal provides a seamless platform for students and staff to register their complaints and feedback.
            With a user-friendly interface and real-time tracking, we ensure your voice is heard and acted upon.
          </p>
        </div>

        <div className="quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            {/* <li><a href="/admin-login">Admin Login</a></li> */}
            <li><a href="/student/submit">Submit Complaint</a></li>
            <li><a href="/student/status">Track Complaint Status</a></li>
          </ul>
        </div>
      </div>

      <div className="slider-container">
        <AwesomeSlider
          selected={currentSlide}
          onTransitionStart={(e) => setCurrentSlide(e.nextIndex)}
          organicArrows={false}
          bullets={false}
        >
          {images.map((img, index) => (
            <div key={index} data-src={img}>
              <div className="slide-overlay"></div>
            </div>
          ))}
        </AwesomeSlider>

        <div className="slider-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div ref={contactRef}>
        <ContactSection />
      </div>
    </div>
    
  );
}

export default Home;
