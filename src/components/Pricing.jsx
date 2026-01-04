import React from "react";
import { motion as Motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const pricingPlans = [
  {
    title: "Basic",
    price: "₹4,999",
    features: [
      "8 Static Posts",
      "2 Carousel Posts (Up to 5 slides each)",
      "2 Reels/Short Videos (up to 30 seconds)",
      "Hashtags and Captions Included",
      "PNG/JPG Delivery",
      "2 Revisions",
    ],
  },
  {
    title: "Standard",
    price: "₹9,999",
    features: [
      "12 Static Posts",
      "4 Carousel Posts (Up to 4 slides each)",
      "4 Reels/Short Videos",
      "Hashtags and Captions ",
      "Source Files Included (PSD/AI)",
      "4 Revisions",
    ],
    highlighted: true,
  },
  {
    title: "Premium",
    price: "₹14,999",
    features: [
      "20 Static Posts",
      "6 Carousel Posts",
      "6 Reels/Short Videos",
      "Complete Social Media Calendar (1 Month)",
      "Brand Style Guide Support",
      "Priority Support (Whatsapp/Email)",
      "Unlimited Revisions",
    ],
  },
];

const PricingCard = ({ plan }) => (
  <Motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`group relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
      plan.highlighted ? "ring-2 ring-blue-400" : ""
    }`}
  >
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
    <p className="text-4xl font-extrabold text-blue-600 mb-4">{plan.price}</p>
    <ul className="text-gray-700 space-y-2 mb-6 text-left">
      {plan.features.map((feature, i) => (
        <li key={i}>✅ {feature}</li>
      ))}
    </ul>
    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-blue-500 transition">
      Choose Plan
    </button>
  </Motion.div>
);

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-4 text-center bg-gradient-to-br from-white via-blue-100 to-blue-200"
    >
      <div className="max-w-6xl mx-auto">
        <Motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Affordable Design Packages
        </Motion.h2>
        <Motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 max-w-xl mx-auto mb-12"
        >
          Choose a plan that fits your design needs. No hidden charges, just quality work.
        </Motion.p>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <PricingCard plan={plan} key={i} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="px-2"
          >
            {pricingPlans.map((plan, i) => (
              <SwiperSlide key={i}>
                <PricingCard plan={plan} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
