import React, { useState, useEffect } from 'react';
import { Bell, X, Clock } from 'lucide-react';
import { Quest } from '../types';

interface NotificationBannerProps {
  quests: Quest[];
}

export function NotificationBanner({ quests }: NotificationBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [uncompletedQuests, setUncompletedQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Show banner in the evening for uncompleted daily quests
    if (currentHour >= 17) {
      const uncompleted = quests.filter(q => q.type === 'daily' && !q.completed);
      if (uncompleted.length > 0) {
        setUncompletedQuests(uncompleted);
        setShowBanner(true);
      }
    }

    // Check for uncompleted weekly quests on Sunday evening
    if (now.getDay() === 0 && currentHour >= 17) {
      const uncompletedWeekly = quests.filter(q => q.type === 'weekly' && !q.completed);
      if (uncompletedWeekly.length > 0) {
        setUncompletedQuests(prev => [...prev, ...uncompletedWeekly]);
        setShowBanner(true);
      }
    }
  }, [quests]);

  if (!showBanner || uncompletedQuests.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 shadow-2xl border border-orange-400/50 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Quest Reminder!</h3>
              <p className="text-xs opacity-90">
                You have {uncompletedQuests.length} uncompleted quest{uncompletedQuests.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-3 space-y-1">
          {uncompletedQuests.slice(0, 3).map(quest => (
            <div key={quest.id} className="flex items-center space-x-2 text-xs">
              <Clock className="w-3 h-3" />
              <span className="truncate">{quest.title}</span>
            </div>
          ))}
          {uncompletedQuests.length > 3 && (
            <div className="text-xs opacity-75">
              +{uncompletedQuests.length - 3} more quest{uncompletedQuests.length - 3 > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}