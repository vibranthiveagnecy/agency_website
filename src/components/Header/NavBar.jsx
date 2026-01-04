import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", id: "header" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Portfolio", id: "portfolio" },
  { name: "Testimonials", id: "testimonials" },
  { name: "Pricing", id: "pricing" },
  { name: "Contact", id: "contact" }
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("header");

  // Scroll listener with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      { threshold: 0.5, rootMargin: "-15% 0px -35% 0px" }
    );

    links.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = useCallback((e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <>
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
          <a 
            href="#header" 
            onClick={(e) => handleLinkClick(e, "header")}
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-500 to-cyan-400 text-transparent bg-clip-text drop-shadow-md hover:opacity-80 transition-opacity cursor-pointer"
          >
            Vibranthive Agency
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 font-medium tracking-wide">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`relative transition duration-300 ${
                    activeLink === link.id
                      ? "text-blue-700 font-semibold"
                      : "text-gray-800 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  {activeLink === link.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-700 rounded-full"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Icon */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            className="md:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[72px] left-0 right-0 bg-white/95 text-gray-900 z-40 backdrop-blur-lg shadow-lg transform transition-all duration-300 ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="py-6 flex flex-col items-center space-y-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`text-lg font-medium transition w-full text-center py-2 ${
                activeLink === link.id 
                  ? "text-blue-700 font-semibold bg-blue-50" 
                  : "hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;