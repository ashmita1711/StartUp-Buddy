import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Cloud, 
  ShoppingCart, 
  User, 
  Briefcase, 
  Store 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CategoryIdeas } from './CategoryIdeas';

const categories = [
  { 
    id: 'tech', 
    name: 'Tech Startup', 
    icon: Cpu, 
    description: 'Build innovative technology solutions',
    color: '#3B82F6'
  },
  { 
    id: 'saas', 
    name: 'SaaS', 
    icon: Cloud, 
    description: 'Software as a Service products',
    color: '#8B5CF6'
  },
  { 
    id: 'ecommerce', 
    name: 'E-commerce', 
    icon: ShoppingCart, 
    description: 'Online retail and marketplaces',
    color: '#EC4899'
  },
  { 
    id: 'personal', 
    name: 'Personal Brand', 
    icon: User, 
    description: 'Build your personal influence',
    color: '#F59E0B'
  },
  { 
    id: 'service', 
    name: 'Service Business', 
    icon: Briefcase, 
    description: 'Professional and consulting services',
    color: '#10B981'
  },
  { 
    id: 'offline', 
    name: 'Offline Startup', 
    icon: Store, 
    description: 'Traditional brick and mortar business',
    color: '#EF4444'
  },
];

export function Explorer() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);

  if (selectedCategory) {
    return (
      <CategoryIdeas
        categoryId={selectedCategory.id}
        categoryName={selectedCategory.name}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

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
          Startup Explorer
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Discover startup ideas across different categories
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: theme === 'dark' 
                  ? '0 20px 40px rgba(0,0,0,0.4)' 
                  : '0 20px 40px rgba(0,0,0,0.15)' 
              }}
              onClick={() => setSelectedCategory({ id: category.id, name: category.name })}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#111827] border border-[#1F2937]'
                  : 'bg-white border border-[#E5E7EB] shadow-sm'
              }`}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${category.color}20` } as React.CSSProperties}
              >
                <Icon className="w-7 h-7" style={{ color: category.color } as React.CSSProperties} />
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                {category.name}
              </h3>
              
              <p className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                {category.description}
              </p>

              <motion.div 
                className="mt-4 flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <span 
                  className="text-sm font-medium"
                  style={{ color: category.color } as React.CSSProperties}
                >
                  Explore ideas
                </span>
                <span style={{ color: category.color } as React.CSSProperties}>→</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Section */}
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
          💡 Pro Tip
        </h4>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
        }`}>
          Choose a category that aligns with your skills and interests. 
          The best startups are built at the intersection of your passion and market need.
        </p>
      </motion.div>
    </div>
  );
}
