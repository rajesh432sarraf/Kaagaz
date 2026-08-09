import { 
  FileText, 
  CreditCard, 
  ShieldAlert, 
  GraduationCap, 
  Plane, 
  Car, 
  Calendar,
  Eye, 
  Trash2,
  HeartPulse,
  Home
} from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function DocumentCard({ doc, onView, onDelete }) {
  const { name, category, issueDate, expiryDate, status } = doc;

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'identity':
        return CreditCard;
      case 'vehicle':
        return Car;
      case 'insurance':
        return ShieldAlert;
      case 'travel':
        return Plane;
      case 'education':
        return GraduationCap;
      case 'health':
        return HeartPulse;
      case 'property':
        return Home;
      default:
        return FileText;
    }
  };

  const Icon = getCategoryIcon(category);

  // Format date display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Lifetime';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-slate-200/60 transition-all duration-200 flex flex-col justify-between space-y-4">
      {/* Top section: Icon and Status */}
      <div className="flex items-start justify-between">
        <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center border border-slate-100/50">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Mid section: Document name and info */}
      <div className="space-y-1">
        <h4 className="font-extrabold text-slate-800 tracking-tight text-base truncate" title={name}>
          {name}
        </h4>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider capitalize">{category}</p>
      </div>

      {/* Date markers */}
      <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-50 pt-3">
        <div>
          <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Issued</span>
          <span className="text-slate-600 font-bold mt-0.5 block">{formatDate(issueDate)}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Expires</span>
          <span className="text-slate-600 font-bold mt-0.5 block flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {formatDate(expiryDate)}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 border-t border-slate-50 pt-3">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 bg-blue-50/60 hover:bg-blue-100/80 rounded-xl transition-colors duration-150 cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View</span>
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-150 border border-transparent hover:border-rose-100 cursor-pointer"
            title="Delete document"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
