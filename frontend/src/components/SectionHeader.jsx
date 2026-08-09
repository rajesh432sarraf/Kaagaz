import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeader({ title, subtitle, actionLabel, actionPath }) {
  return (
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100/50">
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>
        )}
      </div>
      {actionLabel && actionPath && (
        <Link 
          to={actionPath} 
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 transition-colors"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
