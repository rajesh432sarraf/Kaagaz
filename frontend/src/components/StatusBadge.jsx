import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react'

export default function StatusBadge({ status }) {
  const getBadgeConfig = (stat) => {
    switch (stat?.toLowerCase()) {
      case 'valid':
        return {
          icon: CheckCircle2,
          class: 'bg-emerald-50 text-emerald-700 border-emerald-100/80',
          label: 'Valid'
        };
      case 'expiring soon':
        return {
          icon: AlertTriangle,
          class: 'bg-amber-50 text-amber-700 border-amber-100/80 animate-pulse',
          label: 'Expiring Soon'
        };
      case 'expired':
        return {
          icon: ShieldAlert,
          class: 'bg-rose-50 text-rose-700 border-rose-100/80',
          label: 'Expired'
        };
      default:
        return {
          icon: CheckCircle2,
          class: 'bg-slate-50 text-slate-600 border-slate-100',
          label: stat || 'N/A'
        };
    }
  };

  const config = getBadgeConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.class}`}>
      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}
