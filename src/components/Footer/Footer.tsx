import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left">

        <a href="#contact" className="footer__contact">
          Contact Me
        </a>

        <div className="footer__socials">
          <a href="https://www.linkedin.com/in/sawant-sagar/" aria-label="LinkedIn" target="new">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Sagarsawant224" aria-label="GitHub" target="new">
            <FaGithub />
          </a>
        </div>

      </div>

      <span className="footer__copyright">
        © {new Date().getFullYear()} Sagar Sawant
      </span>
    </footer>
  );
};

export default Footer;