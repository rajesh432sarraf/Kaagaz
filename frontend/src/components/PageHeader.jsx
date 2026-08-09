export default function PageHeader({ title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-6 border-b border-[--border] mb-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#073b40] tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-[#176971] mt-1 font-medium">{description}</p>
        )}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  )
}
