import { useState, useEffect } from 'react'
import { Bell, AlertTriangle, Calendar, CheckCircle2, ShieldAlert, RefreshCw, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { getExpiringDocuments, getDocumentStats } from '../services/api'
import StatusBadge from '../components/StatusBadge'

export default function Reminders() {
  const [docs, setDocs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [expiringRes, statsRes] = await Promise.all([
        getExpiringDocuments(),
        getDocumentStats(),
      ]);
      setDocs(expiringRes.data || []);
      setStats(statsRes.data || null);
    } catch (err) {
      setError(err.message || 'Failed to load reminders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusDisplay = (doc) => {
    const days = doc.daysRemaining;
    if (doc.status === 'Expired') {
      return (
        <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-sm">
          <ShieldAlert className="h-4 w-4" />
          <span>Expired {Math.abs(days)} days ago</span>
        </div>
      );
    }
    if (doc.status === 'Critical') {
      return (
        <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-sm animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <span>Expires in {days} days</span>
        </div>
      );
    }
    if (doc.status === 'Expiring Soon') {
      return (
        <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm">
          <Clock className="h-4 w-4" />
          <span>Expires in {days} days</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
        <CheckCircle2 className="h-4 w-4" />
        <span>Valid</span>
      </div>
    );
  };

  const getUrgencyColor = (status) => {
    switch (status) {
      case 'Expired':
        return 'border-l-4 border-rose-500 bg-rose-500/5 hover:border-rose-400';
      case 'Critical':
        return 'border-l-4 border-rose-400 bg-rose-500/5 hover:border-rose-300';
      case 'Expiring Soon':
        return 'border-l-4 border-amber-500 bg-amber-500/5 hover:border-amber-400';
      default:
        return 'border-l-4 border-emerald-500 bg-emerald-500/5 hover:border-emerald-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Reminders & Expiry"
        description="Monitor validity deadlines for your critical certificates and insurance policies."
      />

      {/* Summary Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-white">{stats.totalDocuments}</p>
            <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mt-1">Total</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center border-rose-500/10 shadow-glow-sm">
            <p className="text-2xl font-extrabold text-rose-400">{stats.expired || 0}</p>
            <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mt-1">Expired</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center border-rose-500/10">
            <p className="text-2xl font-extrabold text-rose-400">{stats.critical || 0}</p>
            <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mt-1">Critical</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center border-amber-500/10">
            <p className="text-2xl font-extrabold text-amber-400">{stats.expiringSoon || 0}</p>
            <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mt-1">Soon</p>
          </div>
        </div>
      )}

      {/* Header and Refresh */}
      <div className="flex items-center justify-between max-w-2xl border-t border-[--border] pt-6">
        <h2 className="text-xs font-bold text-[--text-muted] uppercase tracking-widest">
          {loading ? 'Syncing...' : `${docs.length} action required`}
        </h2>
        <button
          onClick={fetchData}
          className="flex items-center space-x-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/15 px-3.5 py-2 rounded-xl transition-all active:scale-[0.98]"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-2xl p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="max-w-2xl space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass rounded-2xl p-5 animate-pulse h-20" />
          ))}
        </div>
      )}

      {/* Document List */}
      {!loading && !error && docs.length === 0 && (
        <div className="max-w-2xl glass rounded-3xl p-10 text-center shadow-card border border-[--border]">
          <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-3 animate-float" />
          <h3 className="font-bold text-white text-base">All documents are fully valid!</h3>
          <p className="text-[--text-muted] text-xs mt-1">No documents expiring within the next 90 days.</p>
        </div>
      )}

      {!loading && !error && docs.length > 0 && (
        <div className="max-w-2xl space-y-3.5">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className={`glass border-[--border] rounded-2xl p-5 shadow-card flex items-center justify-between flex-wrap gap-4 transition-all duration-200 ${getUrgencyColor(doc.status)}`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-base">{doc.name}</h3>
                  <span className="text-[10px] font-bold text-[--text-muted] bg-white/5 px-2 py-0.5 rounded-full border border-[--border]">
                    {doc.category}
                  </span>
                </div>
                {doc.expiryDate && (
                  <p className="text-xs text-[--text-secondary] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[--text-muted]" />
                    <span>Expiry: {new Date(doc.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-6">
                {getStatusDisplay(doc)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bell notice */}
      {!loading && docs.length > 0 && (
        <p className="text-xs text-[--text-muted] max-w-2xl flex items-center space-x-2 bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl">
          <Bell className="h-4 w-4 text-indigo-400 flex-shrink-0" />
          <span>Documents expiring within 90 days are shown here. Keep your documents up to date.</span>
        </p>
      )}
    </div>
  )
}
