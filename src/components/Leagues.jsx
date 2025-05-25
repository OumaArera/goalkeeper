import React, { useState, useMemo } from "react";
import { Trophy, Users, Search, Filter, Globe, Crown, Star, Target, Calendar } from "lucide-react";
import { leagues } from "../data/leagues";
import LeagueSection from "../services/LeagueSection";


const Leagues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Get unique countries
  const countries = useMemo(() => {
    const allCountries = leagues.map(league => league.country);
    return [...new Set(allCountries)].sort();
  }, []);

  // Filter leagues based on search and country
  const filteredLeagues = useMemo(() => {
    return leagues.filter(league => {
      const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === "" || league.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [searchTerm, selectedCountry]);

  // Group leagues by type for better organization
  const groupedLeagues = useMemo(() => {
    const groups = {
      premier: [],
      cups: [],
      womens: [],
      divisions: []
    };

    filteredLeagues.forEach(league => {
      const name = league.name.toLowerCase();
      if (name.includes('premier') && !name.includes('women')) {
        groups.premier.push(league);
      } else if (name.includes('cup') || name.includes('mozzart')) {
        groups.cups.push(league);
      } else if (name.includes('women')) {
        groups.womens.push(league);
      } else if (name.includes('division') || name.includes('super league')) {
        groups.divisions.push(league);
      }
    });

    return groups;
  }, [filteredLeagues]);


  return (
    <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      {/* Background Effects */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <Globe className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Football
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Leagues
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover professional football leagues and competitions from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/30 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-white/10 mb-12">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            {/* Search */}
            <div className="relative">
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
                {countries.map(country => (
                  <option key={country} value={country} className="bg-slate-800">{country}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-white/10 rounded-lg px-4 py-3 border border-white/20">
              <span className="text-white font-medium">{filteredLeagues.length} Leagues</span>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div className="text-2xl font-bold text-white">{leagues.length}</div>
            </div>
            <div className="text-gray-400">Total Leagues</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-cyan-400" />
              <div className="text-2xl font-bold text-white">{countries.length}</div>
            </div>
            <div className="text-gray-400">Countries</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Crown className="w-8 h-8 text-purple-400" />
              <div className="text-2xl font-bold text-white">{groupedLeagues.premier.length + groupedLeagues.cups.length}</div>
            </div>
            <div className="text-gray-400">Premier & Cups</div>
          </div>

          <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-400" />
              <div className="text-2xl font-bold text-white">{groupedLeagues.womens.length}</div>
            </div>
            <div className="text-gray-400">Women's Leagues</div>
          </div>
        </div>

        {/* League Sections */}
        <LeagueSection 
          title="Premier Competitions" 
          leagues={groupedLeagues.premier} 
          icon={Crown}
          description="Top-tier professional football leagues"
        />

        <LeagueSection 
          title="Cup Competitions" 
          leagues={groupedLeagues.cups} 
          icon={Trophy}
          description="Knockout tournaments and cup competitions"
        />

        <LeagueSection 
          title="Women's Football" 
          leagues={groupedLeagues.womens} 
          icon={Star}
          description="Professional women's football leagues"
        />

        <LeagueSection 
          title="Division Leagues" 
          leagues={groupedLeagues.divisions} 
          icon={Target}
          description="Lower division and developmental leagues"
        />

        {/* No Results Message */}
        {filteredLeagues.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Leagues Found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-3xl border border-white/10 mt-12 text-center">
          <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our league database is constantly updated with the latest information about competitions, 
            seasons, and participating teams. Check back regularly for new additions and updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leagues;