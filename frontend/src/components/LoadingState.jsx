export default function LoadingState({ message = 'Loading documents...' }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-6 space-y-4 glass border border-[--border] rounded-3xl shadow-card max-w-md mx-auto">
      {/* Animated Spinner Ring */}
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/5 border-t-indigo-500 shadow-glow-sm" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-white tracking-tight">{message}</p>
        <p className="text-xs text-[--text-muted] font-medium">Please wait a moment</p>
      </div>
    </div>
  );
}
