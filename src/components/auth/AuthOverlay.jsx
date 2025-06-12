import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthOverlay = ({ isVisible, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative transform transition-all animate-in fade-in-0 zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} onClose={onClose} />
        ) : (
          <SignupForm onToggleForm={toggleForm} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default AuthOverlay;