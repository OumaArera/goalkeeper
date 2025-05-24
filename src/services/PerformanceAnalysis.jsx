import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { getTotalStats } from "../utils/statsUtil";

const PerformanceAnalysis = ({ players }) => {
  const [selectedMetric, setSelectedMetric] = useState('cleanSheetRate');
  
  const performanceData = useMemo(() => {
    return players.map(player => {
      const totalStats = getTotalStats(player);
      const cleanSheetRate = (totalStats.totalCleanSheets / totalStats.totalAppearances * 100) || 0;
      const savesPerGame = player.goalKeeping.saves / totalStats.totalAppearances || 0;
      const penaltySaveRate = (player.goalKeeping.penaltiesSaved / (player.goalKeeping.penaltiesSaved + 10) * 100) || 0;
      
      return {
        name: `${player.bioData.firstName} ${player.bioData.lastName}`,
        cleanSheetRate: Math.round(cleanSheetRate * 10) / 10,
        savesPerGame: Math.round(savesPerGame * 10) / 10,
        penaltySaveRate: Math.round(penaltySaveRate * 10) / 10,
        totalAppearances: totalStats.totalAppearances,
        experience: player.experience.reduce((sum, exp) => sum + exp.appearances, 0)
      };
    });
  }, [players]);

  const metrics = {
    cleanSheetRate: { label: 'Clean Sheet Rate (%)', color: 'bg-emerald-500' },
    savesPerGame: { label: 'Saves Per Game', color: 'bg-cyan-500' },
    penaltySaveRate: { label: 'Penalty Save Rate (%)', color: 'bg-purple-500' },
    totalAppearances: { label: 'Total Appearances', color: 'bg-yellow-500' }
  };

  return (
    <div className="bg-black/30 backdrop-blur-lg p-8 rounded-2xl border border-white/10 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white mb-4 md:mb-0">Performance Analysis</h3>
        <div className="relative">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none pr-8"
          >
            {Object.entries(metrics).map(([key, metric]) => (
              <option key={key} value={key} className="bg-slate-800">{metric.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-4">
        {performanceData.map((player, index) => {
          const maxValue = Math.max(...performanceData.map(p => p[selectedMetric]));
          const percentage = (player[selectedMetric] / maxValue) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-32 text-white font-medium truncate">{player.name}</div>
              <div className="flex-1 bg-white/10 rounded-full h-3 relative overflow-hidden">
                <div 
                  className={`h-full ${metrics[selectedMetric].color} transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="w-16 text-white font-bold text-right">{player[selectedMetric]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceAnalysis;