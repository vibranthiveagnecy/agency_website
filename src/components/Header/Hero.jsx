import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion as Motion } from "framer-motion";

const FloatingShape = ({ className, style, children }) => (
  <div className={`absolute z-10 ${className}`} style={style}>
    {children}
  </div>
);

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-10" />

      {/* Floating Shapes */}
      <FloatingShape className="top-20 left-10 animate-float-slow">
        <svg width="20" height="20" fill="#FFC107">
          <circle cx="10" cy="10" r="5" />
        </svg>
      </FloatingShape>
      <FloatingShape className="top-[30%] right-10 animate-float-medium">
        <svg width="24" height="24" fill="#00FFFF">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </FloatingShape>
      <FloatingShape className="bottom-10 left-[20%] animate-float-fast">
        <svg width="18" height="18" fill="#FF69B4">
          <rect width="10" height="10" />
        </svg>
      </FloatingShape>

      {/* Hero Content */}
      <Motion.div
        className="relative z-20 flex flex-col justify-center items-center text-center h-full px-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]"
          data-aos="fade-up"
        >
          Bold Designs. Powerful Identities.
        </h1>

        <p
          className="mt-6 text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          We’re Vibranthive — a creative design agency helping brands stand out
          through bold visuals, strategic thinking, and immersive storytelling.
        </p>

        <Motion.a
          href="#contact"
          className="mt-10 inline-block px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-400 text-black shadow-md hover:shadow-yellow-400/40 hover:brightness-110 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          Let’s Collaborate
        </Motion.a>
      </Motion.div>
    </section>
  );
};

export default Hero;
