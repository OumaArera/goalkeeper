import React from "react";
import { TrendingUp } from "lucide-react";




// Performance Analysis Component
const PerformanceAnalysis = ({ players }) => {
  const topPerformers = players
    .map(player => ({
      name: `${player.user?.firstName} ${player.user?.lastName}`,
      saves: player.goalkeepingStats?.saves || 0,
      cleanSheets: player.defensiveStats?.cleanSheets || 0,
      penaltiesSaved: player.goalkeepingStats?.penaltiesSaved || 0,
      errorsLeadingToGoal: player.defensiveStats?.errorsLeadingToGoal || 0,
      totalAppearances: player.kplRecords.reduce((sum, record) => sum + record.appearances, 0)
    }))
    .sort((a, b) => b.saves - a.saves)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-cyan-400" />
          Top Performers by Saves
        </h2>
        <div className="space-y-4">
          {topPerformers.map((player, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{player.name}</h3>
                  <p className="text-gray-400 text-sm">{player.totalAppearances} appearances</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-lg">{player.saves}</div>
                <div className="text-gray-400 text-sm">saves</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Penalty Specialists</h3>
          <div className="space-y-3">
            {players
              .filter(player => (player.goalkeepingStats?.penaltiesSaved || 0) > 0)
              .sort((a, b) => (b.goalkeepingStats?.penaltiesSaved || 0) - (a.goalkeepingStats?.penaltiesSaved || 0))
              .slice(0, 3)
              .map((player, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white">{`${player.user?.firstName} ${player.user?.lastName}`}</span>
                  <span className="text-green-400 font-bold">{player.goalkeepingStats?.penaltiesSaved}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Clean Sheet Leaders</h3>
          <div className="space-y-3">
            {players
              .sort((a, b) => (b.defensiveStats?.cleanSheets || 0) - (a.defensiveStats?.cleanSheets || 0))
              .slice(0, 3)
              .map((player, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white">{`${player.user?.firstName} ${player.user?.lastName}`}</span>
                  <span className="text-blue-400 font-bold">{player.defensiveStats?.cleanSheets}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;