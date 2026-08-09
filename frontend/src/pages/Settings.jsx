import { useState } from 'react'
import { User, Bell, Shield, Eye, Settings as Gear, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [success, setSuccess] = useState(false);

  // Form values (mock states)
  const [name, setName] = useState('Rohan Sharma');
  const [email, setEmail] = useState('rohan@example.com');
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

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Sidebar Tabs */}
        <div className="w-full md:w-64 border-r border-slate-100 bg-slate-50/50 p-5 space-y-1.5 flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Pane */}
        <div className="flex-1 p-6 md:p-8 space-y-6">
          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl text-xs font-semibold flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6 max-w-lg">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2">Profile & Account Info</h3>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-5">
                  <h4 className="font-bold text-slate-800 text-sm">Change Password</h4>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2">Email Reminders & Alerts</h3>
                
                <div className="space-y-4 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"
                    />
                    <span className="text-sm font-semibold text-slate-700">Enable Email Expiry Notifications</span>
                  </label>

                  <div className="pl-7 space-y-3.5 border-l border-slate-100">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        disabled={!emailAlerts}
                        checked={expiry30}
                        onChange={(e) => setExpiry30(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 disabled:opacity-55"
                      />
                      <span className="text-xs font-medium text-slate-600">Send reminder 30 days before document expiration</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        disabled={!emailAlerts}
                        checked={expiry7}
                        onChange={(e) => setExpiry7(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 disabled:opacity-55"
                      />
                      <span className="text-xs font-medium text-slate-600">Send urgent reminder 7 days before document expiration</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-5">
                <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2">Account Security</h3>
                
                <div className="space-y-4 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"
                    />
                    <div className="space-y-0.5">
                      <span className="text-sm font-semibold text-slate-700 block">Enable Two-Factor Authentication (2FA)</span>
                      <span className="text-xs text-slate-400 font-medium block">Secure logins with email or SMS verification codes</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
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
