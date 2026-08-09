import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeader({ title, subtitle, actionLabel, actionPath }) {
  return (
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[--border]">
      <div>
        <h2 className="text-lg font-bold text-[--text-primary] tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs text-[--text-secondary] font-medium mt-0.5">{subtitle}</p>
        )}
      </div>
      {actionLabel && actionPath && (
        <Link 
          to={actionPath} 
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 transition-colors group"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
