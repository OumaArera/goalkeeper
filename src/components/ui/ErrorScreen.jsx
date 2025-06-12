import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorScreen = ({ error, onRetry }) => (
  <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Error Loading Items</h2>
      <p className="text-gray-400 mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);
export default ErrorScreen;
