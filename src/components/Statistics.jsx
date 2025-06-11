import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Trophy, Loader2 } from "lucide-react";
import { getData } from "../services/apiServices";
import OverviewStats from "../services/OverviewStats";
import PerformanceAnalysis from "../services/PerformanceAnalysis";
import ClubDistribution from "../services/ClubDistribution";
import PlayerComparison from "../services/PlayerComparison";



// Main Statistics Component
const Statistics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const page = 1;
  const limit = 20;
  const isTokenRequired = false;
  const uRL = `goalkeepers?page=${page}&limit=${limit}`;


  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getData(uRL, isTokenRequired);
        setPlayers(data.data || []);
      } catch (err) {
        setError("Failed to load players. Please try again.");
        console.error("Error fetching players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [page, limit]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'distribution', label: 'Distribution', icon: Users },
    { id: 'comparison', label: 'Comparison', icon: Trophy }
  ];

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
      <div className="text-white text-lg font-medium">Loading goalkeepers...</div>
      <div className="text-gray-400 text-sm">Please wait while we fetch the latest data</div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-red-400 text-xl font-semibold">⚠️ Something went wrong</div>
      <div className="text-gray-300 text-center max-w-md">
        {error}
      </div>
      <button
        onClick={() => window.location.reload()}
        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-6 rounded-lg font-medium transition-all hover:scale-105"
      >
        Refresh Page
      </button>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

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