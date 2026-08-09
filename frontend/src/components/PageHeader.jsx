export default function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100 mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight md:text-3xl">{title}</h1>
        {description && (
          <p className="text-sm text-slate-500 mt-1 font-medium">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {children}
        </div>
      )}
    </div>
  )
}
