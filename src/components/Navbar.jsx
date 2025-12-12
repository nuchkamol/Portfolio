import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/home") {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/home?scrollTo=${sectionId}`);
    }

    // เพิ่ม fade-out animation ตอนปิด
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 300);
  };

  // ปิดเมนูเมื่อกดนอกบริเวณเมนู
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        if (menuOpen) {
          setClosing(true);
          setTimeout(() => {
            setMenuOpen(false);
            setClosing(false);
          }, 300);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // toggle ปุ่ม hamburger
  const toggleMenu = () => {
    if (menuOpen) {
      setClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setClosing(false);
      }, 300);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyPortfolio</div>

      {/* ปุ่ม hamburger */}
      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
      >
        ☰
      </div>

      {/* เมนู */}
      <ul
        ref={menuRef}
        className={`menu ${menuOpen ? "open" : ""} ${closing ? "closing" : ""}`}
      >
        <li>
          <a href="#about" onClick={(e) => handleMenuClick(e, "about")}>
            About
          </a>
        </li>
        <li>
          <a href="#skills" onClick={(e) => handleMenuClick(e, "skills")}>
            Skills
          </a>
        </li>
        <li>
          <Link to="/work" onClick={() => toggleMenu()}>Portfolio</Link>
        </li>
        <li>
          <Link to="/unity" onClick={() => toggleMenu()}>myGame</Link>
        </li>
        <li>
          <a href="#contact" onClick={(e) => handleMenuClick(e, "contact")}>
            Contact
          </a>
        </li>
        <li>
          <a href="#My3D" onClick={(e) => handleMenuClick(e, "creator")}>
            My3D
          </a>
        </li>
        <li>
          <Link to="/cv" onClick={() => toggleMenu()}>CV</Link>
        </li>
      </ul>
    </nav>
  );
}
