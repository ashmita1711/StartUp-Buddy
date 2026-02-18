import { motion } from 'framer-motion';
import { PersonaReport } from '../components/PersonaReport';
import { useTheme } from '../context/ThemeContext';
import { Users, Heart, Zap, Target } from 'lucide-react';

const compatibilityFactors = [
  { label: 'Vision Alignment', value: 95, icon: Target },
  { label: 'Skill Complementarity', value: 88, icon: Zap },
  { label: 'Work Style Match', value: 82, icon: Heart },
  { label: 'Communication', value: 90, icon: Users },
];

export function CoFounderPage() {
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
          Co-Founder Report
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Find your ideal co-founder match based on your profile
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Persona Report */}
        <PersonaReport
          role="Technical Co-Founder"
          personality="Analytical, Problem Solver"
          skills={['React', 'Backend Development', 'System Design', 'DevOps']}
          strength="Execution focused"
          weakness="Needs business guidance"
        />

        {/* Compatibility Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`p-6 rounded-xl ${
            theme === 'dark'
              ? 'bg-[#111827] border border-[#1F2937]'
              : 'bg-white border border-[#E5E7EB] shadow-sm'
          }`}
        >
          <h3 className={`text-lg font-bold mb-6 ${
            theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}>
            Compatibility Analysis
          </h3>
          <div className="space-y-5">
            {compatibilityFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={factor.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${
                        theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                      }`} />
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                      }`}>
                        {factor.label}
                      </span>
                    </div>
                    <span className={`font-bold ${
                      theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                    }`}>
                      {factor.value}%
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${
                    theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.value}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                      className={`h-full rounded-full ${
                        theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Advice Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-xl ${
          theme === 'dark'
            ? 'bg-[#22C55E]/10 border border-[#22C55E]/20'
            : 'bg-[#DCFCE7] border border-[#16A34A]/20'
        }`}
      >
        <h4 className={`font-semibold mb-2 ${
          theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
        }`}>
          🤝 Finding Your Co-Founder
        </h4>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
        }`}>
          Look for someone whose skills complement yours. If you're strong in business, 
          find a technical co-founder. Shared values and work ethic are more important than similar backgrounds.
        </p>
      </motion.div>
    </div>
  );
}
