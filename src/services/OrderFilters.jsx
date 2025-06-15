import React from 'react';
import PropTypes from 'prop-types';
import { Search, Filter, X, Calendar } from 'lucide-react';

const OrderFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentStatusFilter,
  onPaymentStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  deliveryMethodFilter,
  onDeliveryMethodFilterChange,
  onClearFilters,
  totalResults,
  className = ""
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const paymentStatusOptions = [
    { value: '', label: 'All Payment Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const deliveryMethodOptions = [
    { value: '', label: 'All Methods' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'pickup', label: 'Pickup' },
  ];

  const dateFilterOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const hasActiveFilters = searchTerm || statusFilter || paymentStatusFilter || dateFilter || deliveryMethodFilter;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Filter Orders</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Orders
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="search"
              type="text"
              placeholder="Search by order number, customer, or item..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Order Status Filter */}
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Order Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Status Filter */}
        <div>
          <label htmlFor="payment-status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Status
          </label>
          <select
            id="payment-status-filter"
            value={paymentStatusFilter}
            onChange={(e) => onPaymentStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {paymentStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline w-4 h-4 mr-1" />
            Date Range
          </label>
          <select
            id="date-filter"
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {dateFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Method Filter - Only show on larger screens */}
        <div className="lg:block hidden">
          <label htmlFor="delivery-method-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Method
          </label>
          <select
            id="delivery-method-filter"
            value={deliveryMethodFilter}
            onChange={(e) => onDeliveryMethodFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {deliveryMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {totalResults === 0 ? (
            "No orders found matching your criteria"
          ) : (
            <>
              Showing {totalResults} order{totalResults !== 1 ? 's' : ''}
              {hasActiveFilters && " matching your filters"}
            </>
          )}
        </p>
      </div>

      {/* Mobile Delivery Method Filter */}
      <div className="lg:hidden mt-4">
        <label htmlFor="delivery-method-filter-mobile" className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Method
        </label>
        <select
          id="delivery-method-filter-mobile"
          value={deliveryMethodFilter}
          onChange={(e) => onDeliveryMethodFilterChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {deliveryMethodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

OrderFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onStatusFilterChange: PropTypes.func.isRequired,
  paymentStatusFilter: PropTypes.string.isRequired,
  onPaymentStatusFilterChange: PropTypes.func.isRequired,
  dateFilter: PropTypes.string.isRequired,
  onDateFilterChange: PropTypes.func.isRequired,
  deliveryMethodFilter: PropTypes.string.isRequired,
  onDeliveryMethodFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default OrderFilters;