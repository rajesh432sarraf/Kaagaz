import { Link } from 'react-router-dom'
import { FolderOpen, Plus } from 'lucide-react'

export default function EmptyState({ 
  title = 'No documents found', 
  description = 'Start scanning and uploading files to secure them inside your digital safe.', 
  actionLabel = 'Upload Document', 
  actionPath = '/upload', 
  icon: Icon = FolderOpen 
}) {
  return (
    <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto space-y-5 shadow-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5 pointer-events-none rounded-3xl" />
      <div className="relative z-10 space-y-5">
        <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl inline-block border border-indigo-500/20 shadow-glow-sm">
          <Icon className="h-10 w-10 animate-float" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-bold text-white text-lg tracking-tight">{title}</h3>
          <p className="text-sm text-[--text-secondary] font-medium leading-relaxed max-w-xs mx-auto">
            {description}
          </p>
        </div>
        {actionLabel && actionPath && (
          <div>
            <Link
              to={actionPath}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-glow-sm hover:shadow-glow transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>{actionLabel}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
