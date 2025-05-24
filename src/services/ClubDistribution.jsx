import React, { useMemo } from "react";

const ClubDistribution = ({ players }) => {
  const clubData = useMemo(() => {
    const clubCounts = {};
    players.forEach(player => {
      player.formerClubs.forEach(club => {
        clubCounts[club.name] = (clubCounts[club.name] || 0) + 1;
      });
    });
    
    return Object.entries(clubCounts)
      .map(([club, count]) => ({ club, count }))
      .sort((a, b) => b.count - a.count);
  }, [players]);

  return (
    <div className="bg-black/30 backdrop-blur-lg p-8 rounded-2xl border border-white/10 mb-8">
      <h3 className="text-2xl font-bold text-white mb-6">Club Experience Distribution</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clubData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
              <span className="text-white font-medium">{item.club}</span>
            </div>
            <span className="text-cyan-400 font-bold text-lg">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubDistribution;