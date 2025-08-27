import { useState, useEffect } from 'react';
import { Quest } from '../types';

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>(() => {
    const savedQuests = localStorage.getItem('habitquest-quests');
    if (savedQuests) {
      return JSON.parse(savedQuests);
    }
    return [
      {
        id: '1',
        title: 'Morning Exercise',
        description: 'Complete 30 minutes of physical activity',
        type: 'daily',
        xpReward: 50,
        goldReward: 25,
        completed: false,
        streak: 0,
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Read for 1 Hour',
        description: 'Read books, articles, or educational content',
        type: 'daily',
        xpReward: 40,
        goldReward: 20,
        completed: false,
        streak: 0,
        createdAt: new Date(),
      },
      {
        id: '3',
        title: 'Weekly Planning',
        description: 'Plan your goals and tasks for the upcoming week',
        type: 'weekly',
        xpReward: 150,
        goldReward: 100,
        completed: false,
        streak: 0,
        createdAt: new Date(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('habitquest-quests', JSON.stringify(quests));
  }, [quests]);

  const completeQuest = (questId: string) => {
    setQuests(prev =>
      prev.map(quest =>
        quest.id === questId
          ? {
              ...quest,
              completed: true,
              streak: quest.streak + 1,
              lastCompleted: new Date(),
            }
          : quest
      )
    );
  };

  const resetDailyQuests = () => {
    setQuests(prev =>
      prev.map(quest =>
        quest.type === 'daily'
          ? { ...quest, completed: false }
          : quest
      )
    );
  };

  const addQuest = (quest: Omit<Quest, 'id' | 'completed' | 'streak' | 'createdAt'>) => {
    const newQuest: Quest = {
      ...quest,
      id: Date.now().toString(),
      completed: false,
      streak: 0,
      createdAt: new Date(),
    };
    setQuests(prev => [...prev, newQuest]);
  };

  const removeQuest = (questId: string) => {
    setQuests(prev => prev.filter(quest => quest.id !== questId));
  };

  return { quests, completeQuest, resetDailyQuests, addQuest, removeQuest };
}