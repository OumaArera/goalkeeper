import React, { useState } from "react";
import { ShoppingCart, X, LogOut, ListOrdered } from 'lucide-react';
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

const Cart = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('cart');
  
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
    try {
      await updateData(`carts/customer/${cartId}`, { status: 'removed' }, true);
      fetchCartItems(); // Refresh the cart data
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] relative transform transition-all animate-in fade-in-0 zoom-in-95 flex flex-col">
        {/* Header with Close and Logout buttons */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab === 'cart' ? 'Shopping Cart' : 'My Orders'}
            </h2>
            {activeTab === 'cart' && cartItems && (
              <p className="text-gray-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
            )}
            {activeTab === 'orders' && orderItems && (
              <p className="text-gray-600 mt-1">{orderItems.length} order{orderItems.length !== 1 ? 's' : ''} found</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'cart'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Cart Items</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'orders'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span className="text-sm font-medium">Orders</span>
            </button>
            <button
              onClick={() => handleLogout(onClose)}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
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
                />
              )}
            </>
          ) : (
            // Orders Content
            <Orders 
              items={orderItems}
              loading={ordersLoading}
              error={ordersError}
              fetchItems={fetchOrderItems}
            />
          )}
        </div>

        {/* Cart Summary - Only show when on cart tab and items exist */}
        {activeTab === 'cart' && cartItems && cartItems.length > 0 && (
          <CartSummary
            items={cartItems}
            calculateTotal={calculateTotal}
            fetchItems={fetchCartItems}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;