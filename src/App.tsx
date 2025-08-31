import React, { useState } from 'react';
import { Sword, Plus, Calendar, Trophy } from 'lucide-react';
import { HeroCard } from './components/HeroCard';
import { QuestCard } from './components/QuestCard';
import { AddQuestModal } from './components/AddQuestModal';
import { RewardNotification } from './components/RewardNotification';
import { NotificationBanner } from './components/NotificationBanner';
import { NotificationSettings } from './components/NotificationSettings';
import { useHero } from './hooks/useHero';
import { useQuests } from './hooks/useQuests';
import { useNotifications } from './hooks/useNotifications';

function App() {
  const { hero, completeQuest } = useHero();
  const { quests, completeQuest: completeQuestData, addQuest, removeQuest } = useQuests();
  const { checkForReminders } = useNotifications();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [rewardNotification, setRewardNotification] = useState<{ xp: number; gold: number } | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  React.useEffect(() => {
    if (notificationsEnabled) {
      const cleanup = checkForReminders(quests);
      return cleanup;
    }
  }, [quests, notificationsEnabled, checkForReminders]);

  const handleCompleteQuest = (questId: string, xpReward: number, goldReward: number) => {
    completeQuestData(questId);
    completeQuest(xpReward, goldReward);
    setRewardNotification({ xp: xpReward, gold: goldReward });
  };

  const dailyQuests = quests.filter(quest => quest.type === 'daily');
  const weeklyQuests = quests.filter(quest => quest.type === 'weekly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Sword className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                HabitQuest
              </h1>
            </div>
            <NotificationSettings onPermissionChange={setNotificationsEnabled} />
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Transform your daily routines into epic RPG adventures. Complete quests, level up your hero, and make self-improvement addictive.
          </p>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <HeroCard hero={hero} />
        </div>

        {/* Quests Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Quests */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Daily Quests</h2>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-sm">
                  {dailyQuests.filter(q => q.completed).length}/{dailyQuests.length}
                </span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {dailyQuests.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No daily quests yet. Create your first quest to start your adventure!</p>
                </div>
              ) : (
                dailyQuests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={handleCompleteQuest}
                    onDelete={removeQuest}
                  />
                ))
              )}
            </div>
          </div>

          {/* Weekly Challenges */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Weekly Challenges</h2>
                <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-sm">
                  {weeklyQuests.filter(q => q.completed).length}/{weeklyQuests.length}
                </span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {weeklyQuests.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No weekly challenges yet. Add challenging goals for bigger rewards!</p>
                </div>
              ) : (
                weeklyQuests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={handleCompleteQuest}
                    onDelete={removeQuest}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Add Quest Modal */}
        <AddQuestModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addQuest}
        />

        {/* Reward Notification */}
        {rewardNotification && (
          <RewardNotification
            xp={rewardNotification.xp}
            gold={rewardNotification.gold}
            onComplete={() => setRewardNotification(null)}
          />
        )}
      </div>

      {/* Notification Banner */}
      <NotificationBanner quests={quests} />
    </div>
  );
}

export default App;