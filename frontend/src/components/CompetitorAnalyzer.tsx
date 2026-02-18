import { motion } from 'framer-motion';
import { Target, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Competitor {
  name: string;
  level: 'High' | 'Medium' | 'Low';
  description?: string;
}

interface CompetitorAnalyzerProps {
  startupIdea: string;
  competitors: Competitor[];
  saturationPercentage?: number;
}

const levelColors = {
  High: '#EF4444',
  Medium: '#F59E0B',
  Low: '#16A34A',
};

export function CompetitorAnalyzer({ startupIdea, competitors, saturationPercentage = 65 }: CompetitorAnalyzerProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 rounded-xl ${
        theme === 'dark'
          ? 'bg-[#111827] border border-[#1F2937]'
          : 'bg-white border border-[#E5E7EB] shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl ${
          theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
        }`}>
          <Target className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
        </div>
        <h3 className={`text-lg font-bold ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Competitor Landscape
        </h3>
      </div>

      <div className={`p-4 rounded-xl mb-5 ${
        theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
      }`}>
        <p className={`text-sm ${theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'}`}>
          Your Startup Idea
        </p>
        <p className={`font-semibold ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
          {startupIdea}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <p className={`text-sm font-medium ${
          theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
        }`}>
          Top Competitors
        </p>
        {competitors.map((competitor, index) => (
          <motion.div
            key={competitor.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" style={{ color: levelColors[competitor.level] }} />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
                  {competitor.name}
                </span>
              </div>
              <span 
                className="text-sm font-medium"
                style={{ color: levelColors[competitor.level] }}
              >
                {competitor.level} competition
              </span>
            </div>
            {competitor.description && (
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                {competitor.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
          }`}>
            Market Saturation
          </span>
          <span className={`text-sm font-bold ${
            saturationPercentage > 70 ? 'text-[#EF4444]' : saturationPercentage > 40 ? 'text-[#F59E0B]' : 'text-[#16A34A]'
          }`}>
            {saturationPercentage}%
          </span>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
        }`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${saturationPercentage}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full rounded-full ${
              saturationPercentage > 70 ? 'bg-[#EF4444]' : saturationPercentage > 40 ? 'bg-[#F59E0B]' : 'bg-[#16A34A]'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
