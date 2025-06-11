import React from "react";
import { BarChart3, Users, Shield, Target } from "lucide-react";


// Overview Stats Component
const OverviewStats = ({ players }) => {
  const totalPlayers = players.length;
  const totalSaves = players.reduce((sum, player) => sum + (player.goalkeepingStats?.saves || 0), 0);
  const totalCleanSheets = players.reduce((sum, player) => sum + (player.defensiveStats?.cleanSheets || 0), 0);
  const totalApperances = players.reduce((sum, player) => 
    sum + player.kplRecords.reduce((clubSum, record) => clubSum + record.appearances, 0), 0);

  const avgSaveRate = totalPlayers > 0 ? (totalSaves / totalPlayers).toFixed(1) : 0;
  const avgCleanSheetRate = totalApperances > 0 ? ((totalCleanSheets / totalApperances) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{totalPlayers}</h3>
        <p className="text-gray-400 text-sm">Total Goalkeepers</p>
      </div>

      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{totalSaves}</h3>
        <p className="text-gray-400 text-sm">Total Saves</p>
      </div>

      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{totalCleanSheets}</h3>
        <p className="text-gray-400 text-sm">Total Clean Sheets</p>
      </div>

      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{avgCleanSheetRate}%</h3>
        <p className="text-gray-400 text-sm">Avg Clean Sheet Rate</p>
      </div>
    </div>
  );
};

export default OverviewStats;