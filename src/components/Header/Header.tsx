import { Link, useLocation } from "react-router-dom";
import type { NavLink } from "../../types";
import { navLinks } from "../../constants";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <div className="header__branding">
          <span className="header__name">Sagar Sawant</span>
        </div>
      </Link>

      <nav className="header__nav" aria-label="Main navigation">
        {navLinks.map((link: NavLink) => (
          <Link
            key={link.label}
            to={link.href}
            className={`header__link ${location.pathname === link.href
              ? "header__link--active"
              : ""
              }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;