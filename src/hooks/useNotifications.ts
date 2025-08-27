import { useEffect, useCallback } from 'react';
import { Quest } from '../types';

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  const sendNotification = useCallback((title: string, body: string, icon?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: icon || '/vite.svg',
        badge: '/vite.svg',
        tag: 'habitquest-reminder',
        requireInteraction: false,
      });
    }
  }, []);

  const scheduleQuestReminders = useCallback((quests: Quest[]) => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Check for uncompleted daily quests in the evening (6 PM)
    if (currentHour >= 18) {
      const uncompletedDaily = quests.filter(q => q.type === 'daily' && !q.completed);
      if (uncompletedDaily.length > 0) {
        const questTitles = uncompletedDaily.map(q => q.title).join(', ');
        sendNotification(
          '🗡️ Daily Quests Awaiting!',
          `You have ${uncompletedDaily.length} uncompleted daily quest${uncompletedDaily.length > 1 ? 's' : ''}: ${questTitles}`
        );
      }
    }

    // Check for uncompleted weekly quests on Sunday evening
    if (now.getDay() === 0 && currentHour >= 18) {
      const uncompletedWeekly = quests.filter(q => q.type === 'weekly' && !q.completed);
      if (uncompletedWeekly.length > 0) {
        const questTitles = uncompletedWeekly.map(q => q.title).join(', ');
        sendNotification(
          '🏆 Weekly Challenges Ending Soon!',
          `Complete your weekly challenges before the week ends: ${questTitles}`
        );
      }
    }
  }, [sendNotification]);

  const checkForReminders = useCallback((quests: Quest[]) => {
    // Check every hour for reminders
    const interval = setInterval(() => {
      scheduleQuestReminders(quests);
    }, 60 * 60 * 1000); // 1 hour

    // Initial check
    scheduleQuestReminders(quests);

    return () => clearInterval(interval);
  }, [scheduleQuestReminders]);

  useEffect(() => {
    // Request permission on first load
    requestPermission();
  }, [requestPermission]);

  return {
    requestPermission,
    sendNotification,
    checkForReminders,
  };
}