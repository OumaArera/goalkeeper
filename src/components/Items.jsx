import React, { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Package, Loader2, AlertCircle } from "lucide-react";
import { getData, createData } from "../services/apiServices";
import PlayerItemCardGrid from "./PlayerItemCardGrid";
import PlayerItemFilters from "./PlayerItemFilters";


const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("name");
  const [cartLoading, setCartLoading] = useState({});
  const [cartSuccess, setCartSuccess] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [cartItemCount, setCartItemCount] = useState(0); // Track cart items count

  const page = 1;
  const limit = 50;
  const isTokenRequired = false;
  const url = `items?page=${page}&limit=${limit}`;

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getData(url, isTokenRequired);
      setItems(data.data || []);
    } catch (err) {
      setError("Failed to load items. Please try again.");
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Get filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(items.map(item => item.category))].sort();
    const brands = [...new Set(items.map(item => item.brand))].sort();
    const teams = [...new Set(items.map(item => item.team).filter(Boolean))].sort();
    
    return { categories, brands, teams };
  }, [items]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
      const matchesBrand = selectedBrand === "" || item.brand === selectedBrand;
      const matchesTeam = selectedTeam === "" || item.team === selectedTeam;
      const matchesPrice = (priceRange.min === "" || item.price >= parseFloat(priceRange.min)) &&
                          (priceRange.max === "" || item.price <= parseFloat(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesBrand && matchesTeam && matchesPrice;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchTerm, selectedCategory, selectedBrand, selectedTeam, priceRange, sortBy]);

  // Add to cart function
  const addToCart = async (itemId) => {
    const payload = {itemId}
    const url = 'v1/api/items';
    const isTokenRequired = false;
    const response = await createData(url, payload, isTokenRequired);

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    setCartSuccess(prev => ({ ...prev, [itemId]: true }));
    setCartItemCount(prev => prev + 1); // Increment cart count
    
    // Clear success message after 2 seconds
    setTimeout(() => {
      setCartSuccess(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 2000);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedTeam("");
    setPriceRange({ min: "", max: "" });
    setSortBy("name");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  // Handle cart icon click - placeholder for future implementation
  const handleCartClick = () => {
    console.log("Cart clicked - implement cart view here");
    // Future implementation: toggle cart sidebar/modal
  };

  if (loading) {
    return (
      <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Items</h2>
          <p className="text-gray-400">Fetching the latest football merchandise...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Items</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchItems}
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
      {/* Fixed Cart Icon Button */}
      <div className="fixed text-white md:top-40 top-37 md:right-40 right-0 z-50 flex flex-col items-center space-y-2">
        <button
          onClick={handleCartClick}
          className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </div>
          )}
        </button>
        <span className="text-sm font-medium">My Cart</span>
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <ShoppingCart className="w-10 h-10 text-yellow-400" />
            <Package className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Football{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Store
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover premium football merchandise, jerseys, and accessories from top teams
          </p>
        </div>

        {/* Search and Filters */}
        <PlayerItemFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          clearFilters={clearFilters}
          filteredItemCount={filteredAndSortedItems.length}
          filterOptions={filterOptions}
        />


        {/* Items Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <PlayerItemCardGrid
            items={filteredAndSortedItems} // array of items
            favorites={favorites} // Set of favorite item IDs
            toggleFavorite={toggleFavorite} // function to toggle favorite
            addToCart={addToCart} // function to add item to cart
            cartLoading={cartLoading} // { [id]: boolean }
            cartSuccess={cartSuccess} // { [id]: boolean }
            formatPrice={formatPrice} // function to format price
            getDiscountedPrice={getDiscountedPrice} // function to calculate discount
          />
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Items Found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Footer */}
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-3xl border border-white/10 text-center">
          <ShoppingCart className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Premium Football Merchandise</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover authentic jerseys, training gear, and accessories from your favorite teams. 
            All items are carefully selected for quality and authenticity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Items;