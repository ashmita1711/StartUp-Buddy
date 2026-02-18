import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Cloud, ShoppingCart, User, Briefcase, Store,
  Wallet, GraduationCap, ArrowRight, Sparkles, TrendingUp
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useStartup } from '../contexts/StartupContext';
import { CompetitorAnalyzer } from '../components/CompetitorAnalyzer';
import { RunwayCalculator } from '../components/RunwayCalculator';
import { PersonaReport } from '../components/PersonaReport';
import { StartupCard } from '../components/StartupCard';
import { RoadmapSection } from '../components/RoadmapSection';

const categories = [
  { id: 'tech', name: 'Tech Startup', icon: Cpu, color: '#3B82F6', description: 'Build innovative technology solutions' },
  { id: 'saas', name: 'SaaS', icon: Cloud, color: '#8B5CF6', description: 'Software as a Service products' },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, color: '#EC4899', description: 'Online retail and marketplaces' },
  { id: 'personal', name: 'Personal Brand', icon: User, color: '#F59E0B', description: 'Build your personal influence' },
  { id: 'service', name: 'Service Business', icon: Briefcase, color: '#10B981', description: 'Professional and consulting services' },
  { id: 'offline', name: 'Offline Startup', icon: Store, color: '#EF4444', description: 'Traditional brick and mortar business' },
];

const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

// Helper functions for dynamic co-founder profile generation
function getCoFounderRole(category: string, experience: string): string {
  const roleMap: Record<string, string> = {
    tech: experience === 'Beginner' ? 'Technical Co-Founder (Senior)' : 'Business Development Co-Founder',
    saas: experience === 'Beginner' ? 'Technical Co-Founder' : 'Growth & Marketing Co-Founder',
    ecommerce: 'Operations & Supply Chain Co-Founder',
    personal: 'Marketing & Community Co-Founder',
    service: 'Sales & Client Relations Co-Founder',
    offline: 'Operations & Management Co-Founder'
  };
  return roleMap[category] || 'Technical Co-Founder';
}

function getCoFounderPersonality(experience: string): string {
  if (experience === 'Beginner') return 'Patient Mentor, Detail-Oriented';
  if (experience === 'Expert') return 'Strategic Thinker, Execution-Focused';
  return 'Collaborative, Problem Solver';
}

function getCoFounderSkills(category: string): string[] {
  const skillsMap: Record<string, string[]> = {
    tech: ['Full-Stack Development', 'System Architecture', 'DevOps', 'Technical Leadership'],
    saas: ['Product Management', 'Growth Hacking', 'SaaS Metrics', 'Customer Success'],
    ecommerce: ['Supply Chain', 'Inventory Management', 'Logistics', 'Vendor Relations'],
    personal: ['Content Strategy', 'Social Media', 'Community Building', 'Brand Development'],
    service: ['Client Management', 'Sales Strategy', 'Process Optimization', 'Team Leadership'],
    offline: ['Operations Management', 'Local Marketing', 'Staff Training', 'Financial Planning']
  };
  return skillsMap[category] || ['Business Strategy', 'Operations', 'Marketing', 'Finance'];
}

function getCoFounderStrength(experience: string): string {
  if (experience === 'Beginner') return 'Brings expertise you lack';
  if (experience === 'Expert') return 'Complements your vision';
  return 'Balances your skillset';
}

function getCoFounderWeakness(experience: string): string {
  if (experience === 'Beginner') return 'May move too fast initially';
  if (experience === 'Expert') return 'Needs alignment on vision';
  return 'Requires clear communication';
}

