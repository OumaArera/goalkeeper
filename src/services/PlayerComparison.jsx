import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { calculateAge, getTotalStats } from "../utils/statsUtil";

const PlayerComparison = ({ players }) => {
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  
  const comparisonData = useMemo(() => {
    return players.map(player => {
      const totalStats = getTotalStats(player);
      return {
        ...player,
        totalStats,
        cleanSheetRate: (totalStats.totalCleanSheets / totalStats.totalAppearances * 100) || 0,
        age: calculateAge(player.bioData.dateOfBirth)
      };
    }).sort((a, b) => b.cleanSheetRate - a.cleanSheetRate);
  }, [players]);

  return (
    <div className="bg-black/30 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-6">Player Comparison</h3>
      <div className="space-y-4">
        {comparisonData.map((player, index) => (
          <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setExpandedPlayer(expandedPlayer === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <img
                      src={player.bioData.image || "/api/placeholder/48/48"}
                      alt={`${player.bioData.firstName} ${player.bioData.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {player.bioData.firstName} {player.bioData.lastName}
                    </h4>
                    <p className="text-gray-400">{player.age} years • {player.totalStats.totalAppearances} appearances</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-emerald-400 font-bold text-xl">{Math.round(player.cleanSheetRate)}%</div>
                    <div className="text-gray-400 text-sm">Clean Sheet Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-xl">{player.totalStats.totalCleanSheets}</div>
                    <div className="text-gray-400 text-sm">Clean Sheets</div>
                  </div>
                  {expandedPlayer === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </div>
            </div>
            
            {expandedPlayer === index && (
              <div className="px-6 pb-6 border-t border-white/10 bg-white/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold text-lg">{player.goalKeeping.saves}</div>
                    <div className="text-gray-400 text-sm">Total Saves</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold text-lg">{player.goalKeeping.penaltiesSaved}</div>
                    <div className="text-gray-400 text-sm">Penalties Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold text-lg">{player.bioData.internationalCaps}</div>
                    <div className="text-gray-400 text-sm">Int'l Caps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 font-bold text-lg">{player.discipline.yellowCards + player.discipline.redCards}</div>
                    <div className="text-gray-400 text-sm">Total Cards</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="text-white font-semibold mb-3">Playing Style</h5>
                  <div className="flex flex-wrap gap-2">
                    {player.styleOfPlay.map((style, styleIndex) => (
                      <span key={styleIndex} className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white text-sm rounded-full border border-white/20">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerComparison;