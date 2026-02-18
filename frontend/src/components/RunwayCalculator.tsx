import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useStartup } from '../contexts/StartupContext';

export function RunwayCalculator() {
  const { theme } = useTheme();
  const { startupData } = useStartup();
  
  // Initialize with user's budget if available
  const userBudget = startupData?.budget ? parseInt(startupData.budget) : 50000;
  const defaultExpense = Math.round(userBudget * 0.15); // 15% of budget
  
  const [budget, setBudget] = useState<number>(userBudget);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(defaultExpense);

  // Update when startup data changes
  useEffect(() => {
    if (startupData?.budget) {
      const newBudget = parseInt(startupData.budget);
      setBudget(newBudget);
      setMonthlyExpense(Math.round(newBudget * 0.15));
    }
  }, [startupData]);

  const runwayMonths = monthlyExpense > 0 ? Math.floor(budget / monthlyExpense) : 0;

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
          <Calculator className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
        </div>
        <h3 className={`text-lg font-bold ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Runway Calculator
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
          }`}>
            Current Budget (₹)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] focus:border-[#22C55E]'
                : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:border-[#16A34A]'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
          }`}>
            Monthly Expenses (₹)
          </label>
          <input
            type="number"
            value={monthlyExpense}
            onChange={(e) => setMonthlyExpense(Number(e.target.value))}
            className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] focus:border-[#22C55E]'
                : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:border-[#16A34A]'
            }`}
          />
        </div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`p-5 rounded-xl text-center ${
            theme === 'dark'
              ? 'bg-[#22C55E]/20 border border-[#22C55E]/30'
              : 'bg-[#DCFCE7] border border-[#16A34A]/20'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
            }`}>
              Estimated Runway
            </span>
          </div>
          <motion.span
            key={runwayMonths}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl font-bold ${
              theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
            }`}
          >
            {runwayMonths} Months
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}
