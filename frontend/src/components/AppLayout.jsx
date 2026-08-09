import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'
import { X } from 'lucide-react'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      {/* Mobile Top Header */}
      <MobileHeader onMenuToggle={() => setSidebarOpen(true)} />

      {/* Desktop Sidebar (Fixed Left) */}
      <div className="hidden md:block md:w-64 md:flex-shrink-0 md:h-screen md:sticky md:top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer Sidebar Menu */}
          <div className="relative flex flex-col w-64 max-w-xs bg-white h-full transform transition-transform duration-300 ease-in-out z-50">
            {/* Close button inside Drawer */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
