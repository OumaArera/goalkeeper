import React from 'react';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import logo from '../../assets/goalkeeper.jpg';

const TicketGrid = ({
  items = [],
  imageLoadingStates = {},
  handleImageLoad,
  handleImageError,
  handleImageLoadStart,
  handleBuyTicket,
  formatDate,
  formatTime,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
      {items.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl"
        >
          {/* Match Image */}
          <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-700">
            {imageLoadingStates[ticket.id] === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {imageLoadingStates[ticket.id] === 'error' ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Image not available</p>
                </div>
              </div>
            ) : (
              <img
                src={logo}
                alt={ticket.match}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoadingStates[ticket.id] === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(ticket.id)}
                onError={() => handleImageError(ticket.id)}
                onLoadStart={() => handleImageLoadStart(ticket.id)}
              />
            )}

            {/* Availability Badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  ticket.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {ticket.available ? 'Available' : 'Sold Out'}
              </span>
            </div>
          </div>

          {/* Match Details */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">{ticket.match}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                <span className="text-sm">{ticket.venue}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm">{formatDate(ticket.date)}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">{formatTime(ticket.date)}</span>
              </div>
            </div>

            {/* Ticket Categories */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white mb-3">Ticket Categories</h4>
              {ticket.categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        category.category === 'VVIP'
                          ? 'bg-yellow-400'
                          : category.category === 'VIP'
                          ? 'bg-purple-400'
                          : 'bg-cyan-400'
                      }`}
                    ></div>
                    <span className="text-white font-medium">{category.category}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-green-400">
                      KSh {category.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleBuyTicket(ticket, category)}
                      disabled={!ticket.available}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        ticket.available
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white hover:scale-105'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {ticket.available ? 'Buy Now' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketGrid;
