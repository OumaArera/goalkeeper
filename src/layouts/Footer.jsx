import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { footerLinks, socialLinks, stats } from '../utils/footerRefs';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();


  return (
    <footer className="relative bottom-0 -top-8 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-emerald-500/20">
      {/* Stats Section */}
      <div className="border-b border-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="text-center mb-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-4">
              Growing the Goalkeeper Community
            </h3>
            <p className="text-gray-400 text-lg sm:text-md lg:text-xl max-w-4xl mx-auto leading-relaxed">
              Join thousands of goalkeepers, coaches, and clubs in the world's largest goalkeeper database and analytics platform.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-emerald-400 mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium text-base sm:text-lg lg:text-md">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 transform transition-transform hover:scale-105">
                <div className="w-14 h-14 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 transform transition-transform group-hover:scale-105">
                  <img
                  src={logo}
                  alt="SafeStack Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  GOALKEEPERS ALLIANCE
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400">Elite Goalkeeper Platform</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed">
              The premier platform for goalkeeper analytics, scouting, and development. 
              Empowering goalkeepers, coaches, and clubs with data-driven insights and comprehensive player profiles.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 text-base sm:text-lg lg:text-xl bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                />
                <button className="px-8 py-3 text-base sm:text-lg lg:text-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-lg hover:from-emerald-500 hover:to-emerald-600 transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-emerald-500/25">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(social.href)}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-slate-800/50 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/50 rounded-xl flex items-center justify-center transition-all duration-200 group shadow-lg hover:shadow-emerald-500/25"
                    title={social.name}
                  >
                    <social.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400 group-hover:text-white transition-all duration-200 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Platform Links */}
            <div>
              <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Platform</h4>
              <ul className="space-y-4">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-400 hover:text-emerald-400 text-base sm:text-lg lg:text-xl transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Resources</h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-400 hover:text-emerald-400 text-base sm:text-lg lg:text-xl transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-400 hover:text-emerald-400 text-base sm:text-lg lg:text-xl transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-400 hover:text-emerald-400 text-base sm:text-lg lg:text-xl transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                © {currentYear} Goalkeepers Alliance. All rights reserved.
              </p>
            </div>
            
            {/* Developer Credit */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm sm:text-base lg:text-lg">
                  Developed and Maintained by
                </span>
              </div>
              <a 
                href="https://safestack.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 hover:underline"
              >
                SafeStack Technologies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;