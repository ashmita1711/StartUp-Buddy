import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, email: string, password: string, mode?: 'signin' | 'signup') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username: string, email: string, password: string, mode: 'signin' | 'signup' = 'signin'): Promise<boolean> => {
    try {
      let response;

      if (mode === 'signup') {
        // Sign Up mode - register new user
        response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name: username }),
        });
      } else {
        // Sign In mode - login existing user
        response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Authentication failed' }));
        console.error('Authentication failed:', error);
        
        if (mode === 'signup' && response.status === 400) {
          alert('User already exists. Please sign in instead.');
        } else if (mode === 'signin' && response.status === 401) {
          alert('Invalid credentials. Please check your email and password.');
        } else {
          alert(error.error || 'Authentication failed. Please try again.');
        }
        return false;
      }

      const data = await response.json();
      
      // Store token and user data
      const userData = {
        username: data.user.name || username,
        email: data.user.email,
        name: data.user.name || username.charAt(0).toUpperCase() + username.slice(1),
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', data.token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      alert('Cannot connect to server. Please make sure the backend is running on http://localhost:3000');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
