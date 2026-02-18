import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { StartupProvider } from './contexts/StartupContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Chatbot } from './components/Chatbot';
import { Dashboard } from './pages/Dashboard';
import { Explorer } from './pages/Explorer';
import { Mentor } from './pages/Mentor';
import { RiskAssessment } from './pages/RiskAssessment';
import { RunwayPage } from './pages/RunwayPage';
import { FinancialRunway } from './pages/FinancialRunway';
import { CoFounderPage } from './pages/CoFounderPage';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  explorer: 'Startup Explorer',
  mentor: 'AI Mentor',
  financial: 'Financial Assessment',
  runway: 'Runway Calculator',
  cofounder: 'Co-Founder Report',
  settings: 'Settings',
};

function ProtectedLayout() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'explorer':
        return <Explorer />;
      case 'mentor':
        return <Mentor />;
      case 'financial':
        return <FinancialRunway />;
      case 'runway':
        return <RunwayPage />;
      case 'cofounder':
        return <CoFounderPage />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
    }`}>
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Navbar */}
      <Navbar 
        pageTitle={pageTitles[activePage] || 'Dashboard'} 
        onNavigateToSettings={() => setActivePage('settings')}
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 p-4 lg:p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>

      {/* Floating Chatbot - Hidden on Mentor page */}
      {activePage !== 'mentor' && <Chatbot />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <StartupProvider>
            <ChatProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedLayout />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </ChatProvider>
          </StartupProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
