import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, TrendingUp, Users, DollarSign, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CategoryIdeasProps {
  categoryId: string;
  categoryName: string;
  onBack: () => void;
}

interface Idea {
  title: string;
  description: string;
  difficulty: string;
  investment: string;
  marketSize: string;
}

export function CategoryIdeas({ categoryId, categoryName, onBack }: CategoryIdeasProps) {
  const { theme } = useTheme();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchIdeas = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/ideas/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ category: categoryId })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ideas');
      }

      const data = await response.json();
      setIdeas(data.ideas || []);
    } catch (err) {
      console.error('Error fetching ideas:', err);
      setError('Failed to load ideas. Please try again.');
      // Fallback to empty array
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [categoryId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          type="button"
          onClick={onBack}
          className={`flex items-center gap-2 mb-4 px-4 py-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'text-[#F9FAFB] hover:bg-[#1F2937]'
              : 'text-[#111827] hover:bg-[#E5E7EB]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              {categoryName} Ideas
            </h1>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
            }`}>
              AI-generated startup ideas tailored for you
            </p>
          </div>

          <button
            type="button"
            onClick={fetchIdeas}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white'
                : 'bg-[#16A34A] hover:bg-[#15803D] text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Generate New Ideas
          </button>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-[#EF4444]/10 border border-[#EF4444]/20'
              : 'bg-[#FEE2E2] border border-[#EF4444]/20'
          }`}
        >
          <p className="text-[#EF4444]">{error}</p>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22C55E]"></div>
        </div>
      )}

      {/* Ideas Grid */}
      {!loading && ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <motion.div
              key={`${idea.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                theme === 'dark'
                  ? 'bg-[#111827] border border-[#1F2937]'
                  : 'bg-white border border-[#E5E7EB] shadow-sm'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#16A34A]/20'
              }`}>
                <Lightbulb className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                }`} />
              </div>

              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                {idea.title}
              </h3>

              <p className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                {idea.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                  }`} />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    Difficulty: <span className="font-medium">{idea.difficulty}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                  }`} />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    Investment: <span className="font-medium">{idea.investment}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                  }`} />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    Market: <span className="font-medium">{idea.marketSize}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && ideas.length === 0 && !error && (
        <div className={`text-center py-12 ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          <p>No ideas available. Click "Generate New Ideas" to get started!</p>
        </div>
      )}

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-xl ${
          theme === 'dark'
            ? 'bg-[#22C55E]/10 border border-[#22C55E]/20'
            : 'bg-[#DCFCE7] border border-[#16A34A]/20'
        }`}
      >
        <h4 className={`font-semibold mb-2 ${
          theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
        }`}>
          💡 Next Steps
        </h4>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
        }`}>
          Found an idea you like? Head to the Dashboard to analyze it in detail with our AI-powered tools.
          Get competitor analysis, runway calculations, and personalized recommendations. Click "Generate New Ideas" anytime for fresh suggestions!
        </p>
      </motion.div>
    </div>
  );
}
