import React, { useState } from "react";
import { BarChart3, TrendingUp, Users, Trophy } from "lucide-react";
import { players } from "../data/data";
import OverviewStats from "../services/OverviewStats";
import PerformanceAnalysis from "../services/PerformanceAnalysis";
import ClubDistribution from "../services/ClubDistribution";
import PlayerComparison from "../services/PlayerComparison";


// Main Statistics Component
const Statistics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'distribution', label: 'Distribution', icon: Users },
    { id: 'comparison', label: 'Comparison', icon: Trophy }
  ];

  return (
    <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Goalkeeper{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-black/30 backdrop-blur-lg p-2 rounded-2xl border border-white/10 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && <OverviewStats players={players} />}
        {activeTab === 'performance' && <PerformanceAnalysis players={players} />}
        {activeTab === 'distribution' && <ClubDistribution players={players} />}
        {activeTab === 'comparison' && <PlayerComparison players={players} />}
      </div>
    </div>
  );
};

export default Statistics;