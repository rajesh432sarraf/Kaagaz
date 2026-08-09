import { X, Download, Calendar, Tag, FileText, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { API_ORIGIN } from '../services/api'

export default function DocumentDetailModal({ doc, onClose, onDelete }) {
  const { name, category, status, issueDate, expiryDate, createdAt, description, fileUrl } = doc

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Lifetime'
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString('en-IN', options)
    } catch {
      return dateStr
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in-scale">
      <div className="relative w-full max-w-lg glass-elevated rounded-3xl p-6 md:p-8 space-y-6 shadow-glow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5 pointer-events-none rounded-3xl" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[--text-muted] hover:text-white hover:bg-white/5 transition-all"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[--text-primary] tracking-tight">{name}</h2>
          </div>
          <div className="flex items-center space-x-2.5 text-xs text-[--text-secondary] font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" />{category}</span>
            <span>•</span>
            <StatusBadge status={status} />
          </div>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-4 text-xs border-y border-[--border] py-5 relative z-10">
          <div>
            <p className="font-bold text-[--text-muted] uppercase tracking-widest mb-1.5">Issue Date</p>
            <p className="text-sm font-semibold text-[--text-secondary]">{formatDate(issueDate)}</p>
          </div>
          <div>
            <p className="font-bold text-[--text-muted] uppercase tracking-widest mb-1.5">Expiry Date</p>
            <p className="text-sm font-semibold text-[--text-secondary]">{formatDate(expiryDate)}</p>
          </div>
          <div className="col-span-2 pt-2 border-t border-[--border]/40">
            <p className="font-bold text-[--text-muted] uppercase tracking-widest mb-1.5">Uploaded On</p>
            <p className="text-xs font-medium text-[--text-secondary]">{formatDate(createdAt)}</p>
          </div>
          {description && (
            <div className="col-span-2 pt-2 border-t border-[--border]/40">
              <p className="font-bold text-[--text-muted] uppercase tracking-widest mb-1.5">Notes & Details</p>
              <p className="text-sm text-[--text-secondary] bg-[--bg-elevated] p-3 rounded-xl border border-[--border] whitespace-pre-wrap leading-relaxed">{description}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 relative z-10">
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/15 rounded-xl transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Document</span>
            </button>
          )}
          {fileUrl ? (
            <a
              href={`${API_ORIGIN}${fileUrl}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-glow-sm hover:shadow-glow"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
