import { Link } from 'react-router-dom'

export default function QuickAction({ title, path, icon: Icon, variant = 'primary' }) {
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-sm hover:shadow-glow active:scale-[0.98]',
    outline: 'glass hover:bg-white/5 text-[--text-secondary] hover:text-white border border-[--border-strong] active:scale-[0.98]',
    ghost: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/15'
  };

  const style = variantStyles[variant] || variantStyles.primary;

  return (
    <Link
      to={path}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-150 ${style}`}
    >
      {Icon && <Icon className="h-4.5 w-4.5 flex-shrink-0" />}
      <span>{title}</span>
    </Link>
  );
}
