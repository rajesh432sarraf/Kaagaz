import { X, Download } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { API_ORIGIN } from '../services/api'

export default function DocumentDetailModal({ doc, onClose, onDelete }) {
  const { name, category, status, issueDate, expiryDate, createdAt, description, fileUrl } = doc

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString(undefined, options)
    } catch {
      return dateStr
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold text-slate-800">{name}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Category:</span>
          <span className="font-medium text-slate-700">{category}</span>
        </div>
        <StatusBadge status={status} />
        <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
          <div>
            <p className="font-medium">Issue Date</p>
            <p>{formatDate(issueDate)}</p>
          </div>
          <div>
            <p className="font-medium">Expiry Date</p>
            <p>{expiryDate ? formatDate(expiryDate) : 'None'}</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium">Uploaded</p>
            <p>{createdAt ? formatDate(createdAt) : 'Unknown'}</p>
          </div>
          {description && (
            <div className="col-span-2">
              <p className="font-medium">Notes</p>
              <p>{description}</p>
            </div>
          )}
        </div>
        <div className="mt-4 space-x-3">
          {fileUrl ? (
            <a
              href={`${API_ORIGIN}${fileUrl}`}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
            <Download className="h-4 w-4" />
            <span>Download</span>
            </a>
          ) : null}
          {onDelete ? (
            <button onClick={onDelete} className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors">
            <span>Delete</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
