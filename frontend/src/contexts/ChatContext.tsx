import { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatContextType {
  messages: Message[];
  addMessage: (text: string, sender: 'user' | 'bot') => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const initialMessage: Message = {
  id: 1,
  text: "Hi! I'm your AI Mentor. I can help you with:\n\n• Idea validation and market research\n• Go-to-market strategies\n• Growth tactics and scaling\n• Team building and hiring\n• Financial planning and runway\n• Competitor analysis\n• Risk assessment\n\nWhat would you like to discuss today?",
  sender: 'bot'
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([initialMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
