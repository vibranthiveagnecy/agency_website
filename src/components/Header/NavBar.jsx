import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "animate.css";

const links = ["Home", "About", "Services", "Portfolio", "Contact"];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Scroll listener for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    links.forEach((link) => {
      const section = document.getElementById(link.toLowerCase());
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md backdrop-blur-md" : ""
      }`}
      style={{
        background: scrolled
          ? "linear-gradient(to right, #e0f2ff 0%, #ffffff 100%)"
          : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-500 to-cyan-400 text-transparent bg-clip-text drop-shadow-md animate__animated animate__fadeInLeft">
          Vibranthive Agency
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-10 font-medium tracking-wide">
          {links.map((link) => {
            const id = link.toLowerCase();
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`transition duration-300 ${
                    activeLink === id
                      ? "text-blue-700 font-semibold"
                      : "text-gray-800 hover:text-blue-600"
                  }`}
                >
                  {link}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Icon */}
        <div className="md:hidden text-gray-900">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/90 text-gray-900 z-40 py-6 flex flex-col items-center space-y-5 animate__animated animate__fadeInDown backdrop-blur-lg">
          {links.map((link) => {
            const id = link.toLowerCase();
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-medium transition ${
                  activeLink === id ? "text-blue-700 font-semibold" : "hover:text-blue-600"
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
