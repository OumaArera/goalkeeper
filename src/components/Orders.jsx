import React, { useState } from "react";
import { ListOrdered } from 'lucide-react';
import { createData } from "../services/apiServices";
import ErrorScreen from "./ui/ErrorScreen";
import LoadingScreen from "./ui/LoadingScreen";
import EmptyState from "./ui/EmptyState";
import OrderList from "./ui/OrderList";
import PaymentConfirmationModal from './ui/PaymentConfirmationModal';
import { getStatusColor, getPaymentStatusColor } from "../utils/getTotalStats";

const Orders = ({ items, loading, error, fetchItems }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // console.log("Orders: ", items);

  const handlePaymentConfirm = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
    setPhoneNumber('');
    setErrors(null);
    setMessage(null);
  };

  const placeOrder = async () => {
    if (!selectedOrder || !phoneNumber.trim() || phoneNumber.length !== 9) {
      setErrors("Please enter a valid 9-digit phone number");
      setTimeout(() => setErrors(null), 5000);
      return;
    }

    setIsProcessing(true);
    
    // Construct complete phone number with 254 prefix
    const completePhoneNumber = `254${phoneNumber.trim()}`;
    
    const payload = {
      orderId: selectedOrder.id,
      phoneNumber: completePhoneNumber,
      amount: parseFloat(selectedOrder.grandTotal)
    };

    try {
      const endpoint = "payments/pay";
      const response = await createData(endpoint, payload, true);

      if (response.error) {
        setErrors(response.error);
        setTimeout(() => setErrors(null), 5000);
      } else {
        setMessage("Payment initiated successfully. Check your phone for M-Pesa prompt.");
        setTimeout(() => {
          setMessage(null);
          setShowPaymentModal(false);
          setSelectedOrder(null);
          fetchItems(); // Refresh orders
        }, 3000);
      }
    } catch (error) {
      setErrors("Failed to process payment. Please try again.");
      setTimeout(() => setErrors(null), 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Content Area - No overlay/modal wrapper */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingScreen />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <ErrorScreen error={error} onRetry={fetchItems} />
          </div>
        ) : !items || items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <EmptyState
              icon={ListOrdered}
              heading="No orders found"
              message="You haven't placed any orders yet!"
            />
          </div>
        ) : (
          <OrderList
            orders={items}
            getStatusColor={getStatusColor}
            getPaymentStatusColor={getPaymentStatusColor}
            handlePaymentConfirm={handlePaymentConfirm}
          />
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedOrder && (
        <PaymentConfirmationModal
          setShowPaymentModal={setShowPaymentModal}
          selectedOrder={selectedOrder}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isProcessing={isProcessing}
          errors={errors}
          message={message}
          placeOrder={placeOrder}
        />
      )}
    </>
  );
};

export default Orders;