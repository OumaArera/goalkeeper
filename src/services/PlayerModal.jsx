import React from "react";
import { User, Trophy, Target, Calendar, Shirt, Users, Activity, Shield, Award } from "lucide-react";
import { getTotalStats, calculateAge } from "../utils/getTotalStats";


const PlayerModal = ({ player, onClose, setActiveView, activeView }) => {
    const totalStats = getTotalStats(player);
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
          
          {/* Enhanced Header with Large Image */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-20 bg-black/30 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
            >
              ✕
            </button>
            
            {/* Initial View - Hero Image Layout */}
            {!activeView && (
              <div className="relative">
                {/* Large Background Image */}
                <div className="h-80 md:h-96 overflow-hidden rounded-t-2xl">
                  <img
                    src={player.bioData.image}
                    alt={`${player.bioData.firstName} ${player.bioData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                
                {/* Player Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {player.bioData.firstName} {player.bioData.middleNames} {player.bioData.lastName}
                    </h2>
                    
                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Target className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                        <span className="text-xs text-gray-300">Position</span>
                        <span className="font-semibold text-white text-sm md:text-base">{player.bioData.position}</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                        <span className="text-xs text-gray-300">Age</span>
                        <span className="font-semibold text-white text-sm md:text-base">{calculateAge(player.bioData.dateOfBirth)} years</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                        <span className="text-xs text-gray-300">Int'l Caps</span>
                        <span className="font-semibold text-white text-sm md:text-base">{player.bioData.internationalCaps}</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Shirt className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
                        <span className="text-xs text-gray-300">Jersey</span>
                        <span className="font-semibold text-white text-sm md:text-base">{player.bioData.jersey || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Compact Header - When Overview or Stats is Active */}
            {activeView && (
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-white/10">
                {/* Mobile Layout */}
                <div className="block md:hidden p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/30 flex-shrink-0">
                      <img
                        src={player.bioData.image}
                        alt={`${player.bioData.firstName} ${player.bioData.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-1 leading-tight">
                        {player.bioData.firstName} {player.bioData.lastName}
                      </h2>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                        <span className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{player.bioData.position}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{calculateAge(player.bioData.dateOfBirth)}y</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Trophy className="w-3 h-3" />
                          <span>{player.bioData.internationalCaps} caps</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0 shadow-2xl">
                      <img
                        src={player.bioData.image}
                        alt={`${player.bioData.firstName} ${player.bioData.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                        {player.bioData.firstName} {player.bioData.middleNames} {player.bioData.lastName}
                      </h2>
                      <div className="flex items-center space-x-6 text-gray-300">
                        <span className="flex items-center space-x-2">
                          <Target className="w-5 h-5" />
                          <span className="font-medium">{player.bioData.position}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>{calculateAge(player.bioData.dateOfBirth)} years</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5" />
                          <span>{player.bioData.internationalCaps} caps</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Shirt className="w-5 h-5" />
                          <span>#{player.bioData.jersey || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View Toggle - Always Visible */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 md:px-6 pb-4 border-b border-white/10">
              <div className="flex space-x-1 bg-black/30 rounded-lg p-1 max-w-md mx-auto">
                <button
                  onClick={() => setActiveView("overview")}
                  className={`flex-1 px-4 py-3 rounded-md font-medium transition-all text-sm md:text-base ${
                    activeView === "overview"
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveView("stats")}
                  className={`flex-1 px-4 py-3 rounded-md font-medium transition-all text-sm md:text-base ${
                    activeView === "stats"
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Statistics
                </button>
              </div>
            </div>
          </div>

          {/* Content - Only shows when activeView is set */}
          {activeView && (
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
                          <span className="text-white font-medium">{player.bioData.height}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Weight:</span>
                          <span className="text-white font-medium">{player.bioData.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Preferred Foot:</span>
                          <span className="text-white font-medium">{player.bioData.favoriteFoot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date of Birth:</span>
                          <span className="text-white font-medium">{new Date(player.bioData.dateOfBirth).toLocaleDateString()}</span>
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
                          <span className="text-white font-medium">{totalStats.totalAppearances}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Clean Sheets:</span>
                          <span className="text-white font-medium">{totalStats.totalCleanSheets}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>International Caps:</span>
                          <span className="text-white font-medium">{player.bioData.internationalCaps}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Assists:</span>
                          <span className="text-white font-medium">{totalStats.totalAssists}</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {player.formerClubs.map((club, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h4 className="font-semibold text-white text-sm md:text-base mb-1">{club.name}</h4>
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
                          className="px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white rounded-full text-xs md:text-sm border border-white/20 font-medium"
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
                      <div className="space-y-3">
                        {player.honorsAndAwards.map((award, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <p className="text-white font-medium text-sm md:text-base">{award.saveOfTheMonth}</p>
                            <p className="text-gray-400 text-xs md:text-sm mt-1">{award.season}</p>
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
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-6 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Goalkeeping Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">{player.goalKeeping.saves}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Saves</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">{player.goalKeeping.penaltiesSaved}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Penalties Saved</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">{player.goalKeeping.catches}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Catches</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">{player.goalKeeping.punches}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Punches</div>
                      </div>
                    </div>
                  </div>

                  {/* Defense Stats */}
                  <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Defensive Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">{player.defense.cleanSheets}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Clean Sheets</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-red-400 mb-2">{player.defense.goalsConceded}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Goals Conceded</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">{player.defense.errorsLeadingToGoal}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Errors Leading to Goal</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-gray-400 mb-2">{player.defense.ownGoals}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Own Goals</div>
                      </div>
                    </div>
                  </div>

                  {/* Team Play Stats */}
                  <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Team Play Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">{player.teamPlay.passes}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Total Passes</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">{player.teamPlay.passesPerMatch}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Passes Per Match</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">{player.teamPlay.accurateLongBalls}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Accurate Long Balls</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">{player.teamPlay.assists}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Assists</div>
                      </div>
                    </div>
                  </div>

                  {/* Discipline */}
                  <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-6">Discipline</h3>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">{player.discipline.yellowCards}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Yellow Cards</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-red-400 mb-2">{player.discipline.redCards}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Red Cards</div>
                      </div>
                      <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-2xl md:text-3xl font-bold text-gray-400 mb-2">{player.discipline.fouls}</div>
                        <div className="text-gray-400 text-xs md:text-sm font-medium">Fouls</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

export default PlayerModal;