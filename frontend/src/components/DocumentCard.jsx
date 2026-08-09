import { 
  FileText, CreditCard, ShieldAlert, GraduationCap,
  Plane, Car, Eye, Trash2, HeartPulse, Home, Download
} from 'lucide-react'
import StatusBadge from './StatusBadge'

const getCategoryIcon = (cat) => {
  switch (cat?.toLowerCase()) {
    case 'identity':  return CreditCard;
    case 'vehicle':   return Car;
    case 'insurance': return ShieldAlert;
    case 'travel':    return Plane;
    case 'education': return GraduationCap;
    case 'health':    return HeartPulse;
    case 'property':  return Home;
    default:          return FileText;
  }
};

const categoryColors = {
  identity:  'from-indigo-500/20 to-indigo-500/5 border-indigo-500/15 text-indigo-400',
  vehicle:   'from-blue-500/20 to-blue-500/5 border-blue-500/15 text-blue-400',
  insurance: 'from-rose-500/20 to-rose-500/5 border-rose-500/15 text-rose-400',
  travel:    'from-violet-500/20 to-violet-500/5 border-violet-500/15 text-violet-400',
  education: 'from-amber-500/20 to-amber-500/5 border-amber-500/15 text-amber-400',
  health:    'from-emerald-500/20 to-emerald-500/5 border-emerald-500/15 text-emerald-400',
  property:  'from-cyan-500/20 to-cyan-500/5 border-cyan-500/15 text-cyan-400',
  finance:   'from-gold-500/20 to-gold-500/5 border-gold-500/15 text-amber-400',
  other:     'from-white/5 to-white/0 border-white/10 text-[--text-secondary]',
};

export default function DocumentCard({ doc, onView, onDelete }) {
  const { name, category, issueDate, expiryDate, status, fileUrl } = doc;
  const Icon = getCategoryIcon(category);
  const catKey = category?.toLowerCase() || 'other';
  const colorClass = categoryColors[catKey] || categoryColors.other;

  const formatDate = (d) => {
    if (!d) return 'Lifetime';
    try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <div className="group glass rounded-2xl p-5 hover:border-indigo-500/20 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 flex flex-col justify-between space-y-4">
      
      {/* Top: icon + status */}
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br border ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Doc name & category */}
      <div className="space-y-0.5">
        <h4 className="font-bold text-white tracking-tight text-base truncate leading-snug" title={name}>{name}</h4>
        <p className="text-xs font-semibold text-[--text-muted] uppercase tracking-wider">{category}</p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3 text-xs border-t border-[--border] pt-3">
        <div>
          <span className="text-[--text-muted] font-semibold block uppercase tracking-wider text-[9px] mb-0.5">Issued</span>
          <span className="text-[--text-secondary] font-medium">{formatDate(issueDate)}</span>
        </div>
        <div>
          <span className="text-[--text-muted] font-semibold block uppercase tracking-wider text-[9px] mb-0.5">Expires</span>
          <span className={`font-medium ${status === 'Expired' ? 'text-rose-400' : status === 'Critical' ? 'text-orange-400' : 'text-[--text-secondary]'}`}>
            {formatDate(expiryDate)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-[--border] pt-3">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/15 rounded-xl transition-all duration-150"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View</span>
        </button>
        {fileUrl && (
          <a
            href={`http://localhost:5000${fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[--text-muted] hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all duration-150 border border-transparent hover:border-indigo-500/15"
            title="Download file"
          >
            <Download className="h-4 w-4" />
          </a>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 text-[--text-muted] hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-150 border border-transparent hover:border-rose-500/15"
            title="Delete document"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
