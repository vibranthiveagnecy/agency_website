import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBtn = () => {

  const phoneNumber = "9920602156"; 
  

  const message = "Hello, I visited your website and want to discuss a project.";

  // WhatsApp Link Formula
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-50 flex items-center justify-center animate-bounce-slow"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppBtn;