import React, { useState } from 'react';
import { X, Minus, Plus, Loader2, MapPin, Truck } from 'lucide-react';
import { handlePlaceOrder } from '../../utils/handlePlaceOrder';

const CheckoutModal = ({ isOpen, onClose, cartItems, onOrderComplete }) => {
  // Use cart ID as the unique identifier instead of item ID
  const [orderItems, setOrderItems] = useState(() => 
    cartItems.map(cartItem => ({
      ...cartItem.item,
      cartId: cartItem.id, // Add cart ID to distinguish between same items
      quantity: 1
    }))
  );
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [location, setLocation] = useState('nairobi');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update quantity using cartId instead of item.id
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems(prev => 
      prev.map(item => 
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotals = () => {
    const totalAmount = orderItems.reduce((sum, item) => {
      const discountedPrice = item.discount > 0 
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return sum + (discountedPrice * item.quantity);
    }, 0);
    const tax = Math.round(totalAmount * 0.16);
    
    let shippingFee = 50; // pickup default
    if (deliveryMethod === 'delivery') {
      shippingFee = location === 'nairobi' ? 200 : 1000;
    }
    
    const grandTotal = totalAmount + tax + shippingFee;
    
    return { totalAmount, tax, shippingFee, grandTotal };
  };

  const handleSubmitOrder = async () => {
    const cartIds = cartItems.map(item => item.id);
    
    // Add delivery method and notes to order items
    const finalOrderItems = orderItems.map(item => ({
      ...item,
      deliveryMethod,
      ...(notes && { notes })
    }));
    
    const result = await handlePlaceOrder(
      finalOrderItems, 
      cartIds, 
      setIsLoading,
      onOrderComplete
    );
    
    if (result.success) {
      onClose();
    }
  };

  const totals = calculateTotals();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Items with Quantity */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
            {orderItems.map((item) => (
              <div key={item.cartId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.team && `Team: ${item.team}`}</p>
                  {item.discount > 0 ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 line-through">
                        KSh {item.price.toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-red-600">
                        KSh {(item.price * (1 - item.discount / 100)).toLocaleString()}
                      </span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        {item.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">KSh {item.price.toLocaleString()}</p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Method */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Delivery Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                  deliveryMethod === 'pickup' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Pickup</div>
                  <div className="text-sm text-gray-600">KSh 50</div>
                </div>
              </button>
              <button
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                  deliveryMethod === 'delivery' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Truck className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Delivery</div>
                  <div className="text-sm text-gray-600">KSh 200-1000</div>
                </div>
              </button>
            </div>
          </div>

          {/* Location (if delivery) */}
          {deliveryMethod === 'delivery' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Location</h3>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="nairobi">Nairobi (KSh 200)</option>
                <option value="outside">Outside Nairobi (KSh 1000)</option>
              </select>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Order Notes (Optional)</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions or notes..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>KSh {totals.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (16%):</span>
              <span>KSh {totals.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span>KSh {totals.shippingFee.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>KSh {totals.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitOrder}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;