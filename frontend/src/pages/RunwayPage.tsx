import { motion } from 'framer-motion';
import { RunwayCalculator } from '../components/RunwayCalculator';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const tips = [
  { icon: CheckCircle, text: 'Aim for at least 18 months runway before fundraising', color: '#16A34A' },
  { icon: AlertCircle, text: 'Keep 3 months emergency buffer in your calculations', color: '#F59E0B' },
  { icon: TrendingUp, text: 'Review and adjust your runway monthly', color: '#3B82F6' },
];

export function RunwayPage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Runway Calculator
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Plan your finances and understand how long your startup can survive
        </p>
      </motion.div>

      {/* Calculator */}
      <div className="max-w-xl">
        <RunwayCalculator />
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-xl ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}
      >
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          💡 Runway Tips
        </h3>
        <div className="space-y-3">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" style={{ color: tip.color }} />
                <span className={theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}>
                  {tip.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
