import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface StartupData {
  category: string;
  budget: string;
  experience: string;
  idea: string;
  analysisData: any;
  analyzedAt: string;
}

interface StartupContextType {
  startupData: StartupData | null;
  setStartupData: (data: StartupData) => void;
  clearStartupData: () => void;
  hasAnalysis: boolean;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export function StartupProvider({ children }: { children: ReactNode }) {
  const [startupData, setStartupDataState] = useState<StartupData | null>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('startupData');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (startupData) {
      localStorage.setItem('startupData', JSON.stringify(startupData));
    } else {
      localStorage.removeItem('startupData');
    }
  }, [startupData]);

  const setStartupData = (data: StartupData) => {
    setStartupDataState(data);
  };

  const clearStartupData = () => {
    setStartupDataState(null);
    localStorage.removeItem('startupData');
  };

  const hasAnalysis = startupData !== null;

  return (
    <StartupContext.Provider value={{ startupData, setStartupData, clearStartupData, hasAnalysis }}>
      {children}
    </StartupContext.Provider>
  );
}

export function useStartup() {
  const context = useContext(StartupContext);
  if (context === undefined) {
    throw new Error('useStartup must be used within a StartupProvider');
  }
  return context;
}
