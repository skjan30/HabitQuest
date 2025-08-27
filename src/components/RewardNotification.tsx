import React, { useEffect, useState } from 'react';
import { Star, Coins } from 'lucide-react';

interface RewardNotificationProps {
  xp: number;
  gold: number;
  onComplete: () => void;
}

export function RewardNotification({ xp, gold, onComplete }: RewardNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <div className="flex items-center space-x-4 text-lg font-bold">
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6" />
            <span>+{xp} XP</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coins className="w-6 h-6" />
            <span>+{gold} Gold</span>
          </div>
        </div>
      </div>
    </div>
  );
}