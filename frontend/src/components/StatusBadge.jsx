import { CheckCircle2, AlertTriangle, ShieldAlert, Clock } from 'lucide-react'

export default function StatusBadge({ status }) {
  const getBadgeConfig = (stat) => {
    switch (stat?.toLowerCase()) {
      case 'valid':
        return { icon: CheckCircle2, cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'Valid' };
      case 'expiring soon':
        return { icon: Clock, cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20', label: 'Expiring Soon' };
      case 'critical':
        return { icon: AlertTriangle, cls: 'bg-orange-500/10 text-orange-400 border-orange-500/20 animate-pulse', label: 'Critical' };
      case 'expired':
        return { icon: ShieldAlert, cls: 'bg-rose-500/10 text-rose-400 border-rose-500/20', label: 'Expired' };
      default:
        return { icon: CheckCircle2, cls: 'bg-white/5 text-[--text-secondary] border-[--border]', label: stat || '—' };
    }
  };

  const { icon: Icon, cls, label } = getBadgeConfig(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cls}`}>
      <Icon className="h-3 w-3 flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
}
