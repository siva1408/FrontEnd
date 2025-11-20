# 🍅 PomodoroFlow

A modern, premium-quality Pomodoro productivity web application inspired by "Session" and "Forest". Built with React, Vite, TailwindCSS, and Firebase.

## ✨ Features

### 🎯 Core Timer System
- **Custom Durations**: Work (25min), Short Break (5min), Long Break (15min)
- **Timer Styles**: Circular progress, Horizontal bar, Minimal numeric mode
- **Smart Controls**: Start/Pause/Reset/Skip
- **Auto-start**: Configurable auto-start for breaks and work sessions
- **Sound Notifications**: With volume control
- **Visual Feedback**: Smooth animations and transitions

### 📓 Task Management
- **Full CRUD**: Add, edit, delete, and complete tasks
- **Categories**: Color-coded task categories
- **Subtasks**: Break down tasks into smaller pieces
- **Pomodoro Tracking**: Estimate and track Pomodoros per task
- **Kanban Board**: Drag & drop tasks between Todo → Doing → Done
- **Rich Notes**: Markdown support for detailed task notes

### 📊 Analytics Dashboard
- **Productivity Charts**: Daily, weekly, monthly statistics
- **Session History**: Complete timeline of all Pomodoro sessions
- **Time Tracking**: Total focused minutes and session counts
- **Streak Tracking**: Daily and weekly streak counters

### 🎧 Deep Focus Mode
- **Fullscreen Zen Mode**: Minimal UI for distraction-free work
- **Ambient Sounds**: Rain, Forest, Coffee shop, White noise
- **Volume Control**: Adjustable ambient sound levels

### 🚫 Distraction Control
- **Tab Detection**: Auto-pause when switching browser tabs
- **Idle Detection**: Auto-pause after 5 minutes of inactivity
- **Notifications**: Browser notifications for session completion

### 🎮 Gamification
- **XP System**: Earn experience points for completing Pomodoros
- **Level System**: Progress through levels as you stay productive
- **Achievements**: Unlock badges for milestones
- **Streak Counter**: Track your daily consistency
- **Celebration Animations**: Confetti for achievements!

### 🎨 Customization
- **Multiple Themes**: Light, Dark, AMOLED, Gradient themes
- **Timer Styles**: Switch between circular, horizontal, or minimal
- **Sound Packs**: Different notification sound options

## 🚀 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Recharts** - Data visualization
- **@dnd-kit** - Drag and drop functionality

### Backend & Services
- **Firebase Authentication** - User management
- **Cloud Firestore** - Real-time database
- **Netlify** - Hosting and deployment

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Firebase account (for backend features)

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd FrontEnd
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🌐 Deployment to Netlify

### Deploy via Netlify Dashboard

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Netlify dashboard
7. Deploy!

## 📂 Project Structure

```
FrontEnd/
├── src/
│   ├── components/        # React components
│   ├── views/            # Main view components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   ├── services/         # Firebase services
│   ├── utils/            # Utility functions
│   └── assets/           # Static assets
├── public/               # Public assets
├── .env.example          # Environment template
├── netlify.toml          # Netlify configuration
└── package.json          # Dependencies
```

## 🎯 Usage Guide

1. **Start a Pomodoro** - Click Play to begin a work session
2. **Manage Tasks** - Add and organize tasks in the Tasks view
3. **Track Progress** - Check Analytics for productivity trends
4. **Customize** - Adjust settings to match your workflow
5. **Focus Mode** - Use fullscreen mode for deep work

---

Made with ❤️ for productive people everywhere.
