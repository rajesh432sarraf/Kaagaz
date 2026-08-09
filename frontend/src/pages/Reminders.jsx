import { useState, useEffect } from 'react'
import { Bell, AlertTriangle, Calendar, CheckCircle2, ShieldAlert, RefreshCw } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { getExpiringDocuments, getDocumentStats } from '../services/api'

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
        <div className="flex items-center space-x-2 text-rose-600 font-extrabold text-sm">
          <ShieldAlert className="h-5 w-5" />
          <span>Expired {Math.abs(days)} days ago</span>
        </div>
      );
    }
    if (doc.status === 'Critical') {
      return (
        <div className="flex items-center space-x-2 text-rose-500 font-extrabold text-sm animate-pulse">
          <AlertTriangle className="h-5 w-5" />
          <span>Expires in {days} days</span>
        </div>
      );
    }
    if (doc.status === 'Expiring Soon') {
      return (
        <div className="flex items-center space-x-2 text-amber-600 font-extrabold text-sm">
          <Calendar className="h-5 w-5" />
          <span>Expires in {days} days</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
        <CheckCircle2 className="h-5 w-5" />
        <span>Valid</span>
      </div>
    );
  };

  const getUrgencyColor = (status) => {
    switch (status) {
      case 'Expired':
        return 'border-l-4 border-rose-500 bg-rose-50/10';
      case 'Critical':
        return 'border-l-4 border-rose-400 bg-amber-50/5';
      case 'Expiring Soon':
        return 'border-l-4 border-amber-400 bg-slate-50/30';
      default:
        return 'border-l-4 border-emerald-500 bg-slate-50/30';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reminders & Expiry"
        description="Monitor validity deadlines for your critical certificates and insurance policies."
      />

      {/* Summary Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-extrabold text-slate-800">{stats.totalDocuments}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total</p>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-extrabold text-rose-600">{stats.expired || 0}</p>
            <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mt-1">Expired</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-extrabold text-amber-600">{(stats.critical || 0) + (stats.expiringSoon || 0)}</p>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-1">Expiring</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-extrabold text-emerald-600">{stats.valid || 0}</p>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-1">Valid</p>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex items-center justify-between max-w-2xl">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
          {loading ? 'Loading...' : `${docs.length} document${docs.length !== 1 ? 's' : ''} need attention`}
        </h2>
        <button
          onClick={fetchData}
          className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-2xl p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="max-w-2xl space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse h-16" />
          ))}
        </div>
      )}

      {/* Document List */}
      {!loading && !error && docs.length === 0 && (
        <div className="max-w-2xl bg-white border border-slate-100 rounded-2xl p-10 text-center shadow-sm">
          <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base">All documents are valid!</h3>
          <p className="text-slate-400 text-sm mt-1">No documents expiring within the next 90 days.</p>
        </div>
      )}

      {!loading && !error && docs.length > 0 && (
        <div className="max-w-2xl space-y-4">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className={`bg-white border border-slate-100/80 rounded-2xl p-5 shadow-sm flex items-center justify-between flex-wrap gap-4 transition-all duration-200 hover:shadow-md ${getUrgencyColor(doc.status)}`}
            >
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">{doc.name}</h3>
                <p className="text-xs text-slate-400 font-medium capitalize">{doc.category}</p>
                {doc.expiryDate && (
                  <p className="text-xs text-slate-400">
                    Expiry: {new Date(doc.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
        <p className="text-xs text-slate-400 max-w-2xl flex items-center space-x-1.5">
          <Bell className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Documents expiring within 90 days are shown here. Keep your documents up to date.</span>
        </p>
      )}
    </div>
  )
}
