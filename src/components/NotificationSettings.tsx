import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';

interface NotificationSettingsProps {
  onPermissionChange: (granted: boolean) => void;
}

export function NotificationSettings({ onPermissionChange }: NotificationSettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const handleToggleNotifications = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        // Can't revoke permission programmatically, just update state
        setNotificationsEnabled(false);
        onPermissionChange(false);
      } else {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        setNotificationsEnabled(granted);
        onPermissionChange(granted);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
      >
        <Settings className="w-5 h-5" />
      </button>

      {showSettings && (
        <div className="absolute top-full right-0 mt-2 bg-slate-800 rounded-lg p-4 shadow-xl border border-slate-600/50 min-w-64 z-50">
          <h3 className="text-white font-semibold mb-3">Notification Settings</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-green-400" />
              ) : (
                <BellOff className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <p className="text-white text-sm">Quest Reminders</p>
                <p className="text-slate-400 text-xs">Get notified about uncompleted quests</p>
              </div>
            </div>
            
            <button
              onClick={handleToggleNotifications}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-green-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {!notificationsEnabled && (
            <p className="text-slate-400 text-xs mt-2">
              Enable notifications to get reminders about your daily quests and weekly challenges.
            </p>
          )}
        </div>
      )}
    </div>
  );
}