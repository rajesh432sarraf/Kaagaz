import { NavLink, useNavigate, Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import { 
  LayoutDashboard, FileText, Upload, Sparkles,
  Bell, Settings, LogOut, ChevronRight
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'Upload', path: '/upload', icon: Upload },
  { name: 'Life Tasks', path: '/tasks', icon: Sparkles },
  { name: 'Reminders', path: '/reminders', icon: Bell },
]

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/');
  };

  const initial = user?.name?.[0]?.toUpperCase() || 'U';

  return (
    <div className="h-full flex flex-col w-64 bg-[--bg-surface] border-r border-[--border]">
      
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-[--border]">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Kaagaz Logo" style={{ height: '36px', width: 'auto' }} className="object-contain" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-none">
        <p className="px-3 text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-3">Main Menu</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500/15 text-[--text-primary] border border-indigo-500/20 shadow-glow-sm font-bold'
                  : 'text-[--text-secondary] hover:text-[--text-primary] hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <item.icon className={`h-4.5 w-4.5 flex-shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-[--text-muted] group-hover:text-[--text-secondary]'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-indigo-400/60" />}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4 mt-2 border-t border-[--border]">
          <p className="px-3 text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-3">Account</p>
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500/15 text-[--text-primary] border border-indigo-500/20 font-bold'
                  : 'text-[--text-secondary] hover:text-[--text-primary] hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <Settings className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-[--text-muted] group-hover:text-[--text-secondary]'}`} />
                  <span>Settings</span>
                </div>
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-indigo-400/60" />}
              </>
            )}
          </NavLink>
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-3 border-t border-[--border]">
        {/* User tile */}
        <div className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-[--bg-elevated] border border-[--border] mb-1">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300 flex-shrink-0">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[--text-primary] truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-[--text-muted] truncate">{user?.email || ''}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[--text-secondary] hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-200 group"
        >
          <LogOut className="h-4 w-4 flex-shrink-0 group-hover:text-rose-400 transition-colors" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}
