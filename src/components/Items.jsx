import React, { useState } from "react";
import { ShoppingCart, Package } from "lucide-react";
import { createData } from "../services/apiServices";
import PlayerItemCardGrid from "./PlayerItemCardGrid";
import PlayerItemFilters from "./PlayerItemFilters";
import useFetchData from "../hooks/useFetchItems";
import { formatPrice, getDiscountedPrice } from '../utils/priceUtils';
import LoadingScreen from '../components/ui/LoadingScreen';
import ErrorScreen from '../components/ui/ErrorScreen';
import { useItemFilters } from '../hooks/useItemFilters';
import AuthOverlay from "./auth/AuthOverlay";
import { isLoggedIn } from "../utils/isLoggedIn";
import Cart from "./Cart";

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("name");
  const [cartSuccess, setCartSuccess] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const page = 1;
  const limit = 50;
  const isTokenRequired = false;
  const url = `items?page=${page}&limit=${limit}`;

  const { items, loading, error, fetchItems } = useFetchData(url, isTokenRequired);


  const { filteredAndSortedItems, filterOptions } = useItemFilters(
    items, searchTerm, selectedCategory, selectedBrand, selectedTeam, priceRange, sortBy
  );

  // Add to cart function
  const addToCart = async (itemId) => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      setShowAuthOverlay(true);
    } else {
      const payload = {itemId}
      const endpoint = 'carts/customer';
      const isTokenRequired = true;
      const response = await createData(endpoint, payload, isTokenRequired);

      if (response.error) {
        throw new Error('Failed to add item to cart');
      }

      setCartSuccess(prev => ({ ...prev, [itemId]: true }));
      setCartItemCount(prev => prev + 1);
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setCartSuccess(prev => {
          const newState = { ...prev };
          delete newState[itemId];
          return newState;
        });
      }, 2000)
    }
    ;
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


  const handleCartClick = async () => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      setShowAuthOverlay(true);
      setShowCart(false);
    } else {
      console.log("Here is Your cart");
      setShowCart(true);
      setShowAuthOverlay(false);
      // Future: open cart sidebar/modal here
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={fetchItems} />;

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
            items={filteredAndSortedItems} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            cartSuccess={cartSuccess}
            formatPrice={formatPrice}
            getDiscountedPrice={getDiscountedPrice}
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
      {showAuthOverlay && (
        <AuthOverlay 
          isVisible={showAuthOverlay}
          onClose={() => setShowAuthOverlay(false)} 
          onLogin={setShowCart}
        />
      )}
      {showCart && (
        <Cart 
          isVisible={showCart}
          onClose={() => setShowCart(false)} 
        />
      )}
    </div>
  );
};

export default Items;