import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageCircle, Lightbulb, Target, TrendingUp, Users, ArrowLeft, RotateCcw, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../contexts/ChatContext';
import { useStartup } from '../contexts/StartupContext';

interface Topic {
  icon: typeof Lightbulb;
  title: string;
  description: string;
  content: {
    intro: string;
    tips: string[];
    resources: string[];
  };
}

const mentorTopics: Topic[] = [
  {
    icon: Lightbulb,
    title: 'Idea Validation',
    description: 'Get feedback on your startup idea and market fit',
    content: {
      intro: 'Validating your startup idea is crucial before investing time and money. Here are key steps to validate your idea effectively:',
      tips: [
        'Talk to at least 50 potential customers before building anything',
        'Create a landing page to test interest and collect emails',
        'Run small paid ad campaigns to gauge market demand',
        'Build a minimal viable product (MVP) to test core assumptions',
        'Analyze competitor solutions and identify gaps in the market',
        'Use surveys and interviews to understand pain points deeply'
      ],
      resources: [
        'The Mom Test - Book on customer interviews',
        'Lean Startup methodology by Eric Ries',
        'Y Combinator\'s Startup School resources'
      ]
    }
  },
  {
    icon: Target,
    title: 'Go-to-Market Strategy',
    description: 'Learn how to launch and acquire your first customers',
    content: {
      intro: 'A solid go-to-market strategy helps you reach your target customers efficiently and cost-effectively:',
      tips: [
        'Define your ideal customer profile (ICP) with specific demographics',
        'Choose 1-2 primary channels to focus on initially',
        'Create compelling messaging that addresses customer pain points',
        'Leverage content marketing to build authority and trust',
        'Use cold outreach strategically for B2B products',
        'Build partnerships with complementary businesses',
        'Offer early adopter discounts to gain initial traction'
      ],
      resources: [
        'Traction: How Any Startup Can Achieve Explosive Growth',
        'Product-Market Fit frameworks',
        'Growth hacking case studies'
      ]
    }
  },
  {
    icon: TrendingUp,
    title: 'Growth Tactics',
    description: 'Scale your startup with proven growth strategies',
    content: {
      intro: 'Once you have product-market fit, these tactics will help you scale efficiently:',
      tips: [
        'Implement referral programs to leverage word-of-mouth',
        'Optimize your conversion funnel at every stage',
        'Use retargeting ads to re-engage interested visitors',
        'Create viral loops within your product experience',
        'Build a community around your product or brand',
        'Invest in SEO for long-term organic growth',
        'Experiment with different pricing strategies',
        'Focus on retention - it\'s cheaper than acquisition'
      ],
      resources: [
        'Reforge growth programs',
        'Andrew Chen\'s growth essays',
        'Brian Balfour\'s growth frameworks'
      ]
    }
  },
  {
    icon: Users,
    title: 'Team Building',
    description: 'Advice on hiring and building your dream team',
    content: {
      intro: 'Building the right team is critical for startup success. Here\'s how to do it effectively:',
      tips: [
        'Hire for attitude and cultural fit, train for skills',
        'Start with contractors before making full-time hires',
        'Look for T-shaped people with deep expertise and broad knowledge',
        'Create a compelling mission to attract top talent',
        'Offer equity to align incentives with company success',
        'Build a diverse team with complementary skills',
        'Establish clear roles and responsibilities early',
        'Invest in onboarding and continuous learning'
      ],
      resources: [
        'First Round Review hiring guides',
        'The Hard Thing About Hard Things by Ben Horowitz',
        'Remote work best practices'
      ]
    }
  },
];

