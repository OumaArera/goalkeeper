import React, { useState, useMemo } from "react";
import { BarChart3, TrendingUp, Shield, Target, Users, Activity} from "lucide-react";
import { calculateAge, getTotalStats } from "../utils/statsUtil";

const OverviewStats = ({ players }) => {
  const stats = useMemo(() => {
    const totalPlayers = players.length;
    const avgAge = players.reduce((sum, p) => sum + calculateAge(p.bioData.dateOfBirth), 0) / totalPlayers;
    const totalAppearances = players.reduce((sum, p) => sum + getTotalStats(p).totalAppearances, 0);
    const totalCleanSheets = players.reduce((sum, p) => sum + getTotalStats(p).totalCleanSheets, 0);
    const avgCleanSheetRate = (totalCleanSheets / totalAppearances * 100) || 0;
    
    return {
      totalPlayers,
      avgAge: Math.round(avgAge * 10) / 10,
      totalAppearances,
      totalCleanSheets,
      avgCleanSheetRate: Math.round(avgCleanSheetRate * 10) / 10
    };
  }, [players]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Users className="w-8 h-8 text-cyan-400" />
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{stats.totalPlayers}</div>
        <div className="text-gray-400 text-sm">Total Players</div>
      </div>

      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Activity className="w-8 h-8 text-purple-400" />
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{stats.avgAge}</div>
        <div className="text-gray-400 text-sm">Average Age</div>
      </div>

      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <BarChart3 className="w-8 h-8 text-green-400" />
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{stats.totalAppearances}</div>
        <div className="text-gray-400 text-sm">Total Appearances</div>
      </div>

      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Shield className="w-8 h-8 text-emerald-400" />
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{stats.totalCleanSheets}</div>
        <div className="text-gray-400 text-sm">Total Clean Sheets</div>
      </div>

      <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Target className="w-8 h-8 text-yellow-400" />
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{stats.avgCleanSheetRate}%</div>
        <div className="text-gray-400 text-sm">Clean Sheet Rate</div>
      </div>
    </div>
  );
};

export default OverviewStats;