import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckoutModal from './CheckoutModal';

const CartSummary = ({ items, calculateTotal, fetchItems, onOrderComplete }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  if (!items || items.length === 0) return null;

  const handleOrderComplete = (orderData) => {
    // Switch to orders tab and refresh cart
    fetchItems();
    if (onOrderComplete) {
      onOrderComplete(orderData);
    }
  };

  // Calculate totals with tax and delivery fee
  const calculateTotals = () => {
    const subtotal = calculateTotal(items);
    const tax = Math.round(subtotal * 0.16); // 16% tax
    const deliveryFee = 50; // pickup delivery fee
    const grandTotal = subtotal + tax + deliveryFee;
    
    return { subtotal, tax, deliveryFee, grandTotal };
  };

  const totals = calculateTotals();

  return (
    <>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
        {/* Items Summary */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">
            Cart Summary ({items.length} item{items.length !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Breakdown */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">KSh {totals.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (16%):</span>
            <span className="font-medium">KSh {totals.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pickup Fee:</span>
            <span className="font-medium">KSh {totals.deliveryFee.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-gray-900">
              KSh {totals.grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCheckout(true)}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={fetchItems}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Refresh Cart
          </button>
        </div>
      </div>

      <CheckoutModal 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={items}
        onOrderComplete={handleOrderComplete}
      />
    </>
  );
};

CartSummary.propTypes = {
  items: PropTypes.array.isRequired,
  calculateTotal: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  onOrderComplete: PropTypes.func,
};

export default CartSummary;