import { motion } from 'framer-motion';
import { Map, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface RoadmapPhase {
  phase: string;
  title: string;
  duration: string;
  tasks: string[];
  status: 'completed' | 'current' | 'upcoming';
}

interface RoadmapSectionProps {
  roadmap: RoadmapPhase[];
}

export function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  const { theme } = useTheme();

  if (!roadmap || roadmap.length === 0) {
    return null;
  }

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
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2.5 rounded-xl ${
          theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
        }`}>
          <Map className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
        </div>
        <h3 className={`text-lg font-bold ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          AI-Generated Roadmap
        </h3>
      </div>

      <div className="space-y-6">
        {roadmap.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative pl-8 pb-6 ${
              index !== roadmap.length - 1 ? 'border-l-2' : ''
            } ${
              phase.status === 'current'
                ? theme === 'dark' ? 'border-[#22C55E]' : 'border-[#16A34A]'
                : theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
            }`}
          >
            {/* Phase Icon */}
            <div className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full flex items-center justify-center ${
              phase.status === 'completed'
                ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                : phase.status === 'current'
                  ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                  : theme === 'dark' ? 'bg-[#374151]' : 'bg-[#E5E7EB]'
            }`}>
              {phase.status === 'completed' ? (
                <CheckCircle2 className="w-4 h-4 text-white" />
              ) : phase.status === 'current' ? (
                <Clock className="w-4 h-4 text-white" />
              ) : (
                <Circle className={`w-3 h-3 ${theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'}`} />
              )}
            </div>

            {/* Phase Content */}
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    phase.status === 'current'
                      ? theme === 'dark' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#DCFCE7] text-[#16A34A]'
                      : theme === 'dark' ? 'bg-[#374151] text-[#F9FAFB]/60' : 'bg-[#E5E7EB] text-[#111827]/60'
                  }`}>
                    {phase.phase}
                  </span>
                  <h4 className={`text-base font-bold mt-2 ${
                    theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                  }`}>
                    {phase.title}
                  </h4>
                </div>
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                }`}>
                  {phase.duration}
                </span>
              </div>

              <ul className="space-y-2">
                {phase.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className={`flex items-start gap-2 text-sm ${
                      theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                    }`} />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
