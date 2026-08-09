import { Menu, FileText } from 'lucide-react'

export default function MobileHeader({ onMenuToggle }) {
  return (
    <header className="md:hidden flex items-center justify-between bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg focus:outline-none transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-blue-600 rounded-lg text-white">
            <FileText className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-slate-800 text-lg tracking-tight">Kaagaz</span>
        </div>
      </div>
    </header>
  )
}
