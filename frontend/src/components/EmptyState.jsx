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
    <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto space-y-5 shadow-sm">
      <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl inline-block border border-slate-100/50">
        <Icon className="h-10 w-10 text-blue-500" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-bold text-slate-800 text-lg tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
      {actionLabel && actionPath && (
        <div>
          <Link
            to={actionPath}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/10 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>{actionLabel}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
