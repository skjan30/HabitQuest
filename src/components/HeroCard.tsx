import React from 'react';
import { Sword, Crown, Coins, Trophy } from 'lucide-react';
import { Hero } from '../types';

interface HeroCardProps {
  hero: Hero;
}

export function HeroCard({ hero }: HeroCardProps) {
  const xpPercentage = (hero.xp / hero.xpToNextLevel) * 100;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-2xl border border-purple-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{hero.name}</h2>
              <p className="text-purple-200 text-sm">Level {hero.level} Adventurer</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold">{hero.gold}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-green-400" />
              <span className="font-semibold">{hero.totalQuestsCompleted}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Experience</span>
              <span>{hero.xp} / {hero.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-black/20 rounded-lg p-3 text-center border border-white/10">
              <div className="text-lg font-bold text-green-400">{hero.currentStreak}</div>
              <div className="text-xs text-gray-300">Current Streak</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3 text-center border border-white/10">
              <div className="text-lg font-bold text-yellow-400">{hero.longestStreak}</div>
              <div className="text-xs text-gray-300">Best Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}