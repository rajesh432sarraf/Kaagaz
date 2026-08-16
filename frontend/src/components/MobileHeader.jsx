import logoImg from '../assets/logo.png'
import { Menu } from 'lucide-react'

export default function MobileHeader({ onMenuToggle }) {
  return (
    <header className="md:hidden flex items-center justify-between bg-[--bg-surface]/80 backdrop-blur-xl border-b border-[--border] px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 text-[--text-secondary] hover:text-[--text-primary] hover:bg-white/5 rounded-lg focus:outline-none transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <img src={logoImg} alt="Kaagaz Logo" style={{ height: '30px', width: 'auto' }} className="object-contain" />
        </div>
      </div>
    </header>
  )
}
