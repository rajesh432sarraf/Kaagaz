import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Sparkles, 
  Bell, 
  Settings, 
  LogOut, 
  User 
} from 'lucide-react'

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Upload Document', path: '/upload', icon: Upload },
    { name: 'Life Tasks', path: '/tasks', icon: Sparkles },
    { name: 'Reminders', path: '/reminders', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Clear mock session (if any) and redirect
    if (onClose) onClose();
    navigate('/login');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-100 w-64 p-5">
      {/* Brand Logo & Name */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Kaagaz</h2>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Life Admin</span>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/5' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile / Footer Section */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center space-x-3 px-2">
          <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200/50">
            <User className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">Rohan Sharma</p>
            <p className="text-xs text-slate-500 truncate">rohan@example.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}
