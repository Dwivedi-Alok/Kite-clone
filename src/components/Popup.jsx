import React from "react";

const Popup = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Popup content */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[400px] max-w-full text-gray-800 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
