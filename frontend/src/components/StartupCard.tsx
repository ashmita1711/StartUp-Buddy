import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface StartupCardProps {
  title: string;
  description?: string;
  confidenceScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  delay?: number;
}

const riskColors = {
  Low: { bg: '#16A34A', text: 'white' },
  Medium: { bg: '#F59E0B', text: 'white' },
  High: { bg: '#EF4444', text: 'white' },
};

export function StartupCard({ title, description, confidenceScore, riskLevel, delay = 0 }: StartupCardProps) {
  const { theme } = useTheme();
  const risk = riskColors[riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: theme === 'dark' 
        ? '0 10px 40px rgba(0,0,0,0.3)' 
        : '0 10px 40px rgba(0,0,0,0.1)' 
      }}
      className={`p-5 rounded-xl cursor-pointer transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#111827] border border-[#1F2937]'
          : 'bg-white border border-[#E5E7EB] shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${
          theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
        }`}>
          <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
        </div>
        <span 
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: risk.bg, color: risk.text }}
        >
          {riskLevel} Risk
        </span>
      </div>

      <h3 className={`text-lg font-bold mb-2 ${
        theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
      }`}>
        {title}
      </h3>

      {description && (
        <p className={`text-sm mb-4 ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          {description}
        </p>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
          }`}>
            Confidence Score
          </span>
          <span className={`text-sm font-bold ${
            theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
          }`}>
            {confidenceScore}%
          </span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
        }`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidenceScore}%` }}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
            className={`h-full rounded-full ${
              theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
