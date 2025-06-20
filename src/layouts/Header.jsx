import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { players } from '../data/data';
import { sponsors } from '../data/sponsors';
import NewPlayer from '../components/NewPlayer';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const location = useLocation();

  const calculateStats = () => {
    const uniqueClubs = new Set();
    const uniqueLeagues = new Set();
    
    // Check if players array exists and has data
    if (players && Array.isArray(players)) {
      players.forEach(player => {
        if (player.formerClubs && Array.isArray(player.formerClubs)) {
          player.formerClubs.forEach(club => {
            if (club.name) uniqueClubs.add(club.name);
            if (club.league) uniqueLeagues.add(club.league);
          });
        }
      });
    }

    return {
      goalkeepers: players ? players.length : 0,
      clubs: uniqueClubs.size,
      leagues: uniqueLeagues.size,
      sponsors: sponsors ? sponsors.length : 0
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    document.body.style.overflow = showComingSoonDialog ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showComingSoonDialog]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Players', path: '/players' }, 
    { name: 'Statistics', path: '/statistics' },
    { name: 'Partners', path: '/partners' },
    { name: 'Our Shop', path: '/our-shop' },
    { name: 'Game Tickets', path: '/game-tickets' },
    { name: 'Leagues', path: '/leagues' },
  ];

  // Get active link based on current location
  const getActiveLink = () => {
    const currentPath = location.pathname;
    const activeNavItem = navLinks.find(link => link.path === currentPath);
    return activeNavItem ? activeNavItem.name : 'Home';
  };

  const activeLink = getActiveLink();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAddPlayer = () => {
    setShowComingSoonDialog(true);
  };

  const closeDialog = () => {
    setShowComingSoonDialog(false);
  };

  // Handle ESC key to close dialog
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (showComingSoonDialog) {
          closeDialog();
        } else if (isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showComingSoonDialog, isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`
          w-full fixed top-0 h-36 left-0 right-0 z-50 transition-all duration-300 border-b border-emerald-500/20
          ${isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-emerald-500/10' 
            : 'bg-slate-900/90 backdrop-blur-sm'
          }
        `}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12">
          {/* Main Navigation */}
          <nav className="flex items-center justify-between py-3 lg:py-4">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-14 h-14 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 transform transition-transform group-hover:scale-105">
                <img
                  src={logo}
                  alt="SafeStack Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              {/* Updated to show on all devices */}
              <div className="block">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-400 bg-clip-text text-transparent leading-tight">
                  GOALKEEPERS ALLIANCE
                </h1>
                <p className="hidden md:block text-md sm:text-md text-gray-400 font-medium">
                  Elite Goalkeeper Database & Analytics Platform
                </p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    px-4 py-2 text-xl font-medium rounded-lg transition-all duration-200 relative
                    ${activeLink === link.name 
                      ? 'text-emerald-400 bg-emerald-500/10 shadow-inner' 
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
                    }
                  `}
                >
                  {link.name}
                  {activeLink === link.name && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Action Buttons & Stats */}
            <div className="hidden text-md md:flex items-center ">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleAddPlayer}
                  className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium text-md rounded-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-emerald-600 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  👤 Join Us
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle - Updated with Lucide icons */}
            <button
              className="lg:hidden text-gray-200 focus:outline-none p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Slide-in Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-slate-800/95 backdrop-blur-md border-l border-emerald-500/20 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-emerald-500/20">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-8" alt="SafeStack Logo" />
            <span className="font-bold text-lg text-emerald-400">GOALKEEPERS ALLIANCE</span>
          </div>
          <button onClick={closeMobileMenu}>
            <X className="h-6 w-6 text-gray-200" />
          </button>
        </div>

        <div className="p-6">
          {/* Mobile Navigation Links */}
          <div className="space-y-2 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium block
                  ${activeLink === link.name 
                    ? 'text-emerald-400 bg-emerald-500/10' 
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => {
                handleAddPlayer();
                closeMobileMenu();
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-lg shadow-lg shadow-emerald-500/25"
            >
              👤 Join Us
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* NewPlayer Dialog Overlay */}
      {showComingSoonDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto">
            {/* Close button in top-right corner */}
            <button
              onClick={closeDialog}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-full transition-colors duration-200 backdrop-blur-sm"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Pass close handler to NewPlayer component */}
            <NewPlayer onClose={closeDialog} />
          </div>
        </div>
      )}

      {/* Dialog Backdrop - Click to close */}
      {showComingSoonDialog && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeDialog}
        />
      )}

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Header;