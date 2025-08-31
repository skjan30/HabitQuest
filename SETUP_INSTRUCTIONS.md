# HabitQuest - Setup Instructions

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Create New Vite Project
```bash
npm create vite@latest habitquest -- --template react-ts
cd habitquest
```

### 2. Install Dependencies
```bash
npm install
npm add lucide-react@latest
```

### 3. Setup Tailwind CSS
```bash
npm add -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

### 4. Configure Tailwind
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 5. Update CSS
Replace `src/index.css` content with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Copy All Source Files
Copy all the provided source files into your project:
- `src/types.ts`
- `src/hooks/useHero.ts`
- `src/hooks/useQuests.ts`
- `src/hooks/useNotifications.ts`
- `src/components/HeroCard.tsx`
- `src/components/QuestCard.tsx`
- `src/components/AddQuestModal.tsx`
- `src/components/RewardNotification.tsx`
- `src/components/NotificationBanner.tsx`
- `src/components/NotificationSettings.tsx`
- `src/App.tsx`

### 7. Update HTML Title
Update `index.html` title:
```html
<title>HabitQuest - Gamified Habit Tracker</title>
```

### 8. Run Development Server
```bash
npm run dev
```

## Features Overview

### Core Functionality
- **Hero Character**: Level progression with XP and gold
- **Quest System**: Daily and weekly habit tracking
- **Gamification**: Rewards, streaks, and achievements
- **Notifications**: Browser alerts and in-app reminders

### Technical Features
- **TypeScript**: Full type safety
- **Local Storage**: Persistent data
- **Responsive Design**: Works on all devices
- **Modern React**: Hooks and functional components

## Browser Notification Setup
1. Click the settings icon in the top-right corner
2. Toggle "Quest Reminders" to enable notifications
3. Allow notifications when prompted by your browser
4. You'll receive reminders about uncompleted quests

## Customization Options
- Modify XP and gold rewards in quest creation
- Adjust notification timing in `useNotifications.ts`
- Customize colors and styling in component files
- Add new quest types by extending the `Quest` interface

## Deployment
To deploy your app:
```bash
npm run build
```
Then upload the `dist` folder to your hosting provider.

## Troubleshooting
- **Notifications not working**: Ensure browser permissions are granted
- **Data not persisting**: Check browser local storage settings
- **Styling issues**: Verify Tailwind CSS is properly configured