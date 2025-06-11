import React from 'react';
import { Search, Tag, Filter } from 'lucide-react';

const PlayerItemFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedTeam,
  setSelectedTeam,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  clearFilters,
  filteredItemCount,
  filterOptions
}) => {
    // console.log("Filter Option: ", filterOptions);
  return (
    <div className="bg-black/30 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-white/10 mb-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
          >
            <option value="">All Categories</option>
            {filterOptions.categories.map(category => (
              <option key={category} value={category} className="bg-slate-800">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>

        {/* Sort Filter */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
          >
            <option value="name" className="bg-slate-800">Name A-Z</option>
            <option value="price-low" className="bg-slate-800">Price: Low to High</option>
            <option value="price-high" className="bg-slate-800">Price: High to Low</option>
            <option value="newest" className="bg-slate-800">Newest First</option>
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      {/* Additional Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {/* Brand Filter */}
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
          >
            <option value="">All Brands</option>
            {filterOptions.brands.map((brand, index) => (
                <option key={index} value={brand ?? ''} className="bg-slate-800">
                    {brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : 'Unknown'}
                </option>
            ))}
          </select>
        </div>

        {/* Team Filter */}
        <div className="relative">
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
          >
            <option value="">All Teams</option>
            {filterOptions.teams.map(team => (
              <option key={team} value={team} className="bg-slate-800">
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-3 rounded-lg font-medium transition-colors border border-red-500/30"
        >
          Clear All
        </button>
      </div>

      {/* Result Count */}
      <div className="bg-white/10 rounded-lg px-6 py-3 border border-white/20 inline-block">
        <span className="text-white font-medium">{filteredItemCount} Items Found</span>
      </div>
    </div>
  );
};

export default PlayerItemFilters;
