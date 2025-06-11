import React, { useState, useMemo, useEffect } from "react";
import { 
  Trophy, Users, Search, Filter, 
  Globe, Crown, Star, Target, 
  Calendar, GraduationCap, 
  Building2, Medal, ChevronLeft, ChevronRight,
  Loader2
} from "lucide-react";
import LeagueSection from "../services/LeagueSection";
import { getData, createData } from "../services/apiServices";

const Leagues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeagues, setTotalLeagues] = useState(0);
  
  const limit = 20;
  const isTokenRequired = false;

  const fetchLeagues = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const url = `leagues?page=${page}&limit=${limit}`;
      const response = await getData(url, isTokenRequired);
      
      setLeagues(response.data || []);
      setTotalPages(response.totalPages || 1);
      setTotalLeagues(response.data?.length || 0);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to load leagues. Please try again.");
      console.error("Error fetching leagues:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues(currentPage);
  }, [currentPage]);

  // Get unique countries, levels, and sex categories
  const filterOptions = useMemo(() => {
    const countries = [...new Set(leagues.map(league => league.country))].sort();
    const levels = [...new Set(leagues.map(league => league.level))].sort();
    const sexOptions = [...new Set(leagues.map(league => league.sex))].sort();
    
    return { countries, levels, sexOptions };
  }, [leagues]);

  // Filter leagues based on all criteria
  const filteredLeagues = useMemo(() => {
    return leagues.filter(league => {
      const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === "" || league.country === selectedCountry;
      const matchesLevel = selectedLevel === "" || String(league.level) === String(selectedLevel);
      const matchesSex = selectedSex === "" || league.sex === selectedSex;
      
      return matchesSearch && matchesCountry && matchesLevel && matchesSex;
    });
  }, [leagues, searchTerm, selectedCountry, selectedLevel, selectedSex]);

  // Group leagues by level for better organization
  const groupedLeagues = useMemo(() => {
    const groups = {
      professional: [], // levels 1, 2, 3
      developmental: [], // levels 4, 5
      open: [], // open level
      youth: [], // youths level
      academic: [], // schools and universities
      corporate: [] // corporates level
    };

    filteredLeagues.forEach(league => {
      const level = league.level;
      
      if (['1', '2', '3'].includes(String(level))) {
        groups.professional.push(league);
      } else if (['4', '5'].includes(String(level))) {
        groups.developmental.push(league);
      } else if (String(level).toLowerCase() === 'open') {
        groups.open.push(league);
      } else if (String(level).toLowerCase() === 'youth') {
        groups.youth.push(league);
      } else if (['schools', 'universities'].includes(String(level).toLowerCase())) {
        groups.academic.push(league);
      } else if (String(level).toLowerCase() === 'corporates') {
        groups.corporate.push(league);
      }
    });

    return groups;
  }, [filteredLeagues]);

  // Statistics by level and sex
  const statistics = useMemo(() => {
    return {
      total: totalLeagues,
      countries: filterOptions.countries.length,
      professional: leagues.filter(l => ['1', '2', '3'].includes(String(l.level))).length,
      womens: leagues.filter(l => l.sex === 'female').length,
      mixed: leagues.filter(l => l.sex === 'both').length,
      youth: leagues.filter(l => String(l.level).toLowerCase() === 'youth').length
    };
  }, [leagues, totalLeagues, filterOptions.countries.length]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCountry("");
    setSelectedLevel("");
    setSelectedSex("");
  };

  if (loading && leagues.length === 0) {
    return (
      <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Leagues</h2>
          <p className="text-gray-400">Fetching football leagues from around the world...</p>
        </div>
      </div>
    );
  }

  if (error && leagues.length === 0) {
    return (
      <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Leagues</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => fetchLeagues(currentPage)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <Globe className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Football{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Leagues
            </span>
          </h1>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/30 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-white/10 mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search leagues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Country Filter */}
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
              >
                <option value="">All Countries</option>
                {filterOptions.countries.map(country => (
                  <option key={country} value={country} className="bg-slate-800">{country}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
              >
                <option value="">All Levels</option>
                {filterOptions.levels.map(level => (
                  <option key={level} value={level} className="bg-slate-800">
                    {isNaN(level) ? level.charAt(0).toUpperCase() + level.slice(1) : `Level ${level}`}
                  </option>
                ))}
              </select>
              <Target className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Sex Filter */}
            <div className="relative">
              <select
                value={selectedSex}
                onChange={(e) => setSelectedSex(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
              >
                <option value="">All Categories</option>
                {filterOptions.sexOptions.map(sex => (
                  <option key={sex} value={sex} className="bg-slate-800">
                    {sex === 'male' ? 'Men\'s' : sex === 'female' ? 'Women\'s' : 'Mixed/Both'}
                  </option>
                ))}
              </select>
              <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Results Count and Clear Filters */}
          <div className="mt-4 flex justify-between items-center">
            <div className="bg-white/10 rounded-lg px-6 py-3 border border-white/20">
              <span className="text-white font-medium">{filteredLeagues.length} Leagues Found</span>
            </div>
            {(searchTerm || selectedCountry || selectedLevel || selectedSex) && (
              <button
                onClick={clearFilters}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg font-medium transition-colors border border-red-500/30"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Loading Overlay for Pagination */}
        {loading && leagues.length > 0 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
              <p className="text-white text-center">Loading...</p>
            </div>
          </div>
        )}

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
          <div className="bg-black/30 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{statistics.total}</div>
            </div>
            <div className="text-gray-400 text-sm md:text-base">Total Leagues</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Globe className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{statistics.countries}</div>
            </div>
            <div className="text-gray-400 text-sm md:text-base">Countries</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Crown className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{statistics.professional}</div>
            </div>
            <div className="text-gray-400 text-sm md:text-base">Professional</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{statistics.womens}</div>
            </div>
            <div className="text-gray-400 text-sm md:text-base">Women's</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{statistics.mixed}</div>
            </div>
            <div className="text-gray-400 text-sm md:text-base">Mixed</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <Medal className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{statistics.youth}</div>
            </div>
            <div className="text-gray-400 text-sm md:text-base">Youth</div>
          </div>
        </div>

        {/* League Sections */}
        {groupedLeagues.professional.length > 0 && (
          <LeagueSection 
            title="Professional Leagues" 
            leagues={groupedLeagues.professional} 
            icon={Crown}
            description="Top-tier professional football leagues (Levels 1-3)"
          />
        )}

        {groupedLeagues.developmental.length > 0 && (
          <LeagueSection 
            title="Developmental Leagues" 
            leagues={groupedLeagues.developmental} 
            icon={Target}
            description="Lower division and developmental leagues (Levels 4-5)"
          />
        )}

        {groupedLeagues.open.length > 0 && (
          <LeagueSection 
            title="Open Competitions" 
            leagues={groupedLeagues.open} 
            icon={Trophy}
            description="Third-party tournaments and open competitions"
          />
        )}

        {groupedLeagues.youth.length > 0 && (
          <LeagueSection 
            title="Youth & Academy Leagues" 
            leagues={groupedLeagues.youth} 
            icon={Medal}
            description="Youth and academy football competitions"
          />
        )}

        {groupedLeagues.academic.length > 0 && (
          <LeagueSection 
            title="Academic Competitions" 
            leagues={groupedLeagues.academic} 
            icon={GraduationCap}
            description="School and university football leagues"
          />
        )}

        {groupedLeagues.corporate.length > 0 && (
          <LeagueSection 
            title="Corporate Leagues" 
            leagues={groupedLeagues.corporate} 
            icon={Building2}
            description="Corporate and workplace football competitions"
          />
        )}

        {/* No Results Message */}
        {filteredLeagues.length === 0 && !loading && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Leagues Found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-black/30 backdrop-blur-lg p-6 rounded-3xl border border-white/10 mt-12">
            <div className="flex items-center justify-between">
              <div className="text-gray-400">
                Page {currentPage} of {totalPages} • {totalLeagues} total leagues
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-cyan-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-3xl border border-white/10 mt-12 text-center">
          <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our league database spans across all levels of football - from professional leagues to youth academies, 
            school competitions, and corporate tournaments. Check back regularly for new additions and updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leagues;