export default function StatCard({ title, value, icon: Icon, variant = 'primary', caption }) {
  const variantStyles = {
    primary: {
      bg: 'bg-blue-50/60',
      text: 'text-blue-600',
      border: 'border-blue-100/50'
    },
    warning: {
      bg: 'bg-amber-50/60',
      text: 'text-amber-600',
      border: 'border-amber-100/50'
    },
    danger: {
      bg: 'bg-rose-50/60',
      text: 'text-rose-600',
      border: 'border-rose-100/50'
    },
    neutral: {
      bg: 'bg-slate-50/60',
      text: 'text-slate-600',
      border: 'border-slate-150'
    }
  };

  const style = variantStyles[variant] || variantStyles.primary;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`p-2 rounded-xl ${style.bg} ${style.text} flex items-center justify-center`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
        {caption && (
          <p className="text-xs font-semibold text-slate-500">{caption}</p>
        )}
      </div>
    </div>
  )
}
