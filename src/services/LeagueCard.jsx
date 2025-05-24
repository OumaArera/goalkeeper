import React from "react";
import { MapPin, Award, Crown } from "lucide-react";
import { getLeagueStyle, getLeagueTier } from "../utils/leagueUtils";


const LeagueCard = ({ league, index }) => {
    const style = getLeagueStyle(league.name);
    const Icon = style.icon;
    
    return (
      <div
        className={`group bg-black/30 backdrop-blur-lg p-6 rounded-2xl border ${style.border} hover:border-opacity-60 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* League Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${style.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`} style={{ filter: 'brightness(1.2)' }} />
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{league.country}</span>
          </div>
        </div>

        {/* League Name */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          {league.name}
        </h3>

        {/* League Type Badge */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${style.bg} text-white border ${style.border}`}>
            {getLeagueTier(league.name).toUpperCase()}
          </span>
          <div className={`w-8 h-1 bg-gradient-to-r ${style.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${style.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
      </div>
    );
  };
export default LeagueCard;