export function Mentor() {
  const { theme } = useTheme();
  const { startupData } = useStartup();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  if (showChatbot) {
    return <ChatbotPage onBack={() => setShowChatbot(false)} startupData={startupData} />;
  }

  if (selectedTopic) {
    return (
      <TopicDetailPage 
        topic={selectedTopic} 
        onBack={() => setSelectedTopic(null)} 
      />
    );
  }

  return (
    <div className="space-y-8 pt-[47px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
          theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
        }`}>
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h1 className={`text-3xl font-bold mb-3 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          AI Mentor
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Your personal startup advisor powered by AI. Get instant guidance on any aspect of your entrepreneurial journey.
        </p>
      </motion.div>

      {/* Startup Context Banner */}
      {startupData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl flex items-start gap-3 ${
            theme === 'dark'
              ? 'bg-[#22C55E]/10 border border-[#22C55E]/20'
              : 'bg-[#DCFCE7] border border-[#16A34A]/20'
          }`}
        >
          <Info className={`w-5 h-5 mt-0.5 shrink-0 ${
            theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
          }`} />
          <div>
            <p className={`text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
            }`}>
              AI Mentor is now aware of your startup!
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
            }`}>
              {startupData.category} • ₹{startupData.budget} • {startupData.experience} • Analyzed {new Date(startupData.analyzedAt).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      )}

      {!startupData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl flex items-start gap-3 ${
            theme === 'dark'
              ? 'bg-[#F59E0B]/10 border border-[#F59E0B]/20'
              : 'bg-[#FEF3C7] border border-[#F59E0B]/20'
          }`}
        >
          <Info className="w-5 h-5 mt-0.5 shrink-0 text-[#F59E0B]" />
          <div>
            <p className="text-sm font-medium mb-1 text-[#F59E0B]">
              Get personalized advice!
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
            }`}>
              Analyze your startup idea on the Dashboard first, then AI Mentor can provide specific guidance tailored to your situation.
            </p>
          </div>
        </motion.div>
      )}

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentorTopics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.button
              type="button"
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTopic(topic)}
              className={`p-5 rounded-xl cursor-pointer transition-all duration-300 text-left ${
                theme === 'dark'
                  ? 'bg-[#111827] border border-[#1F2937] hover:border-[#22C55E]/50'
                  : 'bg-white border border-[#E5E7EB] shadow-sm hover:border-[#16A34A]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${
                  theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
                }`}>
                  <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${
                    theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                  }`}>
                    {topic.title}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                  }`}>
                    {topic.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-8 rounded-xl text-center ${
          theme === 'dark'
            ? 'bg-[linear-gradient(to_bottom_right,rgb(34_197_94/0.2),rgb(22_163_74/0.1))] border border-[#22C55E]/20'
            : 'bg-[linear-gradient(to_bottom_right,rgb(220_252_231),rgb(240_253_244))] border border-[#16A34A]/20'
        }`}
      >
        <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${
          theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
        }`} />
        <h3 className={`text-xl font-bold mb-2 ${
          theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
        }`}>
          Start a Conversation
        </h3>
        <p className={`text-sm mb-4 ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Chat with AI Mentor for personalized startup advice
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChatbot(true)}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all ${
            theme === 'dark' 
              ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]' 
              : 'bg-[#16A34A] text-white hover:bg-[#15803D]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          AI Mentor is Online - Click to Chat
        </motion.button>
      </motion.div>
    </div>
  );
}


// Topic Detail Page Component
function TopicDetailPage({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const { theme } = useTheme();
  const Icon = topic.icon;

  return (
    <div className="space-y-6">
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'text-[#F9FAFB] hover:bg-[#1F2937]'
            : 'text-[#111827] hover:bg-[#E5E7EB]'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Topics
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 rounded-xl ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-xl ${
            theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
          }`}>
            <Icon className={`w-8 h-8 ${theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'}`} />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              {topic.title}
            </h1>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
            }`}>
              {topic.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className={`text-base mb-4 ${
              theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
            }`}>
              {topic.content.intro}
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              Key Tips & Strategies
            </h3>
            <div className="space-y-3">
              {topic.content.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                  }`}>
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    {tip}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              Recommended Resources
            </h3>
            <div className="space-y-2">
              {topic.content.resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                  }`} />
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                  }`}>
                    {resource}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Chatbot Page Component
