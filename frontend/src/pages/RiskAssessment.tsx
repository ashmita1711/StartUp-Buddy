import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const riskFactors = [
  { name: 'Market Size', score: 85, status: 'good' },
  { name: 'Competition Level', score: 60, status: 'warning' },
  { name: 'Technical Complexity', score: 45, status: 'warning' },
  { name: 'Capital Requirement', score: 75, status: 'good' },
  { name: 'Time to Market', score: 70, status: 'good' },
  { name: 'Regulatory Risk', score: 90, status: 'good' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'good':
      return <CheckCircle className="w-5 h-5 text-[#16A34A]" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
    case 'danger':
      return <XCircle className="w-5 h-5 text-[#EF4444]" />;
    default:
      return null;
  }
};

const getScoreColor = (score: number) => {
  if (score >= 70) return '#16A34A';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
};

export function RiskAssessment() {
  const { theme } = useTheme();
  const overallScore = Math.round(riskFactors.reduce((acc, f) => acc + f.score, 0) / riskFactors.length);

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
          Risk Assessment
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Comprehensive risk analysis for your startup idea
        </p>
      </motion.div>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-xl text-center ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className={`p-4 rounded-2xl ${
            theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
          }`}>
            <ShieldAlert className={`w-8 h-8 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
          </div>
        </div>
        <h2 className={`text-lg font-medium mb-2 ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Overall Risk Score
        </h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="text-6xl font-bold mb-2"
          style={{ color: getScoreColor(overallScore) }}
        >
          {overallScore}%
        </motion.div>
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
          overallScore >= 70 
            ? 'bg-[#DCFCE7] text-[#16A34A]' 
            : 'bg-[#FEF3C7] text-[#F59E0B]'
        }`}>
          {overallScore >= 70 ? 'Low Risk' : overallScore >= 40 ? 'Medium Risk' : 'High Risk'}
        </span>
      </motion.div>

      {/* Risk Factors */}
      <div className={`p-6 rounded-xl ${
        theme === 'dark'
          ? 'bg-[#111827] border border-[#1F2937]'
          : 'bg-white border border-[#E5E7EB] shadow-sm'
      }`}>
        <h3 className={`text-lg font-bold mb-6 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Risk Factors Breakdown
        </h3>
        <div className="space-y-4">
          {riskFactors.map((factor, index) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(factor.status)}
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                  }`}>
                    {factor.name}
                  </span>
                </div>
                <span 
                  className="font-bold"
                  style={{ color: getScoreColor(factor.score) }}
                >
                  {factor.score}%
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
              }`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.score}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getScoreColor(factor.score) }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
