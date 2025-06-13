import React from "react";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => (
  <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Loading Items</h2>
      <p className="text-gray-400">Fetching...</p>
    </div>
  </div>
);
export default LoadingScreen;
