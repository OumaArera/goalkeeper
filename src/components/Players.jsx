import React, { useState, useMemo } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, User, BarChart3 } from "lucide-react";
import { players } from "../data/data";
import PlayerModal from "../services/PlayerModal";
import { getTotalStats, calculateAge } from "../utils/getTotalStats";

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activeView, setActiveView] = useState("overview");
  const playersPerPage = 6;

  // Get unique clubs from players data
  const clubs = useMemo(() => {
    const allClubs = players.flatMap(player => 
      player.formerClubs.map(club => club.name)
    );
    return [...new Set(allClubs)].sort();
  }, []);

  // Get unique positions
  const positions = useMemo(() => {
    const allPositions = players.map(player => player.bioData.position);
    return [...new Set(allPositions)].sort();
  }, []);

  // Filter players based on search and filters
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const fullName = `${player.bioData.firstName} ${player.bioData.middleNames || ''} ${player.bioData.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      
      const matchesClub = selectedClub === "" || 
        player.formerClubs.some(club => club.name === selectedClub);
      
      const matchesPosition = selectedPosition === "" || 
        player.bioData.position === selectedPosition;
      
      return matchesSearch && matchesClub && matchesPosition;
    });
  }, [searchTerm, selectedClub, selectedPosition]);

  // Pagination
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const startIndex = (currentPage - 1) * playersPerPage;
  const paginatedPlayers = filteredPlayers.slice(startIndex, startIndex + playersPerPage);


  return (
    <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      {/* Background Effects */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Goalkeepers
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Database
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore comprehensive profiles and statistics of professional goalkeepers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/30 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/10 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Club Filter */}
            <div className="relative">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
              >
                <option value="">All Clubs</option>
                {clubs.map(club => (
                  <option key={club} value={club} className="bg-slate-800">{club}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Position Filter */}
            <div className="relative">
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
              >
                <option value="">All Positions</option>
                {positions.map(position => (
                  <option key={position} value={position} className="bg-slate-800">{position}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-white/10 rounded-lg px-4 py-3 border border-white/20">
              <span className="text-white font-medium">{filteredPlayers.length} Players</span>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {paginatedPlayers.map((player, index) => {
            const totalStats = getTotalStats(player);
            return (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 min-h-[320px]"
              >
                {/* Player Header */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                    <img
                      src={player.bioData.image}
                      alt={`${player.bioData.firstName} ${player.bioData.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-extrabold text-white leading-snug mb-2">
                      {player.bioData.firstName} {player.bioData.lastName}
                    </h3>
                    <p className="text-gray-300 text-xl mb-1">{player.bioData.position}</p>
                    <p className="text-gray-400 text-lg">{calculateAge(player.bioData.dateOfBirth)} years old</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-cyan-400 mb-2">{totalStats.totalAppearances}</div>
                    <div className="text-gray-300 text-base font-medium">Appearances</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">{totalStats.totalCleanSheets}</div>
                    <div className="text-gray-400 text-base">Clean Sheets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">{player.bioData.internationalCaps}</div>
                    <div className="text-gray-400 text-base">Caps</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedPlayer(player);
                      setActiveView("overview");
                    }}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg font-semibold">Overview</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPlayer(player);
                      setActiveView("stats");
                    }}
                    className="flex-1 border-2 border-white/30 text-white py-4 px-6 rounded-lg font-medium transition-all hover:bg-white/10 hover:border-white/50 flex items-center justify-center space-x-3"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-lg">Stats</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Player Modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          setActiveView={setActiveView}
          activeView={activeView}
        />
      )}
    </div>
  );
};

export default Players;