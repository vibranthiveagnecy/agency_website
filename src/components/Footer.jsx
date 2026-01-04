import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-800 pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + About */}
        <div data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
              Vibranthive Agency
            </span>
          </h2>
          <p className="text-gray-600">
            A creative agency helping brands grow through design, code, and strategy.
          </p>
        </div>

        {/* Links */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h4 className="text-xl font-semibold mb-4 text-blue-700">Company</h4>
          <ul className="space-y-2 text-gray-600">
            {["About Us", "Services", "Portfolio", "Contact"].map((text, i) => (
              <li key={i}>
                <a
                  href={`#${text.toLowerCase().replace(" ", "")}`}
                  className="hover:text-blue-800 hover:underline transition"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h4 className="text-xl font-semibold mb-4 text-blue-700">Services</h4>
          <ul className="space-y-2 text-gray-600">
            {["Branding", "Web Development", "Marketing", "UI/UX"].map((service, i) => (
              <li key={i}>
                <a href="#" className="hover:text-blue-800 hover:underline transition">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h4 className="text-xl font-semibold mb-4 text-blue-700">Connect with us</h4>
          <div className="flex space-x-4">
            {[
              { icon: <Instagram />, link: "https://instagram.com", label: "Instagram" },
              { icon: <Linkedin />, link: "https://linkedin.com", label: "LinkedIn" },
            ].map(({ icon, link, label }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="p-2 rounded-full border border-blue-200 bg-white hover:bg-blue-100 transition transform hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="mt-12 text-center text-sm text-gray-500"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        © {new Date().getFullYear()} <span className="text-blue-700 font-medium">Vibranthive Agency</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
