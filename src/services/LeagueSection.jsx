import React from "react";
import LeagueCard from "./LeagueCard";

const LeagueSection = ({ title, leagues, icon: Icon, description }) => {
    if (leagues.length === 0) return null;
    
    return (
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <Icon className="w-8 h-8 text-cyan-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {leagues.map((league, index) => (
            <LeagueCard key={index} league={league} index={index} />
          ))}
        </div>
      </div>
    );
  };

  export default LeagueSection;