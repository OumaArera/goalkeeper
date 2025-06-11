import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, User, BarChart3, Loader2 } from "lucide-react";
import PlayerModal from "../services/PlayerModal";
import { getTotalStats } from "../utils/getTotalStats";
import { getData } from "../services/apiServices";
import PlayerImage from "../services/PlayerImage";

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activeView, setActiveView] = useState("overview");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const playersPerPage = 6;
  const page = 1;
  const limit = 20;
  const isTokenRequired = false;

  const uRL = `goalkeepers?page=${page}&limit=${limit}`;

  

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getData(uRL, isTokenRequired);
        setPlayers(data.data || []);
      } catch (err) {
        setError("Failed to load players. Please try again.");
        console.error("Error fetching players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [page, limit]);

  // Get unique clubs from players data
  const clubs = useMemo(() => {
    const allClubs = players.flatMap(player => 
      player.formerClubs.map(club => club.name)
    );
    return [...new Set(allClubs)].sort();
  }, [players]);

  // Get unique positions - Updated to use kplRecords
  const positions = useMemo(() => {
    const allPositions = players.flatMap(player => 
      player.kplRecords.map(record => record.position)
    );
    return [...new Set(allPositions)].sort();
  }, [players]);

  // Filter players based on search and filters
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const fullName = `${player.user.firstName} ${player.user.middleNames || ''} ${player.user.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      
      const matchesClub = selectedClub === "" || 
        player.formerClubs.some(club => club.name === selectedClub);
      
      const matchesPosition = selectedPosition === "" || 
        player.kplRecords.some(record => record.position === selectedPosition);
      
      return matchesSearch && matchesClub && matchesPosition;
    });
  }, [players, searchTerm, selectedClub, selectedPosition]);

  // Pagination
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const startIndex = (currentPage - 1) * playersPerPage;
  const paginatedPlayers = filteredPlayers.slice(startIndex, startIndex + playersPerPage);

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
      <div className="text-white text-lg font-medium">Loading goalkeepers...</div>
      <div className="text-gray-400 text-sm">Please wait while we fetch the latest data</div>
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-red-400 text-xl font-semibold">⚠️ Something went wrong</div>
      <div className="text-gray-300 text-center max-w-md">
        {error}
      </div>
      <button
        onClick={() => window.location.reload()}
        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-6 rounded-lg font-medium transition-all hover:scale-105"
      >
        Refresh Page
      </button>
    </div>
  );



  return (
    <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Goalkeepers{"  "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Database
            </span>
          </h1>
        </div>

        {/* Search and Filters - Only show when not loading */}
        {!loading && (
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
        )}

        {/* Content Area */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <>
            {/* Players Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
              {paginatedPlayers.map((player, index) => {
                const totalStats = getTotalStats(player);
                return (
                  <div
                    key={player.id}
                    className="bg-black/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 min-h-[500px]"
                  >
                    {/* Player Image with error handling */}
                    <PlayerImage player={player} />

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center bg-white/5 rounded-lg p-4">
                          <div className="text-3xl font-extrabold text-cyan-400 mb-1">{totalStats.totalAppearances}</div>
                          <div className="text-gray-300 text-sm font-medium">Appearances</div>
                        </div>
                        <div className="text-center bg-white/5 rounded-lg p-4">
                          <div className="text-3xl font-bold text-purple-400 mb-1">{totalStats.totalCleanSheets}</div>
                          <div className="text-gray-300 text-sm font-medium">Clean Sheets</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setSelectedPlayer(player);
                            setActiveView("overview");
                          }}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <User className="w-4 h-4" />
                          <span className="font-semibold">Overview</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPlayer(player);
                            setActiveView("stats");
                          }}
                          className="flex-1 border-2 border-white/30 text-white py-3 px-4 rounded-lg font-medium transition-all hover:bg-white/10 hover:border-white/50 flex items-center justify-center space-x-2"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Stats</span>
                        </button>
                      </div>
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
          </>
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