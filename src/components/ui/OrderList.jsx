import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/goalkeeper.jpg';
import { Calendar, Package, CreditCard } from 'lucide-react';
import Pagination from './Pagination';
import { usePagination } from '../../hooks/usePagination';
import OrderFilters from '../../services/OrderFilters';

const OrderList = ({ 
  orders, 
  getStatusColor, 
  getPaymentStatusColor, 
  handlePaymentConfirm,
  itemsPerPage = 2 
}) => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [deliveryMethodFilter, setDeliveryMethodFilter] = useState('');

  // Helper function to filter orders by date
  const filterByDate = (order, filter) => {
    if (!filter) return true;
    
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    
    switch (filter) {
      case 'today':
        return orderDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= weekAgo;
      case 'month':
        return orderDate.getMonth() === now.getMonth() && 
               orderDate.getFullYear() === now.getFullYear();
      case 'quarter':
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const orderQuarter = Math.floor(orderDate.getMonth() / 3);
        return orderQuarter === currentQuarter && 
               orderDate.getFullYear() === now.getFullYear();
      case 'year':
        return orderDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  // Filtered orders based on all filters
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search filter
      const matchesSearch = !searchTerm || 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.itemsPurchased.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.team && item.team.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.playerName && item.playerName.toLowerCase().includes(searchTerm.toLowerCase()))
        );

      // Status filter
      const matchesStatus = !statusFilter || order.status === statusFilter;

      // Payment status filter
      const matchesPaymentStatus = !paymentStatusFilter || order.paymentStatus === paymentStatusFilter;

      // Date filter
      const matchesDate = filterByDate(order, dateFilter);

      // Delivery method filter
      const matchesDeliveryMethod = !deliveryMethodFilter || order.deliveryMethod === deliveryMethodFilter;

      return matchesSearch && matchesStatus && matchesPaymentStatus && 
             matchesDate && matchesDeliveryMethod;
    });
  }, [orders, searchTerm, statusFilter, paymentStatusFilter, dateFilter, deliveryMethodFilter]);

  // Pagination hook
  const pagination = usePagination(filteredOrders, itemsPerPage);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaymentStatusFilter('');
    setDateFilter('');
    setDeliveryMethodFilter('');
    pagination.resetPagination();
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    pagination.resetPagination();
  }, [searchTerm, statusFilter, paymentStatusFilter, dateFilter, deliveryMethodFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        paymentStatusFilter={paymentStatusFilter}
        onPaymentStatusFilterChange={setPaymentStatusFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        deliveryMethodFilter={deliveryMethodFilter}
        onDeliveryMethodFilterChange={setDeliveryMethodFilter}
        onClearFilters={handleClearFilters}
        totalResults={filteredOrders.length}
      />

      {/* Orders List */}
      {pagination.currentData.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {pagination.currentData.map((order) => (
              <div key={order.id} className="p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="w-4 h-4" />
                          <span className="capitalize">{order.deliveryMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">Items Purchased</h4>
                  <div className="space-y-3">
                    {order.itemsPurchased.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                        <img
                          src={logo}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 truncate">{item.name}</h5>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span className="capitalize">{item.category}</span>
                            <span>•</span>
                            <span>{item.brand}</span>
                            <span>•</span>
                            <span>{item.color}</span>
                            <span>•</span>
                            <span>{item.material}</span>
                          </div>
                          {item.team && (
                            <div className="mt-1 text-sm text-blue-600 font-medium">
                              Team: {item.team}
                            </div>
                          )}
                          {item.playerName && (
                            <div className="mt-1 text-sm text-purple-600">
                              Player: {item.playerName} #{item.playerNumber}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            KSh {item.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </div>
                          {item.discount > 0 && (
                            <div className="text-xs text-red-600">
                              {item.discount}% off
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="text-gray-900">
                            KSh {parseFloat(order.totalAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span className="text-gray-900">
                            KSh {parseFloat(order.tax).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="text-gray-900">
                            KSh {parseFloat(order.shippingFee).toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-gray-300 pt-1 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span className="text-gray-900">Grand Total:</span>
                            <span className="text-gray-900">
                              KSh {parseFloat(order.grandTotal).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Method:</span>
                          <span className="text-gray-900">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                        {order.notes && (
                          <div className="mt-2">
                            <span className="text-gray-600">Notes:</span>
                            <p className="text-gray-900 text-xs mt-1">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-300">
                    {order.paymentStatus === 'unpaid' && (
                      <button
                        onClick={() => handlePaymentConfirm(order)}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Confirm Payment</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      <Package className="w-4 h-4" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            onFirstPage={pagination.goToFirstPage}
            onLastPage={pagination.goToLastPage}
            onNextPage={pagination.nextPage}
            onPrevPage={pagination.prevPage}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            totalItems={pagination.totalItems}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            className="border-t border-gray-200"
          />
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter || paymentStatusFilter || dateFilter || deliveryMethodFilter
              ? "Try adjusting your filters to see more results."
              : "No orders have been placed yet."}
          </p>
          {(searchTerm || statusFilter || paymentStatusFilter || dateFilter || deliveryMethodFilter) && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  getStatusColor: PropTypes.func.isRequired,
  getPaymentStatusColor: PropTypes.func.isRequired,
  handlePaymentConfirm: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number
};

export default OrderList;