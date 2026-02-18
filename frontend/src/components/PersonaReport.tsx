import { motion } from 'framer-motion';
import { Users, Code, Brain, Lightbulb, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PersonaReportProps {
  role: string;
  personality: string;
  skills: string[];
  strength: string;
  weakness: string;
}

export function PersonaReport({ role, personality, skills, strength, weakness }: PersonaReportProps) {
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
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2.5 rounded-xl ${
          theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
        }`}>
          <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
        </div>
        <h3 className={`text-lg font-bold ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Ideal Co-Founder Profile
        </h3>
      </div>

      {/* Role & Personality */}
      <div className={`p-4 rounded-xl mb-4 ${
        theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Code className={`w-4 h-4 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
          }`}>
            Role
          </span>
        </div>
        <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
          {role}
        </p>
        
        <div className="flex items-center gap-2 mb-2">
          <Brain className={`w-4 h-4 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
          }`}>
            Personality
          </span>
        </div>
        <p className={`font-semibold ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
          {personality}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className={`text-sm font-medium mb-3 ${
          theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
        }`}>
          Key Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                theme === 'dark'
                  ? 'bg-[#22C55E]/20 text-[#22C55E]'
                  : 'bg-[#DCFCE7] text-[#16A34A]'
              }`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`p-3 rounded-xl ${
          theme === 'dark' ? 'bg-[#22C55E]/10' : 'bg-[#DCFCE7]/50'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className={`w-4 h-4 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
            <span className={`text-xs font-medium ${
              theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
            }`}>
              Strength
            </span>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
            {strength}
          </p>
        </div>

        <div className={`p-3 rounded-xl ${
          theme === 'dark' ? 'bg-[#F59E0B]/10' : 'bg-[#FEF3C7]'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs font-medium text-[#F59E0B]">
              Weakness
            </span>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
            {weakness}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
