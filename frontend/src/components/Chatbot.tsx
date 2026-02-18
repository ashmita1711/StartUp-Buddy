import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../contexts/ChatContext';

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

export function Chatbot() {
  const { theme } = useTheme();
  const { messages, addMessage, clearMessages } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
    <>
      {/* Floating Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-2xl shadow-lg z-50 flex items-center gap-2 ${
          theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
        }`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="text-white font-medium hidden sm:block">Ask AI Mentor</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl z-50 overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#111827] border border-[#1F2937]'
                : 'bg-white border border-[#E5E7EB]'
            }`}
          >
            {/* Header */}
            <div className={`p-4 flex items-center justify-between ${
              theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                }`}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                  }`}>
                    AI Mentor
                  </h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                  }`}>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-xl transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-[#1F2937] text-[#F9FAFB]'
                      : 'hover:bg-[#E5E7EB] text-[#111827]'
                  }`}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${
                    message.sender === 'bot'
                      ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                      : theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#E5E7EB]'
                  }`}>
                    {message.sender === 'bot' 
                      ? <Bot className="w-4 h-4 text-white" />
                      : <User className={`w-4 h-4 ${theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'}`} />
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
                  className="flex items-start gap-2"
                >
                  <div className={`p-2 rounded-xl ${
                    theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                  }`}>
                    <Bot className="w-4 h-4 text-white" />
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
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
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
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
