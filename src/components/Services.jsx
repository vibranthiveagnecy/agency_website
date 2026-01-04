import { motion as Motion } from "framer-motion";
import {
  PenTool,
  MonitorSmartphone,
  Image,
  Palette,
  LayoutDashboard,
  Camera,
  Video,
  Layers,
} from "lucide-react";

const services = [
  {
    icon: <PenTool className="w-8 h-8 text-blue-600 animate-bounce-slow" />,
    title: "Brand Identity",
    desc: "Crafting memorable logos, color palettes, and typography that define your brand.",
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-blue-600 animate-pulse" />,
    title: "Web Design",
    desc: "Building responsive, user-centric websites that reflect your brand’s personality.",
  },
  {
    icon: <Image className="w-8 h-8 text-blue-600 animate-spin-slow" />,
    title: "Social Media Graphics",
    desc: "Designing scroll-stopping visuals for Instagram, Facebook, and more.",
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-600 animate-bounce-slow" />,
    title: "Packaging Design",
    desc: "Creating eye-catching packaging that speaks directly to your customers.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-blue-600 animate-pulse" />,
    title: "UI/UX Design",
    desc: "Designing intuitive digital experiences that convert and delight.",
  },
  {
    icon: <Camera className="w-8 h-8 text-blue-600 animate-wiggle" />,
    title: "Product Photography",
    desc: "Capturing high-quality photos that showcase your products beautifully.",
  },
  {
    icon: <Video className="w-8 h-8 text-blue-600 animate-bounce-slow" />,
    title: "Video Editing",
    desc: "Crafting dynamic promotional and explainer videos to boost engagement.",
  },
  {
    icon: <Layers className="w-8 h-8 text-blue-600 animate-fade-in" />,
    title: "Print Design",
    desc: "Designing brochures, flyers, posters, and business cards that impress.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="bg-gradient-to-b from-white via-blue-50 to-white py-24 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto text-center">
        <Motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our <span className="text-blue-500">Creative Services</span>
        </Motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-16">
          We offer a full suite of design solutions that help brands stand out, connect, and grow.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Motion.div
              key={index}
              className="bg-white rounded-xl shadow-md border border-blue-100 p-6 hover:shadow-blue-200 transition-shadow text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-blue-600 mb-2">{service.title}</h3>
              <p className="text-gray-700 text-sm">{service.desc}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
