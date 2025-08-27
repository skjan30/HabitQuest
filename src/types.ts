export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  xpReward: number;
  goldReward: number;
  completed: boolean;
  streak: number;
  lastCompleted?: Date;
  createdAt: Date;
}

export interface Hero {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
  gold: number;
  totalQuestsCompleted: number;
  currentStreak: number;
  longestStreak: number;
}