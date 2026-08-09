import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Sparkles,
  Calendar,
  Layers,
  Eye,
  ChevronRight
} from 'lucide-react'

// Components
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import QuickAction from '../components/QuickAction'
import SectionHeader from '../components/SectionHeader'
import DocumentDetailModal from '../components/DocumentDetailModal'
import { useAuth } from '../context/AuthContext'
import { getDocumentStats, getDocuments } from '../services/api'

// Mock Data (for document cards fallback)
import { mockCategories } from '../data/mockData'

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentDocs, setRecentDocs] = useState([]);
  const [attentionDocs, setAttentionDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    // Fetch real stats
    getDocumentStats()
      .then(res => setStats(res.data))
      .catch(() => {}); // ignore errors — show dashes

    // Fetch recent docs
    getDocuments()
      .then(res => {
        const docs = res.data || [];
        setRecentDocs(docs.slice(0, 5));
        // Attention docs = expiring/expired/critical ones
        setAttentionDocs(
          docs
            .filter(d => ['Expired', 'Critical', 'Expiring Soon'].includes(d.status))
            .slice(0, 3)
        );
      })
      .catch(() => {});
  }, []);

  const handleView = (doc) => {
    setSelectedDoc(doc);
  };

  // Get greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[--border]">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {greeting}, {firstName} <span className="animate-wiggle inline-block">👋</span>
          </h1>
          <p className="text-sm text-[--text-secondary] font-medium mt-1">
            Here's an overview of your important documents.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/20 flex items-center justify-center text-sm font-bold text-indigo-300 shadow-glow-sm">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Documents" 
          value={stats ? stats.totalDocuments : '0'} 
          icon={FileText} 
          variant="primary" 
          caption={stats ? `${stats.totalDocuments} files in safe` : 'Loading...'}
        />
        <StatCard 
          title="Expiring Soon" 
          value={stats ? (stats.expiringSoon || 0) + (stats.critical || 0) : '0'} 
          icon={AlertTriangle} 
          variant="warning" 
          caption="Expires within 90 days"
        />
        <StatCard 
          title="Expired" 
          value={stats ? (stats.expired || 0) : '0'} 
          icon={XCircle} 
          variant="danger" 
          caption="Renewal required"
        />
        <StatCard 
          title="Categories" 
          value={stats ? Object.keys(stats.categories || {}).length : '0'} 
          icon={Layers} 
          variant="neutral" 
          caption="Structured folders"
        />
      </div>

      {/* 3. Quick Actions */}
      <div className="glass rounded-3xl p-6 shadow-card space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-amber-500/5 pointer-events-none" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-[--text-muted]">Quick Actions</h2>
        <div className="flex items-center gap-3 flex-wrap relative z-10">
          <QuickAction title="Upload Document" path="/upload" icon={Plus} variant="primary" />
          <QuickAction title="View All Documents" path="/documents" icon={FileText} variant="outline" />
          <QuickAction title="Check What I Need" path="/tasks" icon={Sparkles} variant="outline" />
        </div>
      </div>

      {/* Two Column Layout: Left (Recent + Categories) | Right (Needs Attention) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols wide on Desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Documents Table/Cards */}
          <div className="space-y-4">
            <SectionHeader 
              title="Recent Documents" 
              actionLabel="View all" 
              actionPath="/documents" 
            />

            {recentDocs.length > 0 ? (
              <div className="glass rounded-2xl overflow-hidden shadow-card border border-[--border]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-[--border] text-[--text-muted] font-bold text-[10px] uppercase tracking-widest">
                        <th className="px-5 py-4">Name</th>
                        <th className="px-5 py-4">Category</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[--border]/40">
                      {recentDocs.map((doc) => (
                        <tr 
                          key={doc._id} 
                          className="hover:bg-white/5 transition-colors group"
                        >
                          <td className="px-5 py-4 font-bold text-white">
                            {doc.name}
                          </td>
                          <td className="px-5 py-4 font-semibold text-[--text-secondary] text-xs uppercase tracking-wider">
                            {doc.category}
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={doc.status} />
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => handleView(doc)}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/15 rounded-lg transition-all cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 text-center border border-[--border]">
                <p className="text-sm text-[--text-muted] font-medium">No documents uploaded yet.</p>
                <Link to="/upload" className="text-xs font-bold text-indigo-400 hover:underline mt-2 inline-block">
                  Upload your first document →
                </Link>
              </div>
            )}
          </div>

          {/* Document Categories */}
          <div className="space-y-4">
            <SectionHeader title="Document Folders" />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockCategories.map((cat, idx) => {
                const IconComponent = cat.icon;
                // Map Count from real stats if available
                const realCount = stats?.categories?.[cat.name] || 0;
                
                return (
                  <div 
                    key={idx}
                    className="glass rounded-2xl p-4 hover:border-indigo-500/20 hover:shadow-card-hover transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-2.5 rounded-xl border flex-shrink-0 bg-indigo-500/10 border-indigo-500/20 text-indigo-400`}>
                        <IconComponent className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">{cat.name}</span>
                        <span className="text-[10px] font-semibold text-[--text-muted] block">{realCount} files</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col wide on Desktop) */}
        <div className="space-y-6">
          
          {/* Prominent Attention Panel */}
          <div className="space-y-4">
            <SectionHeader 
              title="Attention Required" 
              subtitle="Expiry Deadlines" 
            />

            <div className="glass rounded-3xl p-5 space-y-4 border border-[--border] shadow-card">
              {attentionDocs.length > 0 ? (
                attentionDocs.map((doc, idx) => {
                  const isExpired = doc.status === 'Expired';
                  const isCritical = doc.status === 'Critical';
                  const urgencyBg = isExpired 
                    ? 'bg-rose-500/5 border-rose-500/20' 
                    : isCritical 
                      ? 'bg-orange-500/5 border-orange-500/20 animate-pulse' 
                      : 'bg-amber-500/5 border-amber-500/20';
                  
                  return (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${urgencyBg}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-white text-sm tracking-tight">{doc.name}</h4>
                          <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-wider">{doc.category}</p>
                        </div>
                        <StatusBadge status={doc.status} />
                      </div>

                      <div className="flex items-center justify-between border-t border-[--border]/40 pt-2.5 mt-1 text-xs">
                        <span className="font-bold text-[--text-secondary] flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-[--text-muted]" />
                          {doc.expiryDate
                            ? new Date(doc.expiryDate).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric',
                              })
                            : 'Lifetime'}
                        </span>
                        
                        <button
                          onClick={() => handleView(doc)}
                          className="text-[10px] font-extrabold text-white bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-[--text-muted] font-medium">All documents are fully valid!</p>
                </div>
              )}
            </div>
          </div>

          {/* Life readiness index helper */}
          <div className="glass rounded-3xl p-6 shadow-glow relative overflow-hidden border border-[--border]">
            <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
              <Sparkles className="h-32 w-32 text-indigo-400" />
            </div>
            
            <div className="space-y-5 relative z-10">
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400">Security & Integrity</span>
                <h3 className="text-base font-bold text-white">Are you prepared?</h3>
                <p className="text-xs text-[--text-secondary] font-medium leading-relaxed">Check if you possess all required documents for key milestones.</p>
              </div>

              {/* Mock Milestones Readiness */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[--text-secondary]">Milestones Readiness</span>
                  <span className="font-extrabold text-indigo-400">75%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[75%] rounded-full shadow-glow-sm" />
                </div>
              </div>

              <Link 
                to="/tasks" 
                className="w-full text-center block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-glow-sm hover:shadow-glow cursor-pointer"
              >
                Launch Life Tasks
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Modal detail */}
      {selectedDoc && (
        <DocumentDetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}

    </div>
  )
}
