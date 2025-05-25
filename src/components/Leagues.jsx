import React, { useState, useMemo } from "react";
import { Trophy, Users, Search, Filter, Globe, Crown, Star, Target, Calendar, GraduationCap, Building2, School, Medal } from "lucide-react";
import { leagues } from "../data/leagues";
import LeagueSection from "../services/LeagueSection";


const Leagues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedSex, setSelectedSex] = useState("");

  // Get unique countries, tiers, and sex categories
  const filterOptions = useMemo(() => {
    const countries = [...new Set(leagues.map(league => league.country))].sort();
    const tiers = [...new Set(leagues.map(league => league.tier))].sort();
    const sexOptions = [...new Set(leagues.map(league => league.sex))].sort();
    
    return { countries, tiers, sexOptions };
  }, []);

  // Filter leagues based on all criteria
  const filteredLeagues = useMemo(() => {
    return leagues.filter(league => {
      const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === "" || league.country === selectedCountry;
      
      // Fix tier comparison - convert both to strings for comparison
      const matchesTier = selectedTier === "" || String(league.tier) === String(selectedTier);
      
      const matchesSex = selectedSex === "" || league.sex === selectedSex;
      
      return matchesSearch && matchesCountry && matchesTier && matchesSex;
    });
  }, [searchTerm, selectedCountry, selectedTier, selectedSex]);

  // Group leagues by tier for better organization
  const groupedLeagues = useMemo(() => {
    const groups = {
      professional: [], // tiers 1, 2, 3
      developmental: [], // tiers 4, 5
      open: [], // open tier
      youth: [], // youths tier
      academic: [], // schools and universities
      corporate: [] // corporates tier
    };

    filteredLeagues.forEach(league => {
      const tier = league.tier;
      
      if ([1, 2, 3].includes(tier)) {
        groups.professional.push(league);
      } else if ([4, 5].includes(tier)) {
        groups.developmental.push(league);
      } else if (tier === 'open') {
        groups.open.push(league);
      } else if (tier === 'youths') {
        groups.youth.push(league);
      } else if (tier === 'schools' || tier === 'universities') {
        groups.academic.push(league);
      } else if (tier === 'corporates') {
        groups.corporate.push(league);
      }
    });

    return groups;
  }, [filteredLeagues]);

  // Statistics by tier and sex
  const statistics = useMemo(() => {
    return {
      total: leagues.length,
      countries: filterOptions.countries.length,
      professional: leagues.filter(l => [1, 2, 3].includes(l.tier)).length,
      womens: leagues.filter(l => l.sex === 'female').length,
      mixed: leagues.filter(l => l.sex === 'both').length,
      youth: leagues.filter(l => l.tier === 'youths').length
    };
  }, [filterOptions.countries.length]);

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

            {/* Tier Filter */}
            <div className="relative">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
              >
                <option value="">All Tiers</option>
                {filterOptions.tiers.map(tier => (
                  <option key={tier} value={tier} className="bg-slate-800">
                    {typeof tier === 'number' ? `Tier ${tier}` : tier.charAt(0).toUpperCase() + tier.slice(1)}
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

          {/* Results Count */}
          <div className="mt-4 flex justify-center">
            <div className="bg-white/10 rounded-lg px-6 py-3 border border-white/20">
              <span className="text-white font-medium">{filteredLeagues.length} Leagues Found</span>
            </div>
          </div>
        </div>

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
            description="Top-tier professional football leagues (Tiers 1-3)"
          />
        )}

        {groupedLeagues.developmental.length > 0 && (
          <LeagueSection 
            title="Developmental Leagues" 
            leagues={groupedLeagues.developmental} 
            icon={Target}
            description="Lower division and developmental leagues (Tiers 4-5)"
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
        {filteredLeagues.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Leagues Found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-3xl border border-white/10 mt-12 text-center">
          <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our league database spans across all tiers of football - from professional leagues to youth academies, 
            school competitions, and corporate tournaments. Check back regularly for new additions and updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leagues;