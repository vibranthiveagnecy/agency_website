import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Sample Assets
import branding from "../assets/Logo.jpeg";
import webDesign from "../assets/WebDesign_1.png";
import packaging from "../assets/Packaging_1.jpg";
import branding1 from "../assets/Branding.jpg";
import Banner from "../assets/Banner_1.jpg";
// import Social from "../assets/Poster_2.jpg";

const projects = [
  { id: 1, title: "Logo Design", image: branding, category: "Branding" },
  { id: 2, title: "Web Development", image: webDesign, category: "Web" },
  { id: 3, title: "Product Packaging", image: packaging, category: "Packaging" },
  { id: 4, title: "Brand Guidelines", image: branding1, category: "Branding" },
  { id: 5, title: "Banner", image: Banner, category: "Web" },
  // { title: "Poster", image: Social, category: "Social" },
];

const categories = ["All", "Branding", "Web", "Packaging"];

const OurWork = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filtered, setFiltered] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(projects);
    } else {
      setFiltered(projects.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 md:px-20">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-800 mb-2">Our Work</h2>
        <p className="text-gray-600">Explore designs by category</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-medium transition duration-300 ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white border text-blue-600"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Work Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((project) => (
            <Motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500">{project.category}</p>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedProject && (
          <Motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <Motion.div
              className="bg-white rounded-2xl p-6 w-[90%] md:w-[600px] max-h-[90vh] overflow-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-gray-600">
                This is a preview of the {selectedProject.category.toLowerCase()} project.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurWork;