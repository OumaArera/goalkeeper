import React, { useState } from "react";
import { Ticket, Users, Search } from "lucide-react";
import { createData } from "../services/apiServices";
import ErrorScreen from "./ui/ErrorScreen";
import LoadingScreen from "./ui/LoadingScreen";
import useFetchData from "../hooks/useFetchItems";
import PaymentConfirmationModal from './ui/PaymentConfirmationModal';
import TicketGrid from "./ui/TicketGrid";
import QueryTicket from "./QueryTicket";
import { formatDate, formatTime } from "../utils/getTotalStats";

const Tickets = () => {
  const [activeTab, setActiveTab] = useState("buy"); // "buy" or "verify"
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  const page = 1;
  const limit = 50;
  const isTokenRequired = false;
  const url = `tickets-repo?page=${page}&limit=${limit}`;

  const { items, loading, error, fetchItems } = useFetchData(url, isTokenRequired);

  // Handle image loading states
  const handleImageLoad = (ticketId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [ticketId]: 'loaded'
    }));
  };

  const handleImageError = (ticketId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [ticketId]: 'error'
    }));
  };

  const handleImageLoadStart = (ticketId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [ticketId]: 'loading'
    }));
  };

  // Handle ticket purchase
  const handleBuyTicket = (ticket, category) => {
    setSelectedTicket(ticket);
    setSelectedCategory(category);
    setShowPaymentModal(true);
    setErrors("");
    setMessage("");
    setPhoneNumber("");
    setFullName("");
  };

  // Process payment
  const placeOrder = async () => {
    if (!phoneNumber.trim() || phoneNumber.length !== 9) {
      setErrors("Please enter a valid 9-digit phone number");
      return;
    }

    setIsProcessing(true);
    setErrors("");
    setMessage("");

    try {
      const payload = {
        eventId: selectedTicket.id,
        phoneNumber: `254${phoneNumber}`,
        category: selectedCategory.category,
        // amount: selectedCategory.price,
        amount: 1,
        fullName: fullName
      };

      const endpoint = 'match-tickets';
      const isTokenRequired = false;
      const response = await createData(endpoint, payload, isTokenRequired);

      if (response.error) {
        throw new Error(response.error || 'Failed to process payment');
      }

      setMessage("Payment request sent! Please check your phone for M-Pesa prompt.");
      setTimeout(() => {
        setShowPaymentModal(false);
        setMessage("");
        setPhoneNumber("");
      }, 3000);

    } catch (error) {
      setErrors(error.message || "Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading && activeTab === "buy") return <LoadingScreen />;
  if (error && activeTab === "buy") return <ErrorScreen error={error} onRetry={fetchItems} />;

  return (
    <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Tabs */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Ticket className="w-10 h-10 text-yellow-400" />
            <Users className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Match{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Tickets
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Get your tickets for the most exciting football matches or verify existing tickets
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/20 backdrop-blur-lg p-2 rounded-2xl border border-white/10">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("buy")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === "buy"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Ticket className="w-5 h-5" />
                  <span>Buy Tickets</span>
                </button>
                <button
                  onClick={() => setActiveTab("verify")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === "verify"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Search className="w-5 h-5" />
                  <span>Verify Ticket</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "buy" ? (
          <>
            {/* Buy Tickets Content */}
            {items && items.length > 0 ? (
              <TicketGrid
                items={items}
                imageLoadingStates={imageLoadingStates}
                handleImageLoad={handleImageLoad}
                handleImageError={handleImageError}
                handleImageLoadStart={handleImageLoadStart}
                handleBuyTicket={handleBuyTicket}
                formatDate={formatDate}
                formatTime={formatTime}
              />
            ) : (
              <div className="text-center py-16">
                <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Tickets Available</h3>
                <p className="text-gray-400">Check back later for upcoming matches</p>
              </div>
            )}

            {/* Footer */}
            <div className="bg-black/30 backdrop-blur-lg p-8 rounded-3xl border border-white/10 text-center mt-12">
              <Ticket className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Premium Match Experience</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Secure your spot for the most exciting football matches. All tickets are authenticated 
                and delivered instantly to your phone via M-Pesa.
              </p>
            </div>
          </>
        ) : (
          /* Verify Ticket Content */
          <div className="relative -top-12">
            <QueryTicket />
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedTicket && selectedCategory && (
        <PaymentConfirmationModal
          setShowPaymentModal={setShowPaymentModal}
          selectedOrder={{
            orderNumber: `${selectedTicket.match.replace(/\s+/g, '').substring(0, 8)}-${Date.now().toString().slice(-4)}`,
            grandTotal: selectedCategory.price,
            match: selectedTicket.match,
            venue: selectedTicket.venue,
            date: selectedTicket.date,
            category: selectedCategory.category,
            fullName: fullName,
            setFullName: setFullName
          }}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isProcessing={isProcessing}
          errors={errors}
          message={message}
          placeOrder={placeOrder}
        />
      )}
    </div>
  );
};

export default Tickets;