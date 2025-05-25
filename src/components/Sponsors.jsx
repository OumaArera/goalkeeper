import React from "react";
import { Heart, Sparkles, Award, Users } from "lucide-react";
import { sponsors } from "../data/sponsors";

const Sponsors = () => {
  return (
    <div className="relative -top-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      {/* Background Effects */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="w-8 h-8 text-red-400 animate-pulse" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Our Amazing
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sponsors
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Proudly supported by industry-leading partners who believe in excellence and innovation
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-lg">{sponsors.length} Partners</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="text-lg">Trusted Support</span>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="bg-black/30 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/10 mb-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A Heartfelt Thank You
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Our sponsors are more than partners—they're champions of our vision. Their unwavering support 
              enables us to showcase exceptional goalkeeper talent, advance sports analytics, and build bridges 
              between emerging players and professional opportunities.
            </p>
            <div className="flex items-center justify-center space-x-2 text-emerald-400">
              <Heart className="w-6 h-6 fill-current" />
              <span className="text-lg font-semibold">Made possible by their generous support</span>
              <Heart className="w-6 h-6 fill-current" />
            </div>
          </div>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="group bg-black/30 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              {/* Logo Container */}
              <div className="bg-white/5 rounded-xl p-6 mb-6 flex items-center justify-center min-h-[120px] group-hover:bg-white/10 transition-colors duration-300">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-16 object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              
              {/* Sponsor Name */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {sponsor.name}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Partnership Benefits Section */}
        <div className="bg-black/30 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Our Partners Choose Us
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                We maintain the highest standards in goalkeeper analysis and player development, 
                ensuring our partners are associated with quality and professionalism.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Community</h3>
              <p className="text-gray-300 leading-relaxed">
                Join a thriving community of sports enthusiasts, professionals, and emerging talent 
                that spans across multiple leagues and continents.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-300 leading-relaxed">
                Be part of cutting-edge sports technology and analytics that's shaping the future 
                of goalkeeper evaluation and player scouting.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Interested in Partnership?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our family of sponsors and be part of something extraordinary. Together, we can elevate 
              the beautiful game and support the next generation of goalkeeping talent.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;