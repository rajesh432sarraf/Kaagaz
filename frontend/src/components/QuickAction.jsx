import { Link } from 'react-router-dom'

export default function QuickAction({ title, path, icon: Icon, variant = 'primary' }) {
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/10 hover:shadow-blue-500/20 active:translate-y-[1px]',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 active:translate-y-[1px]',
    ghost: 'bg-blue-50 hover:bg-blue-100/80 text-blue-600 border border-blue-100/50'
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
