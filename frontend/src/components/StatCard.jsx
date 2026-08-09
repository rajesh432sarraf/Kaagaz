export default function StatCard({ title, value, icon: Icon, variant = 'primary', caption }) {
  const variants = {
    primary: {
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      iconColor: 'text-indigo-400',
      valueBg: 'from-indigo-400 to-indigo-300',
    },
    warning: {
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      iconColor: 'text-amber-400',
      valueBg: 'from-amber-400 to-amber-300',
    },
    danger: {
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      iconColor: 'text-rose-400',
      valueBg: 'from-rose-400 to-rose-300',
    },
    neutral: {
      iconBg: 'bg-white/5 border-white/10',
      iconColor: 'text-[--text-secondary]',
      valueBg: 'from-[--text-primary] to-[--text-secondary]',
    },
  };

  const style = variants[variant] || variants.primary;

  return (
    <div className="glass rounded-2xl p-5 hover:border-indigo-500/15 transition-all duration-200 hover:shadow-card group">
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[--text-muted]">{title}</span>
        <div className={`p-2 rounded-xl border ${style.iconBg}`}>
          {Icon && <Icon className={`h-4 w-4 ${style.iconColor}`} />}
        </div>
      </div>
      <div>
        <h3 className={`text-3xl font-extrabold tracking-tight bg-gradient-to-br ${style.valueBg} bg-clip-text text-transparent`}>
          {value}
        </h3>
        {caption && <p className="text-xs text-[--text-muted] mt-1.5 font-medium">{caption}</p>}
      </div>
    </div>
  )
}
