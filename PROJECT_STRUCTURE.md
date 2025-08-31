# HabitQuest - Project Structure

## File Organization

```
habitquest/
├── public/
│   └── vite.svg                 # App icon
├── src/
│   ├── components/              # React components
│   │   ├── HeroCard.tsx        # Character stats display
│   │   ├── QuestCard.tsx       # Individual quest item
│   │   ├── AddQuestModal.tsx   # Quest creation form
│   │   ├── RewardNotification.tsx # XP/gold popup
│   │   ├── NotificationBanner.tsx # In-app reminders
│   │   └── NotificationSettings.tsx # Settings panel
│   ├── hooks/                   # Custom React hooks
│   │   ├── useHero.ts          # Character progression logic
│   │   ├── useQuests.ts        # Quest management logic
│   │   └── useNotifications.ts  # Notification system
│   ├── types.ts                # TypeScript interfaces
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # React app entry point
│   └── index.css              # Global styles (Tailwind)
├── index.html                  # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration
```

## Component Architecture

### Core Components
- **App.tsx**: Main application layout and state orchestration
- **HeroCard.tsx**: Displays character level, XP bar, gold, and streaks
- **QuestCard.tsx**: Individual quest with completion button and rewards
- **AddQuestModal.tsx**: Form for creating new daily/weekly quests

### Notification System
- **NotificationBanner.tsx**: Visual reminders within the app
- **NotificationSettings.tsx**: Permission management and settings
- **RewardNotification.tsx**: Animated reward popup on quest completion

### Custom Hooks
- **useHero.ts**: Character progression, XP calculation, leveling
- **useQuests.ts**: Quest CRUD operations and local storage
- **useNotifications.ts**: Browser notification management

## Data Flow

1. **Quest Creation**: User creates quest → `useQuests` → Local storage
2. **Quest Completion**: User completes quest → `useQuests` + `useHero` → Rewards
3. **Character Progression**: XP gained → Level calculation → UI update
4. **Notifications**: Timer checks → Uncompleted quests → Browser/banner alerts

## Key Design Patterns

### State Management
- Custom hooks for business logic separation
- Local storage for data persistence
- React state for UI interactions

### Component Design
- Single responsibility principle
- Props interface for type safety
- Conditional rendering for different states

### Styling Approach
- Tailwind utility classes
- Gradient backgrounds for depth
- Hover states and animations
- Responsive grid layouts

## Development Workflow

1. **Types First**: Define data structures in `types.ts`
2. **Hooks Second**: Implement business logic in custom hooks
3. **Components Third**: Build UI components using hooks
4. **Integration Fourth**: Connect components in main App
5. **Polish Fifth**: Add animations, notifications, and UX improvements