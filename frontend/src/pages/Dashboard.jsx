import { Link } from 'react-router-dom'
import { 
  FileText, 
  AlertTriangle, 
  XCircle, 
  Tag, 
  Plus, 
  Bell, 
  Eye, 
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  ShieldX
} from 'lucide-react'

// Components
import StatCard from '../components/StatCard'
import DocumentCard from '../components/DocumentCard'
import StatusBadge from '../components/StatusBadge'
import QuickAction from '../components/QuickAction'
import SectionHeader from '../components/SectionHeader'

// Mock Data
import { mockDocuments, mockCategories } from '../data/mockData'

export default function Dashboard() {
  
  const handleView = (doc) => {
    alert(`Mock viewing: ${doc.name}`);
  };

  // Expiry alerts for the "Needs Your Attention" panel
  // Expiry documents matching description
  const attentionDocs = [
    { 
      id: 'doc-4', 
      name: 'Car Insurance', 
      category: 'Insurance', 
      expiryText: 'Expires in 23 days', 
      status: 'Expiring Soon' 
    },
    { 
      id: 'doc-5', 
      name: 'Driving Licence', 
      category: 'Vehicle', 
      expiryText: 'Expires in 84 days', 
      status: 'Expiring Soon' 
    },
    { 
      id: 'doc-2', 
      name: 'Passport', 
      category: 'Travel', 
      expiryText: 'Expires in 4 years', 
      status: 'Valid' 
    }
  ];

  // Recent Documents (from requirements)
  const recentDocNames = ['Aadhaar Card', 'Passport', 'PAN Card', 'Car Insurance', 'Driving Licence'];
  const recentDocs = mockDocuments.filter(d => recentDocNames.includes(d.name)).slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, Rajesh <span className="animate-wiggle">👋</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Here's an overview of your important documents.
          </p>
        </div>

        {/* Notifications and Profile Avatar */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          
          <div className="h-10 w-10 bg-blue-100 border border-blue-200/50 rounded-xl flex items-center justify-center font-bold text-blue-700 shadow-sm cursor-pointer hover:shadow transition-all">
            R
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Documents" 
          value="12" 
          icon={FileText} 
          variant="primary" 
          caption="12 files in digital storage"
        />
        <StatCard 
          title="Expiring Soon" 
          value="2" 
          icon={AlertTriangle} 
          variant="warning" 
          caption="2 documents need your attention"
        />
        <StatCard 
          title="Expired" 
          value="1" 
          icon={XCircle} 
          variant="danger" 
          caption="1 document requires renewal"
        />
        <StatCard 
          title="Categories" 
          value="6" 
          icon={Layers} 
          variant="neutral" 
          caption="6 folders structured"
        />
      </div>

      {/* 3. Quick Actions */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Quick Actions</h2>
        <div className="flex items-center gap-3.5 flex-wrap">
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

            {/* List Table / Clean Cards */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-extrabold text-[10px] uppercase tracking-wider">
                      <th className="px-5 py-3.5">Name</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentDocs.map((doc) => (
                      <tr 
                        key={doc.id} 
                        className="hover:bg-slate-50/30 transition-colors group"
                      >
                        <td className="px-5 py-3.5 font-bold text-slate-800">
                          {doc.name}
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-slate-400 text-xs uppercase tracking-wider">
                          {doc.category}
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={doc.status} />
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleView(doc)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/40 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Document Categories */}
          <div className="space-y-4">
            <SectionHeader title="Document Folders" />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockCategories.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex items-center justify-between hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-2.5 rounded-xl border flex-shrink-0 ${cat.color}`}>
                        <IconComponent className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-800 block truncate">{cat.name}</span>
                        <span className="text-[10px] font-semibold text-slate-400 block">{cat.count} files</span>
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
              title="Needs Your Attention" 
              subtitle="Critical Expiries" 
            />

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
              {attentionDocs.map((doc, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                    doc.status === 'Expired'
                      ? 'bg-rose-50/20 border-rose-100'
                      : doc.status === 'Expiring Soon'
                        ? 'bg-amber-50/20 border-amber-100'
                        : 'bg-slate-50/20 border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">{doc.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{doc.category}</p>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100/50 pt-2.5 mt-1 text-xs">
                    <span className="font-bold text-slate-500 flex items-center gap-1.5">
                      <Calendar className="h-4.5 w-4.5 text-slate-400" />
                      {doc.expiryText}
                    </span>
                    
                    <button
                      onClick={() => alert(`Review expiry detail for ${doc.name}`)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white shadow-xs border border-slate-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Life readiness index helper */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <Sparkles className="h-32 w-32" />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Security & Integrity</span>
                <h3 className="text-lg font-bold">Ready for events?</h3>
                <p className="text-xs text-slate-400 font-medium">Verify you have the required documents before applying.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Milestones Index</span>
                  <span className="font-extrabold text-blue-400">83%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[83%] rounded-full" />
                </div>
              </div>

              <Link 
                to="/tasks" 
                className="w-full text-center block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-blue-500/10 cursor-pointer"
              >
                Go to Life Tasks
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
