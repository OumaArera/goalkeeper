import React from 'react';
import logo from '../../assets/goalkeeper.jpg';
import { Loader2 } from 'lucide-react';

const CartItemList = ({ items = [], handleRemoveItem, removingItemId }) => {
  return (
    <div className="divide-y divide-gray-200">
      {items.map((cartItem) => (
        <div key={cartItem.id} className="p-6 flex items-center space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt={cartItem.item.name}
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {cartItem.item.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {cartItem.item.description}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span className="capitalize">{cartItem.item.category}</span>
              <span>•</span>
              <span>{cartItem.item.brand}</span>
              <span>•</span>
              <span>{cartItem.item.color}</span>
              <span>•</span>
              <span>{cartItem.item.material}</span>
            </div>
            {cartItem.item.team && (
              <div className="mt-1 text-sm text-blue-600 font-medium">
                Team: {cartItem.item.team}
              </div>
            )}

            {/* Available Sizes */}
            {cartItem.item.size && cartItem.item.size.length > 0 && (
              <div className="mt-2">
                <span className="text-sm text-gray-600">Available sizes: </span>
                {cartItem.item.size.map((sizeInfo, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-1"
                  >
                    {sizeInfo.size} ({sizeInfo.qty} left)
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col items-end space-y-2">
            <div className="text-right">
              {cartItem.item.discount > 0 ? (
                <div>
                  <span className="text-lg font-bold text-red-600">
                    KSh {(cartItem.item.price * (1 - cartItem.item.discount / 100)).toLocaleString()}
                  </span>
                  <div className="text-sm text-gray-500 line-through">
                    KSh {cartItem.item.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-red-600">
                    {cartItem.item.discount}% off
                  </div>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  KSh {cartItem.item.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                cartItem.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : cartItem.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {cartItem.status}
            </span>

            {/* Remove Button */}
            {removingItemId === cartItem.id ? (
              <div className="flex items-center justify-center w-5 h-5">
                <Loader2 className="animate-spin w-4 h-4 text-red-600" />
              </div>
            ) : (
              <button
                onClick={() => handleRemoveItem(cartItem.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