export function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { startupData, setStartupData, clearStartupData } = useStartup();
  
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [experience, setExperience] = useState('');
  const [idea, setIdea] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    if (startupData) {
      setSelectedCategory(startupData.category);
      setBudget(startupData.budget);
      setExperience(startupData.experience);
      setIdea(startupData.idea);
      setAnalysisData(startupData.analysisData);
      setShowResults(true);
    }
  }, []);

  // Word count helper
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const wordCount = getWordCount(idea);
  const isIdeaValid = wordCount >= 100;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep(2);
  };

  const handleDetailsSubmit = () => {
    if (budget && experience) {
      setStep(3);
    }
  };

  const handleIdeaSubmit = async () => {
    if (idea.trim() && isIdeaValid) {
      setIsAnalyzing(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/api/dashboard/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            category: selectedCategory,
            budget,
            experience,
            idea
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAnalysisData(data.data);
          
          // Save to context
          setStartupData({
            category: selectedCategory,
            budget,
            experience,
            idea,
            analysisData: data.data,
            analyzedAt: new Date().toISOString()
          });
          
          setShowResults(true);
        } else {
          console.error('Analysis failed');
          setShowResults(true);
        }
      } catch (error) {
        console.error('Analysis error:', error);
        setShowResults(true);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCategory('');
    setBudget('');
    setExperience('');
    setIdea('');
    setShowResults(false);
    setAnalysisData(null);
    clearStartupData(); // Clear from context
  };

  // Use real analysis data - no fallback mock data
  const startupRecommendations = analysisData?.recommendations || [];
  const competitors = analysisData?.competitors || [];
  const roadmap = analysisData?.roadmap || [];
  const marketSaturation = competitors.length > 0 
    ? Math.round((competitors.filter((c: any) => c.level === 'High').length / competitors.length) * 100)
    : 0;

  if (showResults) {
    return (
      <div className="space-y-8 pt-[42px]">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              Your Startup Analysis 🚀
            </h1>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
            }`}>
              Based on your inputs: {selectedCategory} • ₹{budget} • {experience}
            </p>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
                : 'bg-white text-[#111827] hover:bg-[#E5E7EB] border border-[#E5E7EB]'
            }`}
          >
            Start New Analysis
          </motion.button>
        </motion.div>

        {/* Startup Recommendations */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}
          >
            Recommended Startup Ideas
          </motion.h2>
          {startupRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {startupRecommendations.map((startup: any, index: number) => (
                <StartupCard key={startup.title} {...startup} delay={index * 0.1} />
              ))}
            </div>
          ) : (
            <div className={`p-6 rounded-xl text-center ${
              theme === 'dark' ? 'bg-[#111827] border border-[#1F2937]' : 'bg-white border border-[#E5E7EB]'
            }`}>
              <p className={theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'}>
                No recommendations available. Try analyzing your idea again.
              </p>
            </div>
          )}
        </div>

        {/* Analysis Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CompetitorAnalyzer
            startupIdea={idea || "Your Startup Idea"}
            competitors={competitors}
            saturationPercentage={marketSaturation}
          />
          <RunwayCalculator />
        </div>

        {/* Roadmap Section */}
        {roadmap.length > 0 && <RoadmapSection roadmap={roadmap} />}

        {/* Co-Founder Persona */}
        {analysisData?.coFounderProfile ? (
          <PersonaReport
            role={analysisData.coFounderProfile.role}
            personality={analysisData.coFounderProfile.personality}
            skills={analysisData.coFounderProfile.skills}
            strength={analysisData.coFounderProfile.strength}
            weakness={analysisData.coFounderProfile.weakness}
          />
        ) : (
          <PersonaReport
            role={getCoFounderRole(selectedCategory, experience)}
            personality={getCoFounderPersonality(experience)}
            skills={getCoFounderSkills(selectedCategory)}
            strength={getCoFounderStrength(experience)}
            weakness={getCoFounderWeakness(experience)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-[42px]">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Welcome back, {user?.name || 'Entrepreneur'} 👋
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Let's analyze your startup idea and create a success roadmap
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
              step >= s
                ? theme === 'dark'
                  ? 'bg-[#22C55E] text-white'
                  : 'bg-[#16A34A] text-white'
                : theme === 'dark'
                  ? 'bg-[#1F2937] text-[#F9FAFB]/40'
                  : 'bg-[#E5E7EB] text-[#111827]/40'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 rounded ${
                step > s
                  ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                  : theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Category Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-[#111827] border border-[#1F2937]'
                : 'bg-white border border-[#E5E7EB] shadow-sm'
            }`}>
              <h2 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Step 1: Choose Your Startup Category
              </h2>
              <p className={`mb-6 ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Select the category that best matches your startup idea
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      type="button"
                      key={category.id}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`p-6 rounded-xl text-left transition-all ${
                        theme === 'dark'
                          ? 'bg-[#1F2937] hover:bg-[#374151] border border-[#374151]'
                          : 'bg-[#F9FAFB] hover:bg-white border border-[#E5E7EB]'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          category.id === 'tech' ? 'bg-blue-500/20' :
                          category.id === 'saas' ? 'bg-purple-500/20' :
                          category.id === 'ecommerce' ? 'bg-pink-500/20' :
                          category.id === 'personal' ? 'bg-amber-500/20' :
                          category.id === 'service' ? 'bg-green-500/20' :
                          'bg-red-500/20'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${
                          category.id === 'tech' ? 'text-blue-500' :
                          category.id === 'saas' ? 'text-purple-500' :
                          category.id === 'ecommerce' ? 'text-pink-500' :
                          category.id === 'personal' ? 'text-amber-500' :
                          category.id === 'service' ? 'text-green-500' :
                          'text-red-500'
                        }`} />
                      </div>
                      <h3 className={`font-bold mb-1 ${
                        theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                      }`}>
                        {category.name}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                      }`}>
                        {category.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Budget & Experience */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-[#111827] border border-[#1F2937]'
                : 'bg-white border border-[#E5E7EB] shadow-sm'
            }`}>
              <h2 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Step 2: Your Details
              </h2>
              <p className={`mb-6 ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Tell us about your budget and experience level
              </p>

              <div className="space-y-6">
                {/* Budget Input */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    <Wallet className="inline w-4 h-4 mr-2" />
                    Initial Budget (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., 50000"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                      theme === 'dark'
                        ? 'bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus:ring-[#22C55E]'
                        : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A]'
                    }`}
                  />
                </div>

                {/* Experience Level */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    <GraduationCap className="inline w-4 h-4 mr-2" />
                    Experience Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {experienceLevels.map((level) => (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setExperience(level)}
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          experience === level
                            ? theme === 'dark'
                              ? 'bg-[#22C55E] text-white'
                              : 'bg-[#16A34A] text-white'
                            : theme === 'dark'
                              ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
                              : 'bg-[#F9FAFB] text-[#111827] hover:bg-white border border-[#E5E7EB]'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
                        : 'bg-[#E5E7EB] text-[#111827] hover:bg-[#D1D5DB]'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleDetailsSubmit}
                    disabled={!budget || !experience}
                    className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      budget && experience
                        ? theme === 'dark'
                          ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
                          : 'bg-[#16A34A] text-white hover:bg-[#15803D]'
                        : 'bg-[#374151] text-[#F9FAFB]/40 cursor-not-allowed'
                    }`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Describe Idea */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-[#111827] border border-[#1F2937]'
                : 'bg-white border border-[#E5E7EB] shadow-sm'
            }`}>
              <h2 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Step 3: Describe Your Startup Idea
              </h2>
              <p className={`mb-6 ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Tell us about your startup idea in detail
              </p>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    <Sparkles className="inline w-4 h-4 mr-2" />
                    Your Startup Idea
                  </label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea, target audience, unique value proposition, and how you plan to solve a problem... (minimum 100 words)"
                    rows={8}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 resize-none ${
                      theme === 'dark'
                        ? 'bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus:ring-[#22C55E] placeholder-[#F9FAFB]/40'
                        : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A] placeholder-[#111827]/40'
                    }`}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs ${
                      wordCount < 100
                        ? 'text-[#EF4444]'
                        : theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                    }`}>
                      {wordCount}/100 words {wordCount < 100 ? '(minimum required)' : '✓'}
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                    }`}>
                      {idea.length} characters
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
                        : 'bg-[#E5E7EB] text-[#111827] hover:bg-[#D1D5DB]'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleIdeaSubmit}
                    disabled={!isIdeaValid || isAnalyzing}
                    className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isIdeaValid && !isAnalyzing
                        ? theme === 'dark'
                          ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
                          : 'bg-[#16A34A] text-white hover:bg-[#15803D]'
                        : 'bg-[#374151] text-[#F9FAFB]/40 cursor-not-allowed'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        Generate Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
