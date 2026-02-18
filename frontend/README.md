# StartUp Buddy - Frontend

React + TypeScript frontend application for the StartUp Buddy platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Chatbot.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── FinancialRunway.tsx
│   │   └── ...
│   ├── contexts/        # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## 🎨 Features

- **Authentication**: Login system with protected routes
- **Theme Support**: Dark/Light mode toggle
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth transitions with Framer Motion
- **Charts**: Interactive data visualizations
- **Real-time Chat**: AI-powered chatbot interface

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **Recharts** - Data visualization
- **Lucide React** - Icons

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

### Vite Config

The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.ts`.

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Keep components small and focused

### Component Structure
```tsx
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export function ComponentName() {
  const { theme } = useTheme();
  const [state, setState] = useState('');

  return (
    <div className={theme === 'dark' ? 'bg-dark' : 'bg-light'}>
      {/* Component content */}
    </div>
  );
}
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Sidebar.tsx`

## 🔐 Authentication

The app uses a context-based authentication system:
- Login credentials are stored in localStorage
- Protected routes redirect to login if not authenticated
- Demo mode: any email/password combination works

## 🎨 Theming

Theme is managed through `ThemeContext`:
```tsx
const { theme, toggleTheme } = useTheme();
```

Supports:
- Dark mode
- Light mode
- Persistent theme preference

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🐛 Troubleshooting

### Port Already in Use
Change the port in `vite.config.ts` or use:
```bash
npm run dev -- --port 3001
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues or questions, contact the frontend team lead or create an issue on GitHub.