function ChatbotPage({ onBack, startupData }: { onBack: () => void; startupData: any }) {
  const { theme } = useTheme();
  const { messages, addMessage, clearMessages } = useChat();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Send initial context message when chatbot opens
  useEffect(() => {
    if (messages.length === 0 && startupData) {
      const welcomeMessage = `Hi! I've reviewed your ${startupData.category} startup idea. I'm here to help with any questions about your journey. What would you like to discuss?`;
      addMessage(welcomeMessage, 'bot');
    } else if (messages.length === 0 && !startupData) {
      const welcomeMessage = `Hi! I'm your AI Mentor. I can help with startup advice, but for personalized guidance, please analyze your startup idea on the Dashboard first. What can I help you with today?`;
      addMessage(welcomeMessage, 'bot');
    }
  }, []);

  const botResponses: Record<string, string> = {
    'idea': "Great! Let's validate your idea. First, tell me: What problem does your startup solve? Who are your target customers?",
    'market': "Market research is crucial! I recommend: 1) Talk to 50+ potential customers, 2) Analyze competitors, 3) Test with a landing page. What's your target market?",
    'growth': "For growth, focus on: 1) Product-market fit first, 2) One channel at a time, 3) Measure everything. What's your current stage?",
    'team': "Building a great team starts with: 1) Clear roles, 2) Cultural fit, 3) Complementary skills. Are you looking for co-founders or employees?",
    'funding': "For funding, consider: 1) Bootstrapping initially, 2) Angel investors for early stage, 3) VCs for scaling. What's your funding goal?",
    'competitor': "Competitor analysis helps you differentiate. I can help you: 1) Identify key competitors, 2) Analyze their strengths/weaknesses, 3) Find market gaps. Who are your main competitors?",
    'runway': "Let's calculate your runway! I need: 1) Current cash balance, 2) Monthly burn rate, 3) Expected revenue. What are your numbers?",
    'default': "That's a great question! Based on your startup journey, I'd recommend: 1) Focus on customer feedback, 2) Iterate quickly, 3) Measure key metrics. Can you tell me more about your specific situation?"
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    addMessage(input, 'user');
    const userInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/mentor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        addMessage(data.response, 'bot');
      } else {
        // Fallback to local responses if API fails
        const lowerInput = userInput.toLowerCase();
        let fallbackResponse = botResponses.default;

        for (const [key, value] of Object.entries(botResponses)) {
          if (lowerInput.includes(key)) {
            fallbackResponse = value;
            break;
          }
        }
        addMessage(fallbackResponse, 'bot');
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to local responses on error
      const lowerInput = userInput.toLowerCase();
      let fallbackResponse = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          fallbackResponse = value;
          break;
        }
      }
      addMessage(fallbackResponse, 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'text-[#F9FAFB] hover:bg-[#1F2937]'
            : 'text-[#111827] hover:bg-[#E5E7EB]'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Mentor
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}
      >
        {/* Header */}
        <div className={`p-4 flex items-center gap-3 border-b ${
          theme === 'dark' ? 'bg-[#0F172A] border-[#1F2937]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
        }`}>
          <div className={`p-3 rounded-xl ${
            theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
          }`}>
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={`font-bold ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              AI Mentor
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
            }`}>
              Online • Ready to help
            </p>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearMessages}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark'
                ? 'hover:bg-[#1F2937] text-[#F9FAFB]'
                : 'hover:bg-[#E5E7EB] text-[#111827]'
            }`}
            title="Start New Chat"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${
                message.sender === 'bot'
                  ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                  : theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
              }`}>
                {message.sender === 'bot' 
                  ? <Bot className="w-5 h-5 text-white" />
                  : <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`} />
                }
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                message.sender === 'bot'
                  ? theme === 'dark'
                    ? 'bg-[#0F172A] text-[#F9FAFB]'
                    : 'bg-[#F9FAFB] text-[#111827]'
                  : theme === 'dark'
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-[#16A34A] text-white'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3"
            >
              <div className={`p-2 rounded-xl ${
                theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
              }`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
              }`}>
                <div className="flex gap-1">
                  <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:0ms] ${
                    theme === 'dark' ? 'bg-[#F9FAFB]' : 'bg-[#111827]'
                  }`} />
                  <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:150ms] ${
                    theme === 'dark' ? 'bg-[#F9FAFB]' : 'bg-[#111827]'
                  }`} />
                  <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:300ms] ${
                    theme === 'dark' ? 'bg-[#F9FAFB]' : 'bg-[#111827]'
                  }`} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-[#1F2937]' : 'border-[#E5E7EB]'
        }`}>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything about your startup..."
              className={`flex-1 px-4 py-3 rounded-xl outline-none transition-all ${
                theme === 'dark'
                  ? 'bg-[#0F172A] border border-[#1F2937] text-[#F9FAFB] placeholder:text-[#F9FAFB]/40 focus:border-[#22C55E]'
                  : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] placeholder:text-[#111827]/40 focus:border-[#16A34A]'
              }`}
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`p-3 rounded-xl transition-all ${
                input.trim()
                  ? theme === 'dark' 
                    ? 'bg-[#22C55E] hover:bg-[#16A34A]' 
                    : 'bg-[#16A34A] hover:bg-[#15803D]'
                  : 'bg-[#374151] cursor-not-allowed'
              }`}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
