import React from 'react';
import { X, Phone, CreditCard } from 'lucide-react';

const PaymentConfirmationModal = ({
  setShowPaymentModal,
  selectedOrder,
  phoneNumber,
  setPhoneNumber,
  isProcessing,
  errors,
  message,
  placeOrder,
}) => {
  if (!selectedOrder) return null;

  // Handle phone number input - only allow digits and prevent + symbol
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    // Prevent + symbol and any non-digit characters
    if (value.includes('+') || /[^0-9]/.test(value)) {
      return;
    }
    
    // Limit to 9 digits (since 254 is predefined)
    if (value.length <= 9) {
      setPhoneNumber(value);
    }
  };

  // Format the complete phone number for display and submission
  const getCompletePhoneNumber = () => {
    return phoneNumber ? `254${phoneNumber}` : '254';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in fade-in-0 zoom-in-95">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Confirm Payment</h3>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-900">#{selectedOrder.orderNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Amount to Pay:</span>
              <span className="text-lg font-bold text-green-600">
                KSh {parseFloat(selectedOrder.grandTotal).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              M-Pesa Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">254</span>
              </div>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="712345678"
                className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isProcessing}
                maxLength={9}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter the remaining 9 digits (e.g., 712345678)
            </p>
            {phoneNumber && (
              <p className="text-xs text-gray-600 mt-1">
                Complete number: <span className="font-medium">{getCompletePhoneNumber()}</span>
              </p>
            )}
          </div>

          {/* Error Message */}
          {errors && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors}</p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              onClick={placeOrder}
              disabled={isProcessing || !phoneNumber.trim() || phoneNumber.length !== 9}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;