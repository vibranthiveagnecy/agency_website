import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
// Ensure this path is correct relative to your src folder
import logoImg from "./../../assets/logo.png"; 

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

  // Optimized Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Using 50px as a threshold for better visual transition
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.6, // Section must be 60% visible to trigger
      rootMargin: "-80px 0px 0px 0px" // Offset for the fixed header
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, observerOptions);

    links.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll & Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const handleLinkClick = useCallback((e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 shadow-lg backdrop-blur-lg" : "py-5"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(to right, rgba(224, 242, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)"
            : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
  <a 
    href="#header" 
    onClick={(e) => handleLinkClick(e, "header")} 
    className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer"
    aria-label="Back to top"
  >
    <img 
      src={logoImg} 
      alt="Vibranthive Logo" 
      className="h-10 w-auto object-contain" 
    />
    <span className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-500 to-cyan-400 text-transparent bg-clip-text">
      Vibranthive
    </span>
  </a>
</div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 font-medium">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`relative py-2 transition-colors duration-300 ${
                    activeLink === link.id ? "text-blue-700" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-700 transition-all duration-300 ${
                    activeLink === link.id ? "w-full" : "w-0"
                  }`} />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Icon */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2 text-gray-900"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 w-[70%] h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 pt-24 space-y-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`text-xl font-semibold border-b border-gray-100 pb-2 ${
                activeLink === link.id ? "text-blue-700" : "text-gray-800"
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