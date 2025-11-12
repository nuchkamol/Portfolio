import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/home") {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/home?scrollTo=${sectionId}`);
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyPortfolio</div>

      {/* ปุ่ม hamburger */}
      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
      >
        ☰
      </div>

      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li>
          <a href="#about" onClick={(e) => handleMenuClick(e, "about")}>About</a>
        </li>
        <li>
          <a href="#skills" onClick={(e) => handleMenuClick(e, "skills")}>Skills</a>
        </li>
        <li>
          <Link to="/work" onClick={() => setMenuOpen(false)}>Portfolio</Link>
        </li>
        <li>
          <Link to="/unity" onClick={() => setMenuOpen(false)}>myGame</Link>
        </li>
        <li>
          <a href="#contact" onClick={(e) => handleMenuClick(e, "contact")}>Contact</a>
        </li>
        <li>
         <a href="#My3D" onClick={(e) => handleMenuClick(e, "creator")}>My3D</a>
        </li>
             <li>
          <Link to="/cv" onClick={() => setMenuOpen(false)}>CV</Link>
        </li>
      </ul>
    </nav>
  );
}
