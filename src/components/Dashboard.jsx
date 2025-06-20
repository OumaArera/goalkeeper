import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, Trophy, Target, ArrowRight, Star, Shield, Award, ShoppingCart, Heart } from "lucide-react";
import { players } from "../data/data";
import landing_goalkeeper from "../assets/landing_goalkeeper.jpeg";


const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { label: 'Total Players', value: players.length, icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'International Caps', value: players.reduce((sum, p) => sum + p.bioData.internationalCaps, 0), icon: Star, color: 'from-purple-500 to-pink-500' },
    { label: 'Clean Sheets', value: '152', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { label: 'Awards Won', value: '24', icon: Award, color: 'from-orange-500 to-red-500' }
  ];

  const features = [
    {
      title: 'Player Profiles',
      description: 'Comprehensive player data including bio, stats, and career history',
      icon: Users,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Performance Analytics',
      description: 'Advanced statistics and performance metrics for data-driven insights',
      icon: BarChart3,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Achievement Tracking',
      description: 'Monitor awards, honors, and career milestones of each player',
      icon: Trophy,
      gradient: 'from-pink-600 to-red-600'
    }
  ];

  return (
    <div className="relative -top-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Elite Goalkeeper
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Management
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive player management system featuring detailed analytics, 
                performance tracking, and career progression monitoring for professional goalkeepers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/our-shop')}
                  className="group bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 ring-2 ring-green-400/30"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Support Our Goalkeepers</span>
                    <Heart className="w-4 h-4 text-red-300" />
                  </span>
                </button>
                <button 
                  onClick={() => navigate('/players')}
                  className="group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Explore Players</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-black/30 backdrop-blur-lg rounded-3xl p-2 border border-white/20">
                  <img
                    src={landing_goalkeeper}
                    alt="Goalkeeper"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Support Section */}
      <section className="relative z-10 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-400/30 hover:border-green-400/50 transition-all duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Support Our Elite Goalkeepers
                </h2>
                <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
                  Every purchase directly supports the development, training, and career advancement of our professional goalkeepers. 
                  Your contribution helps them reach new heights in their football journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                  <button 
                    onClick={() => navigate('/our-shop')}
                    className="group bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 ring-2 ring-green-400/40"
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <ShoppingCart className="w-6 h-6" />
                      <span>Shop & Support Now</span>
                      <Heart className="w-5 h-5 text-red-300 animate-pulse" />
                    </span>
                  </button>
                  <div className="flex items-center space-x-2 text-green-300">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">100% goes to goalkeeper development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`transform transition-all duration-700 delay-${index * 100 + 600} ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage and analyze professional football players
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group transform transition-all duration-700 delay-${index * 200 + 800} ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Discover detailed player profiles, advanced statistics, and comprehensive performance analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/our-shop')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 ring-1 ring-green-400/30"
              >
                <span className="flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Support Goalkeepers</span>
                </span>
              </button>
              <button 
                onClick={() => navigate('/players')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Browse Players
              </button>
              <button 
                onClick={() => navigate('/statistics')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;