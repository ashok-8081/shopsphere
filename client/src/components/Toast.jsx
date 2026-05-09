import React, { useEffect } from "react";

const Toast = ({message, onclose}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onclose();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 z-50">
      <span>🎉 {message}</span>
      <button
        onClick={onclose}
        className="text-gray-400 hover:text-white font-bold"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
