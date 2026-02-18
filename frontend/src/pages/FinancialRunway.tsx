import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, TrendingDown, TrendingUp, Clock, Target } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { useStartup } from "../contexts/StartupContext";

const generateRunwayData = (
  initialCapital: number,
  monthlyBurn: number,
  teamSize: number
) => {
  const data = [];
  let remainingCash = initialCapital;
  const adjustedBurn = monthlyBurn * (1 + teamSize * 0.05);

  for (let month = 0; month <= 12; month++) {
    data.push({
      month: month === 0 ? "Now" : `M${month}`,
      cash: Math.max(0, remainingCash),
      burn: month === 0 ? 0 : adjustedBurn,
    });
    remainingCash -= adjustedBurn;
  }

  return data;
};

export function FinancialRunway() {
  const { theme } = useTheme();
  const { startupData } = useStartup();
  
  // Initialize with user's budget if available
  const userBudget = startupData?.budget ? parseInt(startupData.budget) : 2500000;
  const defaultBurn = Math.round(userBudget * 0.15); // 15% of budget as default burn
  
  const [initialCapital, setInitialCapital] = useState(userBudget);
  const [monthlyBurn, setMonthlyBurn] = useState(defaultBurn);
  const [teamSize, setTeamSize] = useState(5);

  // Update when startup data changes
  useEffect(() => {
    if (startupData?.budget) {
      const budget = parseInt(startupData.budget);
      setInitialCapital(budget);
      setMonthlyBurn(Math.round(budget * 0.15));
    }
  }, [startupData]);

  const runwayData = generateRunwayData(initialCapital, monthlyBurn, teamSize);
  const runwayMonths = runwayData.findIndex((d) => d.cash === 0);
  const isDangerous = runwayMonths > 0 && runwayMonths < 12;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const adjustedBurn = monthlyBurn * (1 + teamSize * 0.05);

  return (
    <div className="space-y-6">
      {/* Info Banner if no startup data */}
      {!startupData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-[#22C55E]/10 border border-[#22C55E]/20'
              : 'bg-[#DCFCE7] border border-[#16A34A]/20'
          }`}
        >
          <p className={`text-sm ${
            theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
          }`}>
            💡 <strong>Tip:</strong> Analyze your startup idea on the Dashboard first to get personalized financial projections based on your actual budget!
          </p>
        </motion.div>
      )}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Financial Runway Simulator
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Model your burn rate and predict cash runway. We don't just guess budget; we
          simulate failure scenarios.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`rounded-xl p-6 ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}
      >
        <h2 className={`text-xl font-semibold mb-6 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Interactive Controls
        </h2>

        <div className="space-y-6">
          {/* Initial Capital */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="initial-capital" className={`text-sm font-medium ${
                theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
              }`}>
                Initial Capital
              </label>
              <span className={`text-lg font-bold ${
                theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
              }`}>
                {formatCurrency(initialCapital)}
              </span>
            </div>
            <input
              id="initial-capital"
              type="range"
              min={500000}
              max={50000000}
              step={100000}
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              aria-label="Initial Capital"
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
              }`}
            />
            <div className={`flex justify-between text-xs mt-1 ${
              theme === 'dark' ? 'text-[#F9FAFB]/50' : 'text-[#111827]/50'
            }`}>
              <span>₹5L</span>
              <span>₹5Cr</span>
            </div>
          </div>

          {/* Monthly Burn */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="monthly-burn" className={`text-sm font-medium ${
                theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
              }`}>
                Monthly Burn Rate
              </label>
              <span className="text-lg font-bold text-[#EF4444]">
                {formatCurrency(monthlyBurn)}
              </span>
            </div>
            <input
              id="monthly-burn"
              type="range"
              min={50000}
              max={2000000}
              step={10000}
              value={monthlyBurn}
              onChange={(e) => setMonthlyBurn(Number(e.target.value))}
              aria-label="Monthly Burn Rate"
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
              }`}
            />
            <div className={`flex justify-between text-xs mt-1 ${
              theme === 'dark' ? 'text-[#F9FAFB]/50' : 'text-[#111827]/50'
            }`}>
              <span>₹50K</span>
              <span>₹20L</span>
            </div>
          </div>

          {/* Team Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="team-size" className={`text-sm font-medium ${
                theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
              }`}>
                Team Size (impacts burn)
              </label>
              <span className="text-lg font-bold text-[#F59E0B]">
                {teamSize} people
              </span>
            </div>
            <input
              id="team-size"
              type="range"
              min={1}
              max={50}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              aria-label="Team Size"
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
              }`}
            />
            <div className={`flex justify-between text-xs mt-1 ${
              theme === 'dark' ? 'text-[#F9FAFB]/50' : 'text-[#111827]/50'
            }`}>
              <span>1 person</span>
              <span>50 people</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl p-5 ${
            theme === 'dark'
              ? 'bg-[#111827] border border-[#1F2937]'
              : 'bg-white border border-[#E5E7EB] shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
            <p className={`text-xs ${theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'}`}>
              Current Capital
            </p>
          </div>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
            {formatCurrency(initialCapital)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`rounded-xl p-5 ${
            theme === 'dark'
              ? 'bg-[#111827] border border-[#1F2937]'
              : 'bg-white border border-[#E5E7EB] shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-[#EF4444]" />
            <p className={`text-xs ${theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'}`}>
              Monthly Burn
            </p>
          </div>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
            {formatCurrency(adjustedBurn)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl p-5 ${
            theme === 'dark'
              ? 'bg-[#111827] border border-[#1F2937]'
              : 'bg-white border border-[#E5E7EB] shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className={`w-5 h-5 ${isDangerous ? 'text-[#EF4444]' : 'text-[#16A34A]'}`} />
            <p className={`text-xs ${theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'}`}>
              Runway
            </p>
          </div>
          <p className={`text-2xl font-bold ${isDangerous ? 'text-[#EF4444]' : 'text-[#16A34A]'}`}>
            {runwayMonths === -1 ? "12+" : runwayMonths} months
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`rounded-xl p-5 ${
            theme === 'dark'
              ? 'bg-[#111827] border border-[#1F2937]'
              : 'bg-white border border-[#E5E7EB] shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
            <p className={`text-xs ${theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'}`}>
              Break-Even
            </p>
          </div>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`}>
            {Math.ceil((initialCapital / adjustedBurn) * 1.5)} months
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-xl p-6 ${
          isDangerous
            ? theme === 'dark' 
              ? 'bg-[#111827] border border-[#EF4444]/30' 
              : 'bg-white border border-[#EF4444]/30 shadow-sm'
            : theme === 'dark'
              ? 'bg-[#111827] border border-[#1F2937]'
              : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className={`text-xl font-semibold mb-1 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              Cash Runway Projection
            </h2>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
            }`}>
              12-month forecast based on current burn rate
            </p>
          </div>
          {isDangerous && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              theme === 'dark' 
                ? 'bg-[#EF4444]/20 border border-[#EF4444]/30' 
                : 'bg-[#FEE2E2] border border-[#EF4444]/30'
            }`}>
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <span className="text-sm font-semibold text-[#EF4444]">
                Bankruptcy Warning
              </span>
            </div>
          )}
        </div>

        <div className="h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={runwayData}>
              <defs>
                <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isDangerous ? "#ef4444" : theme === 'dark' ? "#22C55E" : "#16A34A"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={isDangerous ? "#ef4444" : theme === 'dark' ? "#22C55E" : "#16A34A"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme === 'dark' ? '#1F2937' : '#E5E7EB'} 
              />
              <XAxis
                dataKey="month"
                stroke={theme === 'dark' ? '#F9FAFB80' : '#11182780'}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke={theme === 'dark' ? '#F9FAFB80' : '#11182780'}
                style={{ fontSize: "12px" }}
                tickFormatter={formatCurrency}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#111827' : '#FFFFFF',
                  border: `1px solid ${theme === 'dark' ? '#1F2937' : '#E5E7EB'}`,
                  borderRadius: "12px",
                  color: theme === 'dark' ? '#F9FAFB' : '#111827',
                }}
                formatter={(value) => [formatCurrency(value as number), "Cash"]}
              />
              <Area
                type="monotone"
                dataKey="cash"
                stroke={isDangerous ? "#ef4444" : theme === 'dark' ? "#22C55E" : "#16A34A"}
                strokeWidth={3}
                fill="url(#cashGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-xl p-5 ${
            theme === 'dark'
              ? 'bg-[#16A34A]/10 border border-[#16A34A]/20'
              : 'bg-[#DCFCE7] border border-[#16A34A]/20'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#16A34A]" />
            <h3 className="text-sm font-semibold text-[#16A34A]">
              Best Case Scenario
            </h3>
          </div>
          <p className={`text-xs mb-3 ${
            theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
          }`}>
            Revenue kicks in at month 6, reducing burn by 40%
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}>
            18 months runway
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className={`rounded-xl p-5 ${
            theme === 'dark'
              ? 'bg-[#F59E0B]/10 border border-[#F59E0B]/20'
              : 'bg-[#FEF3C7] border border-[#F59E0B]/20'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-sm font-semibold text-[#F59E0B]">
              Expected Scenario
            </h3>
          </div>
          <p className={`text-xs mb-3 ${
            theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
          }`}>
            Current trajectory with minor optimizations
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}>
            {runwayMonths === -1 ? "12+" : runwayMonths} months runway
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`rounded-xl p-5 ${
            theme === 'dark'
              ? 'bg-[#EF4444]/10 border border-[#EF4444]/20'
              : 'bg-[#FEE2E2] border border-[#EF4444]/20'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            <h3 className="text-sm font-semibold text-[#EF4444]">
              Worst Case Scenario
            </h3>
          </div>
          <p className={`text-xs mb-3 ${
            theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
          }`}>
            Unexpected expenses, team expansion, no revenue
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}>
            6 months runway
          </p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
            theme === 'dark'
              ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white'
              : 'bg-[#16A34A] hover:bg-[#15803D] text-white'
          }`}
        >
          Export Financial Model
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
            theme === 'dark'
              ? 'bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB]'
              : 'bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#111827]'
          }`}
        >
          Schedule CFO Consultation
        </motion.button>
      </motion.div>
    </div>
  );
}
