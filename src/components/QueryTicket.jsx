import React, { useState } from "react";
import { Search, Download, CheckCircle, XCircle, Ticket } from "lucide-react";
import { createData } from "../services/apiServices";
import LoadingScreen from "./ui/LoadingScreen";
import { validateTicketNumber, generatePDF } from "../utils/ticketUtils";

const QueryTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  

  const handleTicketNumberChange = (value) => {
    const upperValue = value.toUpperCase();
    setTicketNumber(upperValue);
    
    if (upperValue) {
      const validation = validateTicketNumber(upperValue);
      setValidationError(validation || "");
    } else {
      setValidationError("");
    }
  };

  const verifyTicket = async () => {
    if (!ticketNumber.trim()) {
      setValidationError("Please enter a ticket number");
      return;
    }

    const validation = validateTicketNumber(ticketNumber);
    if (validation) {
      setValidationError(validation);
      return;
    }

    setLoading(true);
    setError("");
    setValidationError("");
    
    const endpoint = "match-tickets/verify";
    try {
      const response = await createData(endpoint, { ticketNumber }, false);

      if (!response.error) {
        setTicket(response.data);
      } else {
        setError("Invalid Ticket!");
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      setError("Failed to verify ticket. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };


  const resetQuery = () => {
    setTicket(null);
    setTicketNumber("");
    setError("");
    setValidationError("");
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Search className="w-10 h-10 text-cyan-400" />
            <Ticket className="w-8 h-8 text-yellow-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Verify{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ticket
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter your ticket number to verify and download your match ticket
          </p>
        </div>

        {!ticket ? (
          /* Search Form */
          <div className="bg-black/20 backdrop-blur-lg p-8 rounded-3xl border border-white/10 mb-8">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Ticket Number
                </label>
                <input
                  type="text"
                  value={ticketNumber}
                  onChange={(e) => handleTicketNumberChange(e.target.value)}
                  placeholder="e.g., TKT250618ABC123"
                  maxLength={15}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                />
                <div className="mt-2 text-sm text-gray-400">
                  Format: TKT + YYMMDD + 6 random characters (15 total)
                </div>
              </div>

              {validationError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {validationError}
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={verifyTicket}
                disabled={loading || !ticketNumber || validationError}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Verify Ticket</span>
              </button>
            </div>
          </div>
        ) : (
          /* Ticket Results */
          <div className="space-y-6">
            {ticket.paymentStatus === "completed" && ticket.status === "paid" ? (
              /* Valid Ticket */
              <div className="bg-black/20 backdrop-blur-lg p-8 rounded-3xl border border-green-500/30">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                  <h2 className="text-3xl font-bold text-white">Valid Ticket</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Ticket Number</div>
                      <div className="text-white font-mono text-lg">{ticket.ticketNumber}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Full Name</div>
                      <div className="text-white font-semibold">{ticket.fullName}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Category</div>
                      <div className="text-white font-semibold">{ticket.category}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Amount</div>
                      <div className="text-white font-semibold">KSH {ticket.amount.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Phone Number</div>
                      <div className="text-white font-semibold">{ticket.phoneNumber}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Status</div>
                      <div className="text-green-400 font-semibold flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Paid & Valid</span>
                      </div>
                    </div>
                  </div>
                </div>

                {ticket.qrCode && (
                  <div className="text-center mb-8">
                    <div className="text-gray-400 text-sm mb-3">QR Code for Entry</div>
                    <img 
                      src={ticket.qrCode} 
                      alt="QR Code" 
                      className="mx-auto border-2 border-white/20 rounded-lg"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={()=>generatePDF(ticket)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Ticket PDF</span>
                  </button>
                  <button
                    onClick={resetQuery}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-white/20"
                  >
                    Verify Another Ticket
                  </button>
                </div>
              </div>
            ) : (
              /* Invalid Ticket */
              <div className="bg-black/20 backdrop-blur-lg p-8 rounded-3xl border border-red-500/30">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <XCircle className="w-12 h-12 text-red-400" />
                  <h2 className="text-3xl font-bold text-white">Invalid Ticket</h2>
                </div>

                <div className="text-center mb-8">
                  <p className="text-gray-300 text-lg mb-4">
                    This ticket is not valid for entry. The payment may have failed or the ticket may have been cancelled.
                  </p>
                  <div className="bg-red-500/20 p-4 rounded-xl inline-block">
                    <div className="text-red-300 font-semibold">
                      Status: {ticket.paymentStatus} | {ticket.status}
                    </div>
                    {ticket.statusMessage && (
                      <div className="text-red-300 text-sm mt-1">
                        {ticket.statusMessage}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={resetQuery}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-white/20"
                  >
                    Verify Another Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryTicket;