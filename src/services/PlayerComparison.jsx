import React, { useState, useMemo } from "react";
import { Trophy } from "lucide-react";


const PlayerComparison = ({ players }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  
  const handlePlayerSelect = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else if (selectedPlayers.length < 3) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const comparisonData = selectedPlayers.map(playerId => {
    const player = players.find(p => p.id === playerId);
    return {
      id: player.id,
      name: `${player.user?.firstName} ${player.user?.lastName}`,
      saves: player.goalkeepingStats?.saves || 0,
      cleanSheets: player.defensiveStats?.cleanSheets || 0,
      penaltiesSaved: player.goalkeepingStats?.penaltiesSaved || 0,
      goalsConceded: player.defensiveStats?.goalsConceded || 0,
      errors: player.defensiveStats?.errorsLeadingToGoal || 0,
      totalAppearances: player.kplRecords.reduce((sum, record) => sum + record.appearances, 0)
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-3 text-cyan-400" />
          Player Comparison
        </h2>
        
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Select players to compare (max 3):</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {players.map(player => (
              <button
                key={player.id}
                onClick={() => handlePlayerSelect(player.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedPlayers.includes(player.id)
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-transparent text-white'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
                disabled={!selectedPlayers.includes(player.id) && selectedPlayers.length >= 3}
              >
                <div className="font-medium">{`${player.user?.firstName} ${player.user?.lastName}`}</div>
                <div className="text-sm opacity-75">
                  {player.kplRecords.reduce((sum, record) => sum + record.appearances, 0)} appearances
                </div>
              </button>
            ))}
          </div>
        </div>

        {comparisonData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3">Metric</th>
                  {comparisonData.map(player => (
                    <th key={player.id} className="text-center p-3">{player.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-400">Total Saves</td>
                  {comparisonData.map(player => (
                    <td key={player.id} className="p-3 text-center font-semibold">{player.saves}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-400">Clean Sheets</td>
                  {comparisonData.map(player => (
                    <td key={player.id} className="p-3 text-center font-semibold">{player.cleanSheets}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-400">Penalties Saved</td>
                  {comparisonData.map(player => (
                    <td key={player.id} className="p-3 text-center font-semibold">{player.penaltiesSaved}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-400">Goals Conceded</td>
                  {comparisonData.map(player => (
                    <td key={player.id} className="p-3 text-center font-semibold">{player.goalsConceded}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-400">Errors Leading to Goal</td>
                  {comparisonData.map(player => (
                    <td key={player.id} className="p-3 text-center font-semibold">{player.errors}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-gray-400">Total Appearances</td>
                  {comparisonData.map(player => (
                    <td key={player.id} className="p-3 text-center font-semibold">{player.totalAppearances}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerComparison;