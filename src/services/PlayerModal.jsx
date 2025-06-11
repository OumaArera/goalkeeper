import React from "react";
import { Trophy, Target, Calendar, Shirt } from "lucide-react";
import { getTotalStats, calculateAge } from "../utils/getTotalStats";
import PlayerHeroImage from "./PlayerHeroImage";
import PlayerStatsCard from "./PlayerStatsCard";
import PlayerProfileDetails from "./PlayerProfileDetails";


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
                  <PlayerHeroImage player={player} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                
                {/* Player Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {player.user.firstName} {player.user.middleNames} {player.user.lastName}
                    </h2>
                    
                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Target className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                        <span className="text-xs text-gray-300">Position</span>
                        <span className="font-semibold text-white text-sm md:text-base">
                          {player.kplRecords[0]?.position || 'Goalkeeper'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                        <span className="text-xs text-gray-300">Age</span>
                        <span className="font-semibold text-white text-sm md:text-base">
                          {calculateAge(player.user.dateOfBirth)} years
                        </span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                        <span className="text-xs text-gray-300">Int'l Caps</span>
                        <span className="font-semibold text-white text-sm md:text-base">{player.internationalCaps}</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20">
                        <Shirt className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
                        <span className="text-xs text-gray-300">Jersey</span>
                        <span className="font-semibold text-white text-sm md:text-base">{player.jersey || 0}</span>
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
                      <PlayerHeroImage player={player} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-1 leading-tight">
                        {player.user.firstName} {player.user.lastName}
                      </h2>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                        <span className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{player.kplRecords[0]?.position || 'Goalkeeper'}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{calculateAge(player.user.dateOfBirth)}y</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Trophy className="w-3 h-3" />
                          <span>{player.internationalCaps} caps</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0 shadow-2xl">
                      <PlayerHeroImage player={player} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                        {player.user.firstName} {player.user.middleNames} {player.user.lastName}
                      </h2>
                      <div className="flex items-center space-x-6 text-gray-300">
                        <span className="flex items-center space-x-2">
                          <Target className="w-5 h-5" />
                          <span className="font-medium">{player.kplRecords[0]?.position || 'Goalkeeper'}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>{calculateAge(player.user.dateOfBirth)} years</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5" />
                          <span>{player.internationalCaps} caps</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Shirt className="w-5 h-5" />
                          <span>#{player.jersey || 0}</span>
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
                <PlayerProfileDetails player={player} totalStats={totalStats} />
              ) : (
                <PlayerStatsCard player={player} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default PlayerModal;