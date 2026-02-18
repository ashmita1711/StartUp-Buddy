import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Compass, 
  Bot, 
  ShieldAlert, 
  Calculator, 
  Users, 
  Settings,
  Rocket,
  Menu,
  X,
  LineChart
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'explorer', label: 'Startup Explorer', icon: Compass },
  { id: 'mentor', label: 'AI Mentor', icon: Bot },
  { id: 'financial', label: 'Financial Assessment', icon: LineChart },
  { id: 'runway', label: 'Runway Calculator', icon: Calculator },
  { id: 'cofounder', label: 'Co-Founder Report', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-3 py-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'}`}>
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
            Startup Buddy
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className={`lg:hidden p-2 rounded-xl ${
            theme === 'dark' ? 'hover:bg-[#1F2937] text-[#F9FAFB]' : 'hover:bg-[#F9FAFB] text-[#111827]'
          }`}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? theme === 'dark'
                    ? 'bg-[#22C55E]/20 text-[#22C55E]'
                    : 'bg-[#DCFCE7] text-[#16A34A]'
                  : theme === 'dark'
                    ? 'text-[#F9FAFB]/70 hover:bg-[#1F2937] hover:text-[#F9FAFB]'
                    : 'text-[#111827]/70 hover:bg-[#F9FAFB] hover:text-[#111827]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`px-4 py-3 rounded-xl ${
        theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#F9FAFB]'
      }`}>
        <p className={`text-xs ${theme === 'dark' ? 'text-[#F9FAFB]/50' : 'text-[#111827]/50'}`}>
          Version 1.0.0
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-xl shadow-lg ${
          theme === 'dark' 
            ? 'bg-[#111827] text-[#F9FAFB] border border-[#1F2937]' 
            : 'bg-white text-[#111827] border border-[#E5E7EB]'
        }`}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-screen w-64 p-4 flex-col hidden lg:flex transition-colors duration-300 z-40 ${
          theme === 'dark' 
            ? 'bg-[#111827] border-r border-[#1F2937]' 
            : 'bg-white border-r border-[#E5E7EB]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed left-0 top-0 h-screen w-64 p-4 flex flex-col z-50 lg:hidden ${
                theme === 'dark' 
                  ? 'bg-[#111827] border-r border-[#1F2937]' 
                  : 'bg-white border-r border-[#E5E7EB]'
              }`}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
