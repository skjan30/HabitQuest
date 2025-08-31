# HabitQuest - Step-by-Step Coding Guide

## Phase 1: Foundation Setup

### Step 1: Initialize Project
```bash
npm create vite@latest habitquest -- --template react-ts
cd habitquest
npm install
```

### Step 2: Install Dependencies
```bash
npm add lucide-react@latest
npm add -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

### Step 3: Configure Tailwind
Update `tailwind.config.js` and `src/index.css` with Tailwind directives.

## Phase 2: Type System

### Step 4: Define Data Types
Create `src/types.ts` with:
- `Quest` interface for habit tracking
- `Hero` interface for character progression

**Key Decisions:**
- Use string IDs for simplicity
- Include streak tracking for gamification
- Separate daily and weekly quest types

## Phase 3: Business Logic

### Step 5: Hero Progression System
Create `src/hooks/useHero.ts`:
- Character leveling with exponential XP requirements
- Gold accumulation system
- Streak tracking and statistics
- Local storage persistence

**Algorithm:** XP to next level = 100 * (1.2 ^ (level - 1))

### Step 6: Quest Management
Create `src/hooks/useQuests.ts`:
- CRUD operations for quests
- Completion tracking with timestamps
- Streak increment on completion
- Default quest examples for new users

### Step 7: Notification System
Create `src/hooks/useNotifications.ts`:
- Browser notification permission handling
- Smart reminder scheduling (evening for daily, Sunday for weekly)
- Hourly checks for uncompleted quests

## Phase 4: User Interface

### Step 8: Hero Character Display
Create `src/components/HeroCard.tsx`:
- Character avatar with crown icon
- Animated XP progress bar
- Gold and quest completion counters
- Current and longest streak display

**Design Elements:**
- Gradient backgrounds for depth
- Radial gradient overlays for lighting effects
- Smooth XP bar animations

### Step 9: Quest Cards
Create `src/components/QuestCard.tsx`:
- Quest type badges (daily/weekly)
- Streak indicators with flame icons
- XP and gold reward display
- Completion button with loading states
- Delete functionality

**Interaction Design:**
- Hover effects for engagement
- Loading animation during completion
- Visual feedback for completed state

### Step 10: Quest Creation
Create `src/components/AddQuestModal.tsx`:
- Modal overlay with backdrop blur
- Form validation for required fields
- Quest type selection (daily/weekly)
- Customizable XP and gold rewards

### Step 11: Reward Feedback
Create `src/components/RewardNotification.tsx`:
- Animated popup for quest completion
- XP and gold gain display
- Auto-dismiss after 2.5 seconds
- Scale and opacity animations

## Phase 5: Engagement Features

### Step 12: Visual Notifications
Create `src/components/NotificationBanner.tsx`:
- Top-of-screen reminder banner
- List of uncompleted quests
- Time-based visibility (evening hours)
- Dismissible with smooth animations

### Step 13: Settings Panel
Create `src/components/NotificationSettings.tsx`:
- Notification permission toggle
- Visual status indicators
- Dropdown settings panel
- User-friendly permission explanations

## Phase 6: Integration

### Step 14: Main Application
Update `src/App.tsx`:
- Import all components and hooks
- State management for modals and notifications
- Quest filtering by type (daily/weekly)
- Event handling for quest completion

**Layout Structure:**
- Header with logo and settings
- Hero card for character display
- Two-column grid for quest types
- Floating modals and notifications

### Step 15: Responsive Design
- Mobile-first approach with `lg:` breakpoints
- Flexible grid layouts
- Proper spacing and typography scales
- Touch-friendly button sizes

## Phase 7: Polish and UX

### Step 16: Animations and Micro-interactions
- Hover states on all interactive elements
- Smooth transitions for state changes
- Loading animations for async operations
- Scale effects on button interactions

### Step 17: Visual Hierarchy
- Consistent color system with semantic meaning
- Typography scale for information hierarchy
- Proper contrast ratios for accessibility
- Strategic use of shadows and gradients

### Step 18: Error Handling
- Graceful fallbacks for missing data
- User feedback for all actions
- Validation for form inputs
- Browser compatibility checks

## Phase 8: Testing and Optimization

### Step 19: Manual Testing
- Test all user flows (create, complete, delete quests)
- Verify notification permissions and timing
- Check responsive behavior on different screen sizes
- Validate data persistence across browser sessions

### Step 20: Performance Optimization
- Minimize re-renders with proper dependency arrays
- Optimize bundle size with tree shaking
- Lazy load components if needed
- Efficient local storage operations

## Development Tips

### Code Organization
- Keep components under 200 lines
- Separate business logic into custom hooks
- Use TypeScript for all data structures
- Maintain consistent naming conventions

### Styling Best Practices
- Use Tailwind utility classes consistently
- Create reusable color and spacing patterns
- Implement hover states for all interactive elements
- Ensure proper contrast for accessibility

### State Management
- Use local storage for persistence
- Implement optimistic UI updates
- Handle loading and error states
- Provide immediate user feedback

This step-by-step guide provides the complete roadmap for building HabitQuest from scratch, with detailed explanations of each development phase and the reasoning behind key technical decisions.