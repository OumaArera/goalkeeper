import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Dashboard from './components/Dashboard';
import Players from './components/Players';
import Statistics from './components/Statistics';
import Partners from './components/Partners';
import Leagues from './components/Leagues';
import Items from './components/Items';
import useAutoLogout from './hooks/useAutoLogout';
import Tickets from './components/Tickets';


function App() {
  useAutoLogout()

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/players" element={<Players />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/our-shop" element={<Items />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/game-tickets" element={<Tickets />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
