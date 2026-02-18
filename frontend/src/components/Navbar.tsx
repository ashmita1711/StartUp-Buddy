import { motion } from 'framer-motion';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  pageTitle: string;
  onNavigateToSettings?: () => void;
}

export function Navbar({ pageTitle, onNavigateToSettings }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings();
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 lg:left-64 right-0 h-16 px-4 lg:px-6 flex items-center justify-between transition-colors duration-300 z-30 ${
        theme === 'dark' 
          ? 'bg-[#0F172A] border-b border-[#1F2937]' 
          : 'bg-[#F9FAFB] border-b border-[#E5E7EB]'
      }`}
    >
      {/* Page Title with Username */}
      <div className="ml-12 lg:ml-0">
        <h1 className={`text-lg lg:text-xl font-semibold ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
          {pageTitle}
        </h1>
        {user && (
          <p className={`text-xs lg:text-sm ${theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'}`}>
            Welcome, {user.name}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`p-2 lg:p-2.5 rounded-xl transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
              : 'bg-white text-[#111827] hover:bg-[#E5E7EB] shadow-sm'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className={`p-2 lg:p-2.5 rounded-xl transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
              : 'bg-white text-[#111827] hover:bg-[#E5E7EB] shadow-sm'
          }`}
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>

        {/* Profile Avatar */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProfileClick}
          className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center cursor-pointer ${
            theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
          }`}
          aria-label="Open profile settings"
        >
          <User className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </header>
  );
}
