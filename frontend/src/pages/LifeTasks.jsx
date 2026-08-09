import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, Sparkles, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { getDocuments } from '../services/api'

const taskChecklistTemplates = [
  {
    id: '1',
    name: 'Renew Passport',
    description: 'Required documentation package for renewing an expiring national passport.',
    requirements: [
      { name: 'Old Passport', key: 'passport', matchCategory: 'Identity', matchKeywords: ['passport'] },
      { name: 'Passport Photo (2x2)', key: 'photo', matchCategory: 'Identity', matchKeywords: ['photo', 'pic'] },
      { name: 'Proof of Address (Utility Bill)', key: 'address', matchCategory: 'Other', matchKeywords: ['bill', 'address', 'utility'] },
      { name: 'Application Receipt', key: 'receipt', matchCategory: 'Other', matchKeywords: ['receipt', 'app', 'ack'] }
    ]
  },
  {
    id: '2',
    name: 'Renew Driving Licence',
    description: 'Documentation for updating driving credentials with transport authority.',
    requirements: [
      { name: 'Old Driving Licence', key: 'licence', matchCategory: 'Vehicle', matchKeywords: ['licence', 'license', 'dl'] },
      { name: 'Medical Certificate (Form 1A)', key: 'medical', matchCategory: 'Health', matchKeywords: ['medical', 'cert', 'form'] },
      { name: 'Identity Proof (Aadhaar)', key: 'identity', matchCategory: 'Identity', matchKeywords: ['aadhaar', 'adhaar', 'uidai', 'id'] }
    ]
  },
  {
    id: '3',
    name: 'Apply for Car Insurance',
    description: 'Core documents needed by brokers/companies to establish comprehensive vehicle policies.',
    requirements: [
      { name: 'Driving Licence', key: 'licence', matchCategory: 'Vehicle', matchKeywords: ['licence', 'license', 'dl'] },
      { name: 'Vehicle Registration (RC)', key: 'rc', matchCategory: 'Vehicle', matchKeywords: ['rc', 'registration', 'reg'] },
      { name: 'Previous Insurance Policy', key: 'insurance', matchCategory: 'Insurance', matchKeywords: ['insurance'] }
    ]
  },
  {
    id: '4',
    name: 'Buy a Vehicle',
    description: 'Standard document validation pack required for purchasing a pre-owned or new car.',
    requirements: [
      { name: 'PAN Card', key: 'pan', matchCategory: 'Identity', matchKeywords: ['pan'] },
      { name: 'Address Proof', key: 'address', matchCategory: 'Identity', matchKeywords: ['address', 'bill', 'utility', 'aadhaar', 'adhaar'] },
      { name: 'Bank Statement (Last 6 Months)', key: 'bank', matchCategory: 'Finance', matchKeywords: ['bank', 'statement', 'passbook'] }
    ]
  }
];

export default function LifeTasks() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState('1');

  useEffect(() => {
    getDocuments()
      .then(res => {
        setDocs(res.data || []);
      })
      .catch(err => {
        setError(err.message || 'Failed to load documents.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  // Evaluate document status dynamically based on userDocs
  const evaluateRequirement = (req, userDocs) => {
    const matched = userDocs.find(d => {
      const dName = d.name.toLowerCase();
      const dCat = d.category.toLowerCase();
      
      // Check keywords
      const matchesKeyword = req.matchKeywords.some(keyword => dName.includes(keyword));
      // Check category match
      const matchesCategory = dCat === req.matchCategory.toLowerCase();
      
      return matchesKeyword || matchesCategory;
    });

    if (!matched) return 'Missing';
    if (matched.status === 'Expired') return 'Needs Verification'; // Expired files need update
    return 'Available';
  };

  // Build the list of tasks with dynamically computed status
  const tasks = taskChecklistTemplates.map(task => {
    const documents = task.requirements.map(req => ({
      name: req.name,
      status: evaluateRequirement(req, docs)
    }));
    return {
      ...task,
      documents
    };
  });

  const getProgress = (docsList) => {
    const available = docsList.filter(d => d.status === 'Available').length;
    return Math.round((available / docsList.length) * 100);
  };

  const getDocStatusIcon = (status) => {
    switch (status) {
      case 'Available':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />;
      case 'Missing':
        return <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />;
      case 'Needs Verification':
        return <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 animate-pulse" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Missing':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Needs Verification':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-[--text-secondary] bg-white/5 border-[--border]';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Life Tasks" 
        description="Verify your document readiness index for major life events and tasks."
      />

      {loading && (
        <div className="flex items-center space-x-2 text-indigo-400 py-8">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Analyzing your uploaded documents...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-xs font-semibold max-w-3xl">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 max-w-3xl">
          {tasks.map((task) => {
            const progress = getProgress(task.documents);
            const isExpanded = expandedTaskId === task.id;

            return (
              <div 
                key={task.id}
                className="glass rounded-3xl overflow-hidden transition-all duration-300 hover:border-indigo-500/20 shadow-card"
              >
                {/* Task Summary Card Header */}
                <div 
                  onClick={() => toggleExpand(task.id)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none relative z-10"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center space-x-2.5">
                      <h3 className="font-bold text-white text-base md:text-lg">{task.name}</h3>
                      {progress === 100 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-glow-sm">
                          Ready
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[--text-secondary] font-medium line-clamp-1">{task.description}</p>
                  </div>

                  {/* Progress Circle / Indicator */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest block">Readiness</span>
                      <span className={`text-base font-extrabold block ${progress === 100 ? 'text-emerald-400' : progress >= 50 ? 'text-indigo-400' : 'text-[--text-secondary]'}`}>
                        {progress}%
                      </span>
                    </div>

                    {/* Icon toggle */}
                    <div className="p-1.5 hover:bg-white/5 text-[--text-muted] hover:text-white rounded-lg transition-colors">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {/* Progress Line Bar */}
                <div className="w-full bg-white/5 h-1">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      progress === 100 
                        ? 'bg-emerald-500' 
                        : progress >= 50 
                          ? 'bg-indigo-500 shadow-glow-sm' 
                          : 'bg-[--text-muted]'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Checklist Expand Area */}
                {isExpanded && (
                  <div className="bg-white/5 p-5 border-t border-[--border] space-y-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      <h4 className="text-xs font-bold text-[--text-muted] uppercase tracking-widest">Required Document Checklist</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {task.documents.map((doc, idx) => (
                        <div 
                          key={idx}
                          className="bg-white/5 border border-[--border]/40 hover:border-[--border] rounded-2xl p-4 flex items-center justify-between transition-colors duration-150"
                        >
                          <span className="text-sm font-bold text-white">{doc.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${getStatusBadgeClass(doc.status)}`}>
                              {doc.status}
                            </span>
                            {getDocStatusIcon(doc.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
