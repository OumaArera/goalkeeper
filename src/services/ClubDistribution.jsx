import React from "react";
import { Users} from "lucide-react";




// Club Distribution Component
const ClubDistribution = ({ players }) => {
  const clubStats = {};
  
  players.forEach(player => {
    player.kplRecords.forEach(record => {
      if (!clubStats[record.club]) {
        clubStats[record.club] = {
          players: 0,
          totalAppearances: 0,
          totalCleanSheets: 0
        };
      }
      clubStats[record.club].players += 1;
      clubStats[record.club].totalAppearances += record.appearances;
      clubStats[record.club].totalCleanSheets += record.cleanSheets;
    });
  });

  const clubData = Object.entries(clubStats)
    .map(([club, stats]) => ({ club, ...stats }))
    .sort((a, b) => b.players - a.players);

  return (
    <div className="space-y-6">
      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Users className="w-6 h-6 mr-3 text-cyan-400" />
          Goalkeepers by Club
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubData.map((club, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-xl">
              <h3 className="text-white font-semibold mb-2">{club.club}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Goalkeepers:</span>
                  <span className="text-white">{club.players}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Appearances:</span>
                  <span className="text-white">{club.totalAppearances}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Clean Sheets:</span>
                  <span className="text-white">{club.totalCleanSheets}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubDistribution;