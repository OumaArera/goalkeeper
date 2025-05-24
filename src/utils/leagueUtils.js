import { Trophy, MapPin, Users, Search, Filter, Globe, Crown, Award, Star, Target, Calendar } from "lucide-react";

export const getLeagueTier = (leagueName) => {
    const name = leagueName.toLowerCase();
    if (name.includes('premier')) return 'premier';
    if (name.includes('cup') || name.includes('mozzart')) return 'cup';
    if (name.includes('super league')) return 'super';
    if (name.includes('division one')) return 'div1';
    if (name.includes('division two')) return 'div2';
    return 'other';
  };

  // Get appropriate icon and colors for league type
export const getLeagueStyle = (leagueName) => {
    const tier = getLeagueTier(leagueName);
    const styles = {
      premier: { 
        icon: Crown, 
        gradient: 'from-yellow-400 to-orange-500',
        bg: 'from-yellow-500/20 to-orange-500/20',
        border: 'border-yellow-400/30'
      },
      cup: { 
        icon: Trophy, 
        gradient: 'from-purple-400 to-pink-500',
        bg: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-400/30'
      },
      super: { 
        icon: Star, 
        gradient: 'from-cyan-400 to-blue-500',
        bg: 'from-cyan-500/20 to-blue-500/20',
        border: 'border-cyan-400/30'
      },
      div1: { 
        icon: Target, 
        gradient: 'from-green-400 to-emerald-500',
        bg: 'from-green-500/20 to-emerald-500/20',
        border: 'border-green-400/30'
      },
      div2: { 
        icon: Users, 
        gradient: 'from-slate-400 to-slate-500',
        bg: 'from-slate-500/20 to-slate-500/20',
        border: 'border-slate-400/30'
      },
      other: { 
        icon: Award, 
        gradient: 'from-cyan-400 to-purple-400',
        bg: 'from-cyan-500/20 to-purple-500/20',
        border: 'border-cyan-400/30'
      }
    };
    return styles[tier];
  };