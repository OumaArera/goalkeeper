import React from "react";
import { User, Trophy, Users, Activity, Award } from "lucide-react";

const PlayerProfileDetails = ({ player, totalStats }) => {
  return (
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
              <span className="text-white font-medium">{player.height} ft</span>
            </div>
            <div className="flex justify-between">
              <span>Weight:</span>
              <span className="text-white font-medium">{player.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span>Preferred Foot:</span>
              <span className="text-white font-medium">{player.favoriteFoot}</span>
            </div>
            <div className="flex justify-between">
              <span>Date of Birth:</span>
              <span className="text-white font-medium">
                {new Date(player.user.dateOfBirth).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Phone:</span>
              <span className="text-white font-medium">{player.user.phonenumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="text-white font-medium">{player.user.email}</span>
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
              <span className="text-white font-medium">{player.internationalCaps}</span>
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
              <p className="text-gray-400 text-xs md:text-sm">
                {new Date(club.startDate).getFullYear()} - {new Date(club.endDate).getFullYear()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* KPL Club Records */}
      <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          KPL Club Records
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {player.kplRecords.map((record, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-white text-sm md:text-base mb-2">{record.club}</h4>
              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                <div className="text-gray-400">Appearances: <span className="text-white">{record.appearances}</span></div>
                <div className="text-gray-400">Clean Sheets: <span className="text-white">{record.cleanSheets}</span></div>
                <div className="text-gray-400">Goals: <span className="text-white">{record.goals}</span></div>
                <div className="text-gray-400">Assists: <span className="text-white">{record.assists}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      {player.experiences && player.experiences.length > 0 && (
        <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {player.experiences.map((exp, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white text-sm md:text-base mb-1">{exp.leagueName}</h4>
                <p className="text-gray-400 text-xs md:text-sm">{exp.appearances} appearances</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Style of Play */}
      {player.stylesOfPlay && player.stylesOfPlay.length > 0 && (
        <div className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Style of Play
          </h3>
          <div className="flex flex-wrap gap-2">
            {player.stylesOfPlay.map((styleObj, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white rounded-full text-xs md:text-sm border border-white/20 font-medium"
              >
                {styleObj.style}
              </span>
            ))}
          </div>
        </div>
      )}

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
                <p className="text-white font-medium text-sm md:text-base">{award.title}</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">{award.monthAwarded}</p>
                <p className="text-gray-400 text-xs md:text-sm">{award.season}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerProfileDetails;
