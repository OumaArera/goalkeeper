import React from "react";
import { User, Trophy, Target, Calendar, Shirt, Users, Activity, Shield, Award } from "lucide-react";
import { getTotalStats, calculateAge } from "../utils/getTotalStats";


const PlayerModal = ({ player, onClose, setActiveView, activeView }) => {
    const totalStats = getTotalStats(player);
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 md:p-6 border-b border-white/10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            >
              ✕
            </button>
            
            {/* Mobile Layout - Stacked */}
            <div className="block md:hidden">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0">
                  <img
                    src={player.bioData.image}
                    alt={`${player.bioData.firstName} ${player.bioData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {player.bioData.firstName} {player.bioData.middleNames} {player.bioData.lastName}
                  </h2>
                  <div className="flex flex-col space-y-2 text-gray-300 text-sm">
                    <span className="flex items-center justify-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{player.bioData.position}</span>
                    </span>
                    <span className="flex items-center justify-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{calculateAge(player.bioData.dateOfBirth)} years</span>
                    </span>
                    <span className="flex items-center justify-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{player.bioData.internationalCaps} caps</span>
                    </span>
                    <span className="flex items-center justify-center space-x-1">
                      <Shirt className="w-4 h-4" />
                      <span>{player.bioData.jersey || 0} Jersey</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Side by Side */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0">
                <img
                  src={player.bioData.image}
                  alt={`${player.bioData.firstName} ${player.bioData.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {player.bioData.firstName} {player.bioData.middleNames} {player.bioData.lastName}
                </h2>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{player.bioData.position}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{calculateAge(player.bioData.dateOfBirth)} years</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>{player.bioData.internationalCaps} caps</span>
                  </span>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex space-x-1 mt-6 bg-black/30 rounded-lg p-1">
              <button
                onClick={() => setActiveView("overview")}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-md font-medium transition-all text-sm md:text-base ${
                  activeView === "overview"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveView("stats")}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-md font-medium transition-all text-sm md:text-base ${
                  activeView === "stats"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Stats
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            {activeView === "overview" ? (
              <div className="space-y-6 md:space-y-8">
                {/* Bio Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="space-y-3 text-gray-300 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="text-white">{player.bioData.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="text-white">{player.bioData.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preferred Foot:</span>
                        <span className="text-white">{player.bioData.favoriteFoot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date of Birth:</span>
                        <span className="text-white">{new Date(player.bioData.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Career Summary
                    </h3>
                    <div className="space-y-3 text-gray-300 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span>Total Appearances:</span>
                        <span className="text-white">{totalStats.totalAppearances}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clean Sheets:</span>
                        <span className="text-white">{totalStats.totalCleanSheets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>International Caps:</span>
                        <span className="text-white">{player.bioData.internationalCaps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Assists:</span>
                        <span className="text-white">{totalStats.totalAssists}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Former Clubs */}
                <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Former Clubs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {player.formerClubs.map((club, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-white text-sm md:text-base">{club.name}</h4>
                        <p className="text-gray-400 text-xs md:text-sm">{club.league}</p>
                        <p className="text-gray-400 text-xs md:text-sm">{club.country}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style of Play */}
                <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Style of Play
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {player.styleOfPlay.map((style, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white rounded-full text-xs md:text-sm border border-white/20"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Honors and Awards */}
                {player.honorsAndAwards && player.honorsAndAwards.length > 0 && (
                  <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Honors & Awards
                    </h3>
                    <div className="space-y-2">
                      {player.honorsAndAwards.map((award, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-3">
                          <p className="text-white font-medium text-sm md:text-base">{award.saveOfTheMonth}</p>
                          <p className="text-gray-400 text-xs md:text-sm">{award.season}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6 md:space-y-8">
                {/* Goalkeeping Stats */}
                <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Goalkeeping Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-cyan-400">{player.goalKeeping.saves}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Saves</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-purple-400">{player.goalKeeping.penaltiesSaved}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Penalties Saved</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-green-400">{player.goalKeeping.catches}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Catches</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-orange-400">{player.goalKeeping.punches}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Punches</div>
                    </div>
                  </div>
                </div>

                {/* Defense Stats */}
                <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Defensive Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-cyan-400">{player.defense.cleanSheets}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Clean Sheets</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-red-400">{player.defense.goalsConceded}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Goals Conceded</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-yellow-400">{player.defense.errorsLeadingToGoal}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Errors Leading to Goal</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-gray-400">{player.defense.ownGoals}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Own Goals</div>
                    </div>
                  </div>
                </div>

                {/* Team Play Stats */}
                <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Team Play Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-cyan-400">{player.teamPlay.passes}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Total Passes</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-purple-400">{player.teamPlay.passesPerMatch}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Passes Per Match</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-green-400">{player.teamPlay.accurateLongBalls}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Accurate Long Balls</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-orange-400">{player.teamPlay.assists}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Assists</div>
                    </div>
                  </div>
                </div>

                {/* Discipline */}
                <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Discipline</h3>
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-yellow-400">{player.discipline.yellowCards}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Yellow Cards</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-red-400">{player.discipline.redCards}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Red Cards</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-white/5 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-gray-400">{player.discipline.fouls}</div>
                      <div className="text-gray-400 text-xs md:text-sm">Fouls</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default PlayerModal;