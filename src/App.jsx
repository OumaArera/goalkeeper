import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Dashboard from './components/Dashboard';
import Players from './components/Players';
import Statistics from './components/Statistics';
import Sponsors from './components/Sponsors';
import Leagues from './components/Leagues';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/players" element={<Players />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/leagues" element={<Leagues />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
