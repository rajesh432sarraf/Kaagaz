export default function LoadingState({ message = 'Loading documents...' }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-6 space-y-4 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-md mx-auto">
      {/* Animated Spinner Ring */}
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-blue-600" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-slate-800 tracking-tight">{message}</p>
        <p className="text-xs text-slate-400 font-medium">Please wait a moment</p>
      </div>
    </div>
  );
}
