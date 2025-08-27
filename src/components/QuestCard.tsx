import React, { useState } from 'react';
import { CheckCircle2, Clock, Flame, Star, Trash2 } from 'lucide-react';
import { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  onComplete: (questId: string, xpReward: number, goldReward: number) => void;
  onDelete: (questId: string) => void;
}

export function QuestCard({ quest, onComplete, onDelete }: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (quest.completed) return;
    
    setIsCompleting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Animation delay
    onComplete(quest.id, quest.xpReward, quest.goldReward);
    setIsCompleting(false);
  };

  const questTypeColor = quest.type === 'daily' 
    ? 'from-emerald-500 to-teal-500' 
    : 'from-purple-500 to-indigo-500';

  const questTypeBg = quest.type === 'daily'
    ? 'bg-emerald-500/20 text-emerald-300'
    : 'bg-purple-500/20 text-purple-300';

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-600/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-slate-500/70 ${
      quest.completed ? 'opacity-75' : ''
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${questTypeBg}`}>
                {quest.type === 'daily' ? 'Daily Quest' : 'Weekly Challenge'}
              </span>
              {quest.streak > 0 && (
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm font-semibold">{quest.streak}</span>
                </div>
              )}
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">{quest.title}</h3>
            <p className="text-slate-300 text-sm">{quest.description}</p>
          </div>
          <button
            onClick={() => onDelete(quest.id)}
            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium">{quest.xpReward} XP</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              <span className="text-yellow-400 font-medium">{quest.goldReward} Gold</span>
            </div>
          </div>

          <button
            onClick={handleComplete}
            disabled={quest.completed || isCompleting}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              quest.completed
                ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                : isCompleting
                ? 'bg-yellow-500/20 text-yellow-400'
                : `bg-gradient-to-r ${questTypeColor} text-white hover:shadow-lg hover:scale-105`
            }`}
          >
            {quest.completed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete</span>
              </>
            ) : isCompleting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Completing...</span>
              </>
            ) : (
              <span>Complete Quest</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}