import React from "react";
import { 
  Trophy, Globe, Users, Shield, 
  Calendar, Info 
} from "lucide-react";

const LeagueCard = ({ league, index }) => {
  const getLevelBadgeColor = (level) => {
    const levelStr = String(level).toLowerCase();
    
    if (['1', '2', '3'].includes(levelStr)) {
      return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    } else if (['4', '5'].includes(levelStr)) {
      return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    } else if (levelStr === 'open') {
      return 'bg-gradient-to-r from-purple-500 to-pink-500';
    } else if (levelStr === 'youth') {
      return 'bg-gradient-to-r from-green-500 to-emerald-500';
    } else if (['schools', 'universities'].includes(levelStr)) {
      return 'bg-gradient-to-r from-indigo-500 to-purple-500';
    } else if (levelStr === 'corporates') {
      return 'bg-gradient-to-r from-gray-500 to-slate-500';
    } else {
      return 'bg-gradient-to-r from-gray-600 to-gray-700';
    }
  };

  const getSexIcon = (sex) => {
    switch (sex) {
      case 'male':
        return <Users className="w-4 h-4 text-blue-400" />;
      case 'female':
        return <Users className="w-4 h-4 text-pink-400" />;
      case 'both':
        return <Users className="w-4 h-4 text-purple-400" />;
      default:
        return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSexLabel = (sex) => {
    switch (sex) {
      case 'male':
        return "Men's";
      case 'female':
        return "Women's";
      case 'both':
        return 'Mixed';
      default:
        return 'Unknown';
    }
  };

  const getLevelLabel = (level) => {
    const levelStr = String(level);
    
    if (isNaN(level)) {
      return levelStr.charAt(0).toUpperCase() + levelStr.slice(1);
    } else {
      return `Level ${levelStr}`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group relative">
      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      
      {/* Card Content */}
      <div className="relative bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getLevelBadgeColor(league.level)}`}>
              {getLevelLabel(league.level)}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {getSexIcon(league.sex)}
            <span className="text-xs text-gray-400">{getSexLabel(league.sex)}</span>
          </div>
        </div>

        {/* League Name */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-tight">
          {league.name}
        </h3>

        {/* Description */}
        {league.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
            {league.description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-3 mb-4">
          {/* Country */}
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-gray-300 text-sm font-medium">{league.country}</span>
          </div>

          {/* Regulator */}
          {league.regulator && (
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{league.regulator}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Active League</span>
          </div>
          
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded-lg text-xs font-medium border border-cyan-500/30">
            <div className="flex items-center space-x-1">
              <Info className="w-3 h-3" />
              <span>Details</span>
            </div>
          </button>
        </div>

        {/* Subtle Animation Indicator */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
      </div>
    </div>
  );
};

export default LeagueCard;