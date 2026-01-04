import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Working with Vibranthive was a game-changer. Their designs gave our brand a completely new personality!",
    name: "Priya Desai",
    title: "Founder, Desai Studios",
    avatar: "/clients/priya.jpg",
  },
  {
    quote:
      "They truly understood our brand vision and transformed it into an engaging visual identity. Highly recommend!",
    name: "Rohit Batra",
    title: "CEO, UrbanEdge",
    avatar: "/clients/rohit.jpg",
  },
  {
    quote:
      "The team was professional, creative, and met our tight deadlines without compromising quality.",
    name: "Anjali Verma",
    title: "Marketing Head, NovaTech",
    avatar: "/clients/anjali.jpg",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 py-24 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-blue-800" data-aos="fade-up">
          What Our Clients Say
        </h2>

        <AnimatePresence mode="wait">
          <Motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white border border-blue-200 backdrop-blur-xl rounded-2xl p-10 shadow-lg"
          >
            <Quote className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
            <p className="text-lg md:text-xl italic text-gray-700 mb-6">
              “{testimonials[current].quote}”
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
              />
              <div className="text-left">
                <p className="text-blue-900 font-semibold">{testimonials[current].name}</p>
                <p className="text-gray-500 text-sm">{testimonials[current].title}</p>
              </div>
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-blue-500 scale-110" : "bg-blue-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
