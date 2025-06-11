import React from 'react';
import { Shield } from 'lucide-react';

const PlayerStatsCard = ({ player }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Goalkeeping Stats */}
      <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Goalkeeping Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Saves', value: player.goalkeepingStats.saves, color: 'text-cyan-400' },
            { label: 'Penalties Saved', value: player.goalkeepingStats.penaltiesSaved, color: 'text-purple-400' },
            { label: 'Catches', value: player.goalkeepingStats.catches, color: 'text-green-400' },
            { label: 'Punches', value: player.goalkeepingStats.punches, color: 'text-orange-400' },
            { label: 'High Claims', value: player.goalkeepingStats.highClaims, color: 'text-blue-400' },
            { label: 'Sweeper Clearances', value: player.goalkeepingStats.sweeperClearances, color: 'text-indigo-400' },
            { label: 'Throw Outs', value: player.goalkeepingStats.throwOuts, color: 'text-teal-400' },
            { label: 'Goal Kicks', value: player.goalkeepingStats.goalKicks, color: 'text-pink-400' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Defense Stats */}
      <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Defensive Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Clean Sheets', value: player.defensiveStats.cleanSheets, color: 'text-cyan-400' },
            { label: 'Goals Conceded', value: player.defensiveStats.goalsConceded, color: 'text-red-400' },
            { label: 'Errors Leading to Goal', value: player.defensiveStats.errorsLeadingToGoal, color: 'text-yellow-400' },
            { label: 'Own Goals', value: player.defensiveStats.ownGoals, color: 'text-gray-400' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Play Stats */}
      <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Team Play Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Total Passes', value: player.teamplayStats.passes, color: 'text-cyan-400' },
            { label: 'Passes Per Match', value: player.teamplayStats.passesPerMatch, color: 'text-purple-400' },
            { label: 'Accurate Long Balls', value: player.teamplayStats.accurateLongBalls, color: 'text-green-400' },
            { label: 'Assists', value: player.teamplayStats.assists, color: 'text-orange-400' },
            { label: 'Goals', value: player.teamplayStats.goals, color: 'text-blue-400' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Discipline */}
      <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Discipline</h3>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { label: 'Yellow Cards', value: player.disciplineRecords.yellowCards, color: 'text-yellow-400' },
            { label: 'Red Cards', value: player.disciplineRecords.redCards, color: 'text-red-400' },
            { label: 'Fouls', value: player.disciplineRecords.fouls, color: 'text-orange-400' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Season Breakdown */}
      <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Season Breakdown by Club</h3>
        <div className="space-y-4">
          {player.kplRecords.map((record, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h4 className="font-semibold text-white text-base md:text-lg">{record.club}</h4>
                <span className="text-gray-400 text-sm">{record.position}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {[
                  { label: 'Appearances', value: record.appearances, color: 'text-cyan-400' },
                  { label: 'Clean Sheets', value: record.cleanSheets, color: 'text-green-400' },
                  { label: 'Goals', value: record.goals, color: 'text-purple-400' },
                  { label: 'Assists', value: record.assists, color: 'text-orange-400' },
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-3 bg-black/20 rounded">
                    <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-gray-400 text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsCard;
