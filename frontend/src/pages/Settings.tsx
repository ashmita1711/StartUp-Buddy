import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Palette, LogOut, Camera, Mail, Phone, MapPin, Save, X, Lock, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

type ModalView = 'none' | 'profile' | 'security';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [modalView, setModalView] = useState<ModalView>('none');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: ''
  });

  // Security form state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    newsletter: true
  });

  const handleProfileSave = () => {
    // Save profile logic here
    console.log('Saving profile:', profileData);
    setModalView('none');
  };

  const handleSecuritySave = () => {
    // Save security logic here
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Updating password');
    setModalView('none');
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

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
          Settings
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
        }`}>
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Account Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
          theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
        }`}>
          Account
        </h2>
        <div className={`rounded-xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}>
          {/* Profile Settings */}
          <motion.button
            type="button"
            whileHover={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' }}
            onClick={() => setModalView('profile')}
            className={`w-full p-4 flex items-center justify-between cursor-pointer transition-colors border-b ${
              theme === 'dark' ? 'border-[#1F2937]' : 'border-[#E5E7EB]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${
                theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#F9FAFB]'
              }`}>
                <User className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                }`} />
              </div>
              <div className="text-left">
                <h3 className={`font-medium ${
                  theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                }`}>
                  Profile Settings
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                }`}>
                  Manage your account details
                </p>
              </div>
            </div>
            <span className={theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'}>
              →
            </span>
          </motion.button>

          {/* Security */}
          <motion.button
            type="button"
            whileHover={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' }}
            onClick={() => setModalView('security')}
            className="w-full p-4 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${
                theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#F9FAFB]'
              }`}>
                <Shield className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                }`} />
              </div>
              <div className="text-left">
                <h3 className={`font-medium ${
                  theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                }`}>
                  Security
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                }`}>
                  Password and authentication
                </p>
              </div>
            </div>
            <span className={theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'}>
              →
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
          theme === 'dark' ? 'text-[#F9FAFB]/40' : 'text-[#111827]/40'
        }`}>
          Preferences
        </h2>

        {/* Notifications */}
        <div className={`rounded-xl p-4 mb-4 ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' ? 'bg-[#1F2937]' : 'bg-[#F9FAFB]'
            }`}>
              <Bell className={`w-5 h-5 ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`} />
            </div>
            <div>
              <h3 className={`font-medium ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Notifications
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Configure notification preferences
              </p>
            </div>
          </div>

          <div className="space-y-3 ml-14">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Email Notifications
              </span>
              <motion.button
                type="button"
                aria-label="Toggle email notifications"
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                className={`w-14 h-8 rounded-full relative transition-colors ${
                  notifications.email 
                    ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                    : 'bg-[#E5E7EB]'
                }`}
              >
                <motion.div
                  animate={{ x: notifications.email ? 26 : 4 }}
                  className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm"
                />
              </motion.button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Push Notifications
              </span>
              <motion.button
                type="button"
                aria-label="Toggle push notifications"
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                className={`w-14 h-8 rounded-full relative transition-colors ${
                  notifications.push 
                    ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                    : 'bg-[#E5E7EB]'
                }`}
              >
                <motion.div
                  animate={{ x: notifications.push ? 26 : 4 }}
                  className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm"
                />
              </motion.button>
            </div>

            {/* Newsletter */}
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Newsletter Subscription
              </span>
              <motion.button
                type="button"
                aria-label="Toggle newsletter subscription"
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotifications(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                className={`w-14 h-8 rounded-full relative transition-colors ${
                  notifications.newsletter 
                    ? theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
                    : 'bg-[#E5E7EB]'
                }`}
              >
                <motion.div
                  animate={{ x: notifications.newsletter ? 26 : 4 }}
                  className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm"
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className={`p-4 rounded-xl flex items-center justify-between ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB] shadow-sm'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${
              theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
            }`}>
              <Palette className={`w-5 h-5 ${
                theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
              }`} />
            </div>
            <div>
              <h3 className={`font-medium ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Dark Mode
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Toggle dark theme
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            aria-label="Toggle dark mode"
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`w-14 h-8 rounded-full relative transition-colors ${
              theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#E5E7EB]'
            }`}
          >
            <motion.div
              animate={{ x: theme === 'dark' ? 26 : 4 }}
              className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm"
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={logout}
        className={`w-full p-4 rounded-xl flex items-center justify-center gap-2 transition-colors ${
          theme === 'dark'
            ? 'bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20'
            : 'bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FECACA]'
        }`}
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Log Out</span>
      </motion.button>

      {/* Profile Settings Modal */}
      <AnimatePresence>
        {modalView === 'profile' && (
          <ProfileSettingsModal
            theme={theme}
            profileData={profileData}
            setProfileData={setProfileData}
            onSave={handleProfileSave}
            onClose={() => setModalView('none')}
          />
        )}
      </AnimatePresence>

      {/* Security Modal */}
      <AnimatePresence>
        {modalView === 'security' && (
          <SecurityModal
            theme={theme}
            securityData={securityData}
            setSecurityData={setSecurityData}
            onSave={handleSecuritySave}
            onClose={() => setModalView('none')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


// Profile Settings Modal Component
function ProfileSettingsModal({ 
  theme, 
  profileData, 
  setProfileData, 
  onSave, 
  onClose 
}: { 
  theme: string;
  profileData: any;
  setProfileData: (data: any) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl z-50 ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB]'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 p-6 border-b flex items-center justify-between z-10 ${
          theme === 'dark' 
            ? 'bg-[#111827] border-[#1F2937]' 
            : 'bg-white border-[#E5E7EB]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
            }`}>
              <User className={`w-5 h-5 ${
                theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
              }`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Profile Settings
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Update your personal information
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close profile settings"
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark'
                ? 'hover:bg-[#1F2937] text-[#F9FAFB]'
                : 'hover:bg-[#F9FAFB] text-[#111827]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
              theme === 'dark' ? 'bg-[#22C55E]' : 'bg-[#16A34A]'
            } text-white`}>
              {profileData.username.charAt(0).toUpperCase()}
              <button
                type="button"
                className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg ${
                  theme === 'dark' ? 'bg-[#1F2937]' : 'bg-white'
                }`}
                aria-label="Change profile picture"
              >
                <Camera className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                }`} />
              </button>
            </div>
            <div>
              <h3 className={`font-semibold mb-1 ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Profile Picture
              </h3>
              <p className={`text-sm mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Upload a new avatar
              </p>
              <button
                type="button"
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
                }`}
                aria-label="Upload new profile picture"
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
              }`}>
                <User className="inline w-4 h-4 mr-2" />
                Username
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                aria-label="Username"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E]'
                    : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A]'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
              }`}>
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                aria-label="Email address"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E]'
                    : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A]'
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
              }`}>
                <Phone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E] placeholder:text-[#F9FAFB]/40'
                    : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A] placeholder:text-[#111827]/40'
                }`}
              />
            </div>

            {/* Location */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
              }`}>
                <MapPin className="inline w-4 h-4 mr-2" />
                Location
              </label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                placeholder="City, Country"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E] placeholder:text-[#F9FAFB]/40'
                    : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A] placeholder:text-[#111827]/40'
                }`}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
            }`}>
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 resize-none ${
                theme === 'dark'
                  ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E] placeholder:text-[#F9FAFB]/40'
                  : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A] placeholder:text-[#111827]/40'
              }`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-6 border-t flex gap-3 z-10 ${
          theme === 'dark' 
            ? 'bg-[#111827] border-[#1F2937]' 
            : 'bg-white border-[#E5E7EB]'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
                : 'bg-[#E5E7EB] text-[#111827] hover:bg-[#D1D5DB]'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              theme === 'dark'
                ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
                : 'bg-[#16A34A] text-white hover:bg-[#15803D]'
            }`}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </>
  );
}

// Security Modal Component
function SecurityModal({ 
  theme, 
  securityData, 
  setSecurityData, 
  onSave, 
  onClose 
}: { 
  theme: string;
  securityData: any;
  setSecurityData: (data: any) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl z-50 ${
          theme === 'dark'
            ? 'bg-[#111827] border border-[#1F2937]'
            : 'bg-white border border-[#E5E7EB]'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 p-6 border-b flex items-center justify-between z-10 ${
          theme === 'dark' 
            ? 'bg-[#111827] border-[#1F2937]' 
            : 'bg-white border-[#E5E7EB]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              theme === 'dark' ? 'bg-[#22C55E]/20' : 'bg-[#DCFCE7]'
            }`}>
              <Shield className={`w-5 h-5 ${
                theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
              }`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
              }`}>
                Security Settings
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
              }`}>
                Manage your password and security preferences
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close security settings"
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark'
                ? 'hover:bg-[#1F2937] text-[#F9FAFB]'
                : 'hover:bg-[#F9FAFB] text-[#111827]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Change Password Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              <Lock className="w-5 h-5" />
              Change Password
            </h3>
            
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                }`}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E] placeholder:text-[#F9FAFB]/40'
                      : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A] placeholder:text-[#111827]/40'
                  }`}
                />
              </div>

              {/* New Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                }`}>
                  New Password
                </label>
                <input
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                  placeholder="Enter new password (min 8 characters)"
                  minLength={8}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E] placeholder:text-[#F9FAFB]/40'
                      : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A] placeholder:text-[#111827]/40'
                  }`}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-[#F9FAFB]/80' : 'text-[#111827]/80'
                }`}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  minLength={8}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-[#0F172A] border-[#1F2937] text-[#F9FAFB] focus:ring-[#22C55E] placeholder:text-[#F9FAFB]/40'
                      : 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#16A34A] placeholder:text-[#111827]/40'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className={`p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-[#0F172A] border border-[#1F2937]'
              : 'bg-[#F9FAFB] border border-[#E5E7EB]'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <Smartphone className={`w-5 h-5 mt-0.5 ${
                theme === 'dark' ? 'text-[#22C55E]' : 'text-[#16A34A]'
              }`} />
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${
                  theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                }`}>
                  Two-Factor Authentication
                </h4>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                }`}>
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
                    : 'bg-[#16A34A] text-white hover:bg-[#15803D]'
                }`}
              >
                Enable
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
            }`}>
              <Clock className="w-5 h-5" />
              Active Sessions
            </h3>
            
            <div className="space-y-3">
              <div className={`p-4 rounded-xl flex items-center justify-between ${
                theme === 'dark'
                  ? 'bg-[#0F172A] border border-[#1F2937]'
                  : 'bg-[#F9FAFB] border border-[#E5E7EB]'
              }`}>
                <div>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#111827]'
                  }`}>
                    Current Session
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                  }`}>
                    Windows • Chrome • Active now
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  theme === 'dark'
                    ? 'bg-[#22C55E]/20 text-[#22C55E]'
                    : 'bg-[#DCFCE7] text-[#16A34A]'
                }`}>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className={`p-4 rounded-xl border ${
            theme === 'dark'
              ? 'bg-[#EF4444]/5 border-[#EF4444]/20'
              : 'bg-[#FEE2E2] border-[#EF4444]/20'
          }`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#EF4444] mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-[#EF4444] mb-1">
                  Danger Zone
                </h4>
                <p className={`text-sm mb-3 ${
                  theme === 'dark' ? 'text-[#F9FAFB]/60' : 'text-[#111827]/60'
                }`}>
                  Permanently delete your account and all associated data
                </p>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#EF4444] text-white hover:bg-[#DC2626] transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-6 border-t flex gap-3 z-10 ${
          theme === 'dark' 
            ? 'bg-[#111827] border-[#1F2937]' 
            : 'bg-white border-[#E5E7EB]'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151]'
                : 'bg-[#E5E7EB] text-[#111827] hover:bg-[#D1D5DB]'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              theme === 'dark'
                ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
                : 'bg-[#16A34A] text-white hover:bg-[#15803D]'
            }`}
          >
            <Save className="w-4 h-4" />
            Update Security
          </button>
        </div>
      </motion.div>
    </>
  );
}
