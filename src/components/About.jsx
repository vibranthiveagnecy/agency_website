import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { motion as Motion } from "framer-motion";
import { Briefcase, Users, Award, Clock } from "lucide-react";

const stats = [
  { label: "Projects Completed", end: 100, icon: <Briefcase className="w-6 h-6 text-blue-600" /> },
  { label: "Happy Clients", end: 20, icon: <Users className="w-6 h-6 text-blue-600" /> },
  { label: "Awards Won", end: 1, icon: <Award className="w-6 h-6 text-blue-600" /> },
  { label: "Years Experience", end: 10, icon: <Clock className="w-6 h-6 text-blue-600" /> },
];

const clientLogos = [
  "/logos/Logo1.png",
  "/logos/Logo2.png",
  "/logos/Logo3.jpeg",
  "/logos/Logo4.png",
  "/logos/Logo5.png",
  "/logos/Logo6.png",
  "/logos/Logo7.png",
  "/logos/Snakit.jpeg",
  "/logos/ThinkLab.jpeg",
];

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    return () => AOS.refresh();
  }, []);

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scrollInterval = setInterval(() => {
      scrollAmount += scrollStep;
      if (scrollAmount >= maxScroll) scrollAmount = 0;
      scrollContainer.scrollLeft = scrollAmount;
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-white via-blue-50 to-white py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background blobs (blue) */}
      <div className="absolute top-[-60px] left-[-80px] w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Header & Stats */}
        <Motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Elevating Brands Through <span className="text-blue-500">Visual Excellence</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              At <strong>Vibranthive Agency</strong>, we tell your brand’s story through bold design, sharp strategy, and immersive experiences. We help startups and global brands stand out and stay memorable.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map(({ label, end, icon }, i) => (
                <Motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/70 backdrop-blur-xl border border-blue-100 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform"
                >
                  <div className="mb-2 flex justify-center">{icon}</div>
                  <p className="text-3xl font-extrabold text-blue-500">
                    <CountUp end={end} duration={2.5} />+
                  </p>
                  <p className="mt-1 text-sm text-gray-800 font-medium">{label}</p>
                </Motion.div>
              ))}
            </div>
          </div>

          <div>
            <img
              src="/About.svg"
              alt="Creative Team Illustration"
              className="w-full max-w-md md:max-w-lg mx-auto"
            />
          </div>
        </Motion.div>

        {/* Mission / Vision / Values */}
        <Motion.div
          className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              title: "Our Mission",
              text: "To empower brands by crafting bold, authentic designs that resonate and create lasting impressions.",
            },
            {
              title: "Our Vision",
              text: "To be the leading creative agency recognized for innovation, impact, and elevating brand storytelling worldwide.",
            },
            {
              title: "Our Values",
              text: "Creativity, integrity, collaboration, and a relentless passion for delivering exceptional design solutions.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-blue-300 transition-shadow cursor-default"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-4">{card.title}</h3>
              <p className="text-gray-700 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </Motion.div>

        {/* Client Logos */}
        <Motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Trusted by Leading Brands
          </h3>
          <div
            ref={scrollRef}
            className="flex space-x-12 overflow-x-auto no-scrollbar px-6 md:px-12"
            style={{ scrollBehavior: "smooth" }}
          >
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 w-32 h-20 flex items-center justify-center">
                <img
                  src={logo}
                  alt={`Client logo ${i + 1}`}
                  className="max-h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default About;
