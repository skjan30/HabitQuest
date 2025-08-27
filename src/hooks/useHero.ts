import { useState, useEffect } from 'react';
import { Hero } from '../types';

const INITIAL_HERO: Hero = {
  name: 'Adventurer',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalXp: 0,
  gold: 0,
  totalQuestsCompleted: 0,
  currentStreak: 0,
  longestStreak: 0,
};

export function useHero() {
  const [hero, setHero] = useState<Hero>(() => {
    const savedHero = localStorage.getItem('habitquest-hero');
    return savedHero ? JSON.parse(savedHero) : INITIAL_HERO;
  });

  useEffect(() => {
    localStorage.setItem('habitquest-hero', JSON.stringify(hero));
  }, [hero]);

  const gainXp = (amount: number) => {
    setHero(prev => {
      const newTotalXp = prev.totalXp + amount;
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      let remainingXp = newXp;
      let xpToNextLevel = prev.xpToNextLevel;

      // Handle level ups
      while (remainingXp >= xpToNextLevel) {
        remainingXp -= xpToNextLevel;
        newLevel++;
        xpToNextLevel = Math.floor(100 * Math.pow(1.2, newLevel - 1));
      }

      return {
        ...prev,
        level: newLevel,
        xp: remainingXp,
        xpToNextLevel: xpToNextLevel,
        totalXp: newTotalXp,
      };
    });
  };

  const gainGold = (amount: number) => {
    setHero(prev => ({ ...prev, gold: prev.gold + amount }));
  };

  const completeQuest = (xpReward: number, goldReward: number) => {
    gainXp(xpReward);
    gainGold(goldReward);
    setHero(prev => ({
      ...prev,
      totalQuestsCompleted: prev.totalQuestsCompleted + 1,
      currentStreak: prev.currentStreak + 1,
      longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
    }));
  };

  return { hero, gainXp, gainGold, completeQuest };
}