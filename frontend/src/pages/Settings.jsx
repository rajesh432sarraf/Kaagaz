import { useState } from 'react'
import { User, Bell, Shield, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [success, setSuccess] = useState(false);

  // Form values pre-filled from real user
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [expiry30, setExpiry30] = useState(true);
  const [expiry7, setExpiry7] = useState(true);

  // Security states
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'security', label: 'Security & Auth', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Configure account information, authentication controls and email reminders."
      />

      <div className="glass rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[500px] border border-[--border] shadow-card">
        {/* Left Sidebar Tabs */}
        <div className="w-full md:w-64 border-r border-[--border] bg-white/5 p-5 space-y-1.5 flex-shrink-0">
          <p className="px-3 text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-3">Settings Panel</p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-glow-sm border border-indigo-500/20'
                    : 'text-[--text-secondary] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Pane */}
        <div className="flex-1 p-6 md:p-8 space-y-6 relative z-10">
          {success && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-semibold flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6 max-w-lg">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h3 className="font-bold text-white text-lg border-b border-[--border] pb-2">Profile & Account Info</h3>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[--text-muted] uppercase tracking-widest block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[--text-muted] uppercase tracking-widest block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-[--border] space-y-5">
                  <h4 className="font-bold text-white text-sm">Change Password</h4>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[--text-muted] uppercase tracking-widest block">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[--text-muted] uppercase tracking-widest block">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h3 className="font-bold text-white text-lg border-b border-[--border] pb-2">Email Reminders & Alerts</h3>
                
                <div className="space-y-4 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="rounded border-[--border-strong] bg-[--bg-elevated] text-indigo-600 focus:ring-indigo-500/40 h-4.5 w-4.5 accent-indigo-500"
                    />
                    <span className="text-sm font-semibold text-white">Enable Email Expiry Notifications</span>
                  </label>

                  <div className="pl-7 space-y-3.5 border-l border-[--border]">
                    <label className="flex items-center space-x-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        disabled={!emailAlerts}
                        checked={expiry30}
                        onChange={(e) => setExpiry30(e.target.checked)}
                        className="rounded border-[--border-strong] bg-[--bg-elevated] text-indigo-600 focus:ring-indigo-500/40 h-4 w-4 disabled:opacity-40 accent-indigo-500"
                      />
                      <span className="text-xs font-medium text-[--text-secondary]">Send reminder 30 days before document expiration</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        disabled={!emailAlerts}
                        checked={expiry7}
                        onChange={(e) => setExpiry7(e.target.checked)}
                        className="rounded border-[--border-strong] bg-[--bg-elevated] text-indigo-600 focus:ring-indigo-500/40 h-4 w-4 disabled:opacity-40 accent-indigo-500"
                      />
                      <span className="text-xs font-medium text-[--text-secondary]">Send urgent reminder 7 days before document expiration</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-5">
                <h3 className="font-bold text-white text-lg border-b border-[--border] pb-2">Account Security</h3>
                
                <div className="space-y-4 pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.checked)}
                      className="rounded border-[--border-strong] bg-[--bg-elevated] text-indigo-600 focus:ring-indigo-500/40 h-4.5 w-4.5 mt-0.5 accent-indigo-500"
                    />
                    <div className="space-y-0.5">
                      <span className="text-sm font-semibold text-white block">Enable Two-Factor Authentication (2FA)</span>
                      <span className="text-xs text-[--text-muted] font-medium block">Secure logins with email or SMS verification codes</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-4 border-t border-[--border] flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-glow-sm hover:shadow-glow active:scale-[0.98] cursor-pointer"
              >
                Save Settings
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
