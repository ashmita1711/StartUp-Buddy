import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Brain, Mail, Lock, ArrowRight, User, Sparkles, TrendingUp, Zap } from 'lucide-react';

type AuthMode = 'signin' | 'signup';

export function Login() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate username
    if (!username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    // Validate password match for signup
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const success = await login(username, email, password, mode);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(mode === 'signin' ? 'Invalid credentials' : 'Registration failed');
    }
    setLoading(false);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#0F172A]' : 'bg-gradient-to-br from-[#F0FDF4] via-[#F9FAFB] to-[#DCFCE7]'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 ${
            theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20 ${
            theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
          }`}
        />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                }`}>
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${
                    theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                  }`}>
                    Startup Buddy
                  </h1>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                  }`}>
                    Your AI-Powered Startup Companion
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-[#111827]/50' : 'bg-white/50'
                  } backdrop-blur-sm`}
                >
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
                  }`}>
                    <Sparkles className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                    }`}>
                      AI-Powered Insights
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                    }`}>
                      Get personalized startup advice from our AI mentor
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-[#111827]/50' : 'bg-white/50'
                  } backdrop-blur-sm`}
                >
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
                  }`}>
                    <TrendingUp className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                    }`}>
                      Smart Analytics
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                    }`}>
                      Track your startup's growth and financial runway
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-[#111827]/50' : 'bg-white/50'
                  } backdrop-blur-sm`}
                >
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
                  }`}>
                    <Zap className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                    }`}>
                      Fast & Easy
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                    }`}>
                      Get started in minutes with our intuitive platform
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl shadow-2xl p-8 ${
              theme === 'dark'
                ? 'bg-[#111827] border border-[#1F2937]'
                : 'bg-white border border-[#E5E7EB]'
            }`}
          >
            {/* Tab Switcher */}
            <div className={`flex gap-2 p-1 rounded-xl mb-6 ${
              theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]'
            }`}>
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  mode === 'signin'
                    ? theme === 'dark'
                      ? 'bg-[#22C55E] text-white'
                      : 'bg-[#16A34A] text-white'
                    : theme === 'dark'
                      ? 'text-[#F9FAFB]/60 hover:text-[#F9FAFB]'
                      : 'text-[#111827]/60 hover:text-[#111827]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  mode === 'signup'
                    ? theme === 'dark'
                      ? 'bg-[#22C55E] text-white'
                      : 'bg-[#16A34A] text-white'
                    : theme === 'dark'
                      ? 'text-[#F9FAFB]/60 hover:text-[#F9FAFB]'
                      : 'text-[#111827]/60 hover:text-[#111827]'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className={`mt-2 text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                {mode === 'signin' 
                  ? 'Sign in to continue your startup journey'
                  : 'Join thousands of entrepreneurs building their dreams'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Username */}
                  <div>
                    <label htmlFor="username" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                    }`}>
                      Username
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-3 h-5 w-5 ${
                        theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                      }`} />
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`pl-10 block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                          theme === 'dark'
                            ? 'focus:ring-[#22C55E] focus:border-[#22C55E] bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] placeholder-[#F9FAFB]/40'
                            : 'focus:ring-[#16A34A] focus:border-[#16A34A] bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] placeholder-[#111827]/40'
                        }`}
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                    }`}>
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-3 h-5 w-5 ${
                        theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                      }`} />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                          theme === 'dark'
                            ? 'focus:ring-[#22C55E] focus:border-[#22C55E] bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] placeholder-[#F9FAFB]/40'
                            : 'focus:ring-[#16A34A] focus:border-[#16A34A] bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] placeholder-[#111827]/40'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                    }`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-3 h-5 w-5 ${
                        theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                      }`} />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                          theme === 'dark'
                            ? 'focus:ring-[#22C55E] focus:border-[#22C55E] bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] placeholder-[#F9FAFB]/40'
                            : 'focus:ring-[#16A34A] focus:border-[#16A34A] bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] placeholder-[#111827]/40'
                        }`}
                        placeholder="Enter password (min 8 characters)"
                      />
                    </div>
                  </div>

                  {/* Confirm Password (Sign Up only) */}
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                      }`}>
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className={`absolute left-3 top-3 h-5 w-5 ${
                          theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
                        }`} />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required={mode === 'signup'}
                          minLength={8}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`pl-10 block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                            theme === 'dark'
                              ? 'focus:ring-[#22C55E] focus:border-[#22C55E] bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] placeholder-[#F9FAFB]/40'
                              : 'focus:ring-[#16A34A] focus:border-[#16A34A] bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] placeholder-[#111827]/40'
                          }`}
                          placeholder="Confirm your password"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-3 ${
                    theme === 'dark'
                      ? 'bg-[#EF4444]/10 border border-[#EF4444]/20'
                      : 'bg-[#FEE2E2] border border-[#EF4444]/20'
                  }`}
                >
                  <p className="text-[#EF4444] text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  theme === 'dark'
                    ? 'bg-[#22C55E] hover:bg-[#16A34A] focus:ring-[#22C55E]'
                    : 'bg-[#16A34A] hover:bg-[#15803D] focus:ring-[#16A34A]'
                }`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className={`mt-6 text-center text-xs ${
              theme === 'dark' ? 'text-[#F9FAFB]/50' : 'text-[#111827]/50'
            }`}>
              <p>
                {mode === 'signin' 
                  ? "Don't have an account? Click Sign Up above"
                  : 'Already have an account? Click Sign In above'
                }
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
