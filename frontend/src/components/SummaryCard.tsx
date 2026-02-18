import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  delay?: number;
}

export function SummaryCard({ title, value, icon: Icon, delay = 0 }: SummaryCardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: theme === 'dark' 
        ? '0 10px 40px rgba(0,0,0,0.3)' 
        : '0 10px 40px rgba(0,0,0,0.1)' 
      }}
      className={`p-5 rounded-xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#111827] border border-[#1F2937]'
          : 'bg-white border border-[#E5E7EB] shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${
          theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
        }`}>
          <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
        </div>
        <div>
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
          }`}>
            {title}
          </p>
          <p className={`text-lg font-bold mt-0.5 ${
            theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}>
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
