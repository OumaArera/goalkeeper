import React, { useState } from "react";
import { ShoppingCart, X, LogOut, ListOrdered, Lock } from 'lucide-react';
import useFetchData from "../hooks/useFetchItems";
import { updateData } from "../services/apiServices";
import ErrorScreen from "./ui/ErrorScreen";
import LoadingScreen from "./ui/LoadingScreen";
import { calculateTotal } from "../utils/getTotalStats";
import EmptyState from "./ui/EmptyState";
import handleLogout from "./auth/Lougout";
import CartItemList from "./ui/CartItemList";
import CartSummary from "./ui/CartSummary";
import Orders from "./Orders";
import ChangePassword from "./auth/ChangePassword";

const Cart = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('cart');
  const [removingItemId, setRemovingItemId] = useState(null);
  
  const page = 1;
  const limit = 50;
  const isTokenRequired = true;
  const customerId = localStorage.getItem("customerId");
  
  // Cart items data fetching
  const cartUrl = `carts/customer?page=${page}&limit=${limit}&customerId=${customerId}`;
  const { items: cartItems, loading: cartLoading, error: cartError, fetchItems: fetchCartItems } = useFetchData(cartUrl, isTokenRequired);
  
  // Orders data fetching
  const ordersUrl = `orders?page=${page}&limit=${limit}&customerId=${customerId}`;
  const { items: orderItems, loading: ordersLoading, error: ordersError, fetchItems: fetchOrderItems } = useFetchData(ordersUrl, isTokenRequired);

  // Move the conditional check after hooks
  if (!customerId) return null;

  // Handle item removal
  const handleRemoveItem = async (cartId) => {
    setRemovingItemId(cartId);
    try {
      await updateData(`carts/customer/${cartId}`, { status: 'removed' }, true);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    } finally{
      setRemovingItemId(false);
    }
  };

  // Handle order completion - switch to orders tab and refresh data
  const handleOrderComplete = (orderData) => {
    setActiveTab('orders');
    fetchCartItems();
    fetchOrderItems();
  };

  // Handle change password close - return to cart tab
  const handleChangePasswordClose = () => {
    setActiveTab('cart');
  };

  // Get the appropriate title based on active tab
  const getTitle = () => {
    switch (activeTab) {
      case 'cart':
        return 'Shopping Cart';
      case 'orders':
        return 'My Orders';
      case 'change-password':
        return 'Change Password';
      default:
        return 'Shopping Cart';
    }
  };

  // Get the appropriate subtitle based on active tab
  const getSubtitle = () => {
    switch (activeTab) {
      case 'cart':
        return cartItems ? `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart` : '';
      case 'orders':
        return orderItems ? `${orderItems.length} order${orderItems.length !== 1 ? 's' : ''} found` : '';
      case 'change-password':
        return 'Update your account password';
      default:
        return '';
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] relative transform transition-all animate-in fade-in-0 zoom-in-95 flex flex-col">
        {/* Header - Responsive Layout */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          {/* Top row: Title and Close/Logout buttons */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {getTitle()}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">{getSubtitle()}</p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {/* Action Buttons - Always visible */}
              <button
                onClick={() => handleLogout(onClose)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium hidden xs:inline">Logout</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 sm:w-5 sm:h-5 h-4" />
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs - Responsive */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none justify-center sm:justify-start min-w-0 ${
                activeTab === 'cart'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
            >
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">Cart</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none justify-center sm:justify-start min-w-0 ${
                activeTab === 'orders'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
            >
              <ListOrdered className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('change-password')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none justify-center sm:justify-start min-w-0 ${
                activeTab === 'change-password'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
            >
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">Password</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'cart' ? (
            // Cart Items Content
            <>
              {cartLoading ? (
                <div className="flex items-center justify-center h-64">
                  <LoadingScreen />
                </div>
              ) : cartError ? (
                <div className="flex items-center justify-center h-64">
                  <ErrorScreen error={cartError} onRetry={fetchCartItems} />
                </div>
              ) : !cartItems || cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <EmptyState
                    icon={ShoppingCart}
                    heading="Your cart is empty"
                    message="Add some items to get started!"
                  />
                </div>
              ) : (
                <CartItemList
                  items={cartItems}
                  handleRemoveItem={handleRemoveItem}
                  removingItemId={removingItemId}
                />
              )}
            </>
          ) : activeTab === 'orders' ? (
            // Orders Content
            <Orders 
              items={orderItems}
              loading={ordersLoading}
              error={ordersError}
              fetchItems={fetchOrderItems}
            />
          ) : (
            // Change Password Content
            <div className="p-4 sm:p-6">
              <ChangePassword onclose={handleChangePasswordClose} />
            </div>
          )}
        </div>

        {/* Cart Summary - Only show when on cart tab and items exist */}
        {activeTab === 'cart' && cartItems && cartItems.length > 0 && (
          <CartSummary
            items={cartItems}
            calculateTotal={calculateTotal}
            fetchItems={fetchCartItems}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;