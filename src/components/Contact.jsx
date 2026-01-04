import { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { motion as Motion} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm("service_xxx", "template_xxx", formRef.current, "user_xxx")
      .then(() => {
        setSubmitted(true);
        formRef.current.reset();
        setTimeout(() => setSubmitted(false), 4000);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 4000);
        setLoading(false);
      });
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Info Section */}
        <div className="space-y-8" data-aos="fade-right">
          <h2 className="text-4xl font-bold text-black-800">Let’s Connect</h2>
          <p className="text-blue-700">We’d love to hear about your next project.</p>
          <div>
            <h4 className="font-semibold text-blue-900">Email</h4>
            <p className="text-black-700">hello@youragency.com</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Phone</h4>
            <p className="text-black-700">+91 9920602156</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Location</h4>
            <p className="text-back-700">Borivali, Mumbai</p>
          </div>
        </div>

        {/* Contact Form */}
        <Motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl space-y-6 border border-blue-100"
        >
          {submitted && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
              ✅ Your message has been sent!
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md">
              ❌ Something went wrong. Try again.
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-blue-900">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="mt-1 w-full rounded-md border border-blue-200 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900">Email</label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-blue-200 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Write your message..."
              className="mt-1 w-full rounded-md border border-blue-200 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 px-4 rounded-md hover:bg-blue-800 transition transform hover:scale-105"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </Motion.form>
      </div>
    </section>
  );
};

export default Contact;
