import React from 'react';
import PropTypes from 'prop-types';

const CartSummary = ({ items, calculateTotal, fetchItems }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-lg font-semibold text-gray-900">
            Total ({items.length} item{items.length !== 1 ? 's' : ''})
          </span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">
            KSh {calculateTotal(items).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
  );
};

CartSummary.propTypes = {
  items: PropTypes.array.isRequired,
  calculateTotal: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

export default CartSummary;
