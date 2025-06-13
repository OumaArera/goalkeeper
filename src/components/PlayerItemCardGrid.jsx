import React, { useState } from 'react';
import {
  Heart,
  Shirt,
  Palette,
  Maximize,
  Loader2,
  CheckCircle,
  ShoppingCart,
} from 'lucide-react';
import logo from '../assets/goalkeeper.jpg';


const PlayerItemCardGrid = ({
  items,
  favorites,
  toggleFavorite,
  addToCart,
  cartSuccess,
  formatPrice,
  getDiscountedPrice,
}) => {

  const [loadingItems, setLoadingItems] = useState(new Set());

  const handleAddToCart = async (itemId) => {
    setLoadingItems(prev => new Set(prev).add(itemId));
    
    try {
      await addToCart(itemId);
    } finally {
      // Reset loading state after a short delay to show the success state
      setTimeout(() => {
        setLoadingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 1000); // Adjust delay as needed
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
      {items.map((item) => {
        const isItemLoading = loadingItems.has(item.id);
        
        return (
          <div
            key={item.id}
            className="bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
              <img
                src={logo}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2MzYzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />

              {item.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{item.discount}%
                </div>
              )}

              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(item.id)
                      ? 'text-red-500 fill-red-500'
                      : 'text-white'
                  }`}
                />
              </button>

              {!item.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-3">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                {item.team && (
                  <div className="flex items-center space-x-2">
                    <Shirt className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300 text-sm">{item.team}</span>
                  </div>
                )}

                {item.color && (
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 text-sm">{item.color}</span>
                  </div>
                )}

                {item.size?.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Maximize className="w-4 h-4 text-green-400" />
                    <div className="flex space-x-1">
                      {item.size.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300"
                        >
                          {s.size} ({s.qty})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  {item.discount > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-green-400">
                        {formatPrice(getDiscountedPrice(item.price, item.discount))}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(item.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {formatPrice(item.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(item.id)}
                disabled={!item.available || isItemLoading}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  !item.available
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : cartSuccess[item.id]
                    ? 'bg-green-500 text-white'
                    : isItemLoading
                    ? 'bg-cyan-400 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transform hover:scale-105'
                }`}
              >
                {isItemLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : cartSuccess[item.id] ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>{item.available ? 'Add to Cart' : 'Out of Stock'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerItemCardGrid;