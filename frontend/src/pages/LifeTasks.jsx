import { useState } from 'react'
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const initialTasks = [
  {
    id: '1',
    name: 'Renew Passport',
    description: 'Required documentation package for renewing an expiring national passport.',
    documents: [
      { name: 'Old Passport', status: 'Available' },
      { name: 'Passport Photo (2x2)', status: 'Available' },
      { name: 'Proof of Address (Utility Bill)', status: 'Missing' },
      { name: 'Application Receipt', status: 'Needs Verification' }
    ]
  },
  {
    id: '2',
    name: 'Renew Driving Licence',
    description: 'Documentation for updating driving credentials with transport authority.',
    documents: [
      { name: 'Old Driving Licence', status: 'Available' },
      { name: 'Medical Certificate (Form 1A)', status: 'Available' },
      { name: 'Identity Proof (Aadhaar)', status: 'Available' }
    ]
  },
  {
    id: '3',
    name: 'Apply for Car Insurance',
    description: 'Core documents needed by brokers/companies to establish comprehensive vehicle policies.',
    documents: [
      { name: 'Driving Licence', status: 'Available' },
      { name: 'Vehicle Registration (RC)', status: 'Available' },
      { name: 'Previous Insurance Policy', status: 'Missing' }
    ]
  },
  {
    id: '4',
    name: 'Buy a Vehicle',
    description: 'Standard document validation pack required for purchasing a pre-owned or new car.',
    documents: [
      { name: 'PAN Card', status: 'Available' },
      { name: 'Address Proof', status: 'Missing' },
      { name: 'Bank Statement (Last 6 Months)', status: 'Missing' }
    ]
  }
];

export default function LifeTasks() {
  const tasks = initialTasks;
  const [expandedTaskId, setExpandedTaskId] = useState('1'); // Expand first task by default

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  // Helper to calculate progress
  const getProgress = (docs) => {
    const available = docs.filter(d => d.status === 'Available').length;
    return Math.round((available / docs.length) * 100);
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
    <div className="space-y-6">
      <PageHeader 
        title="Life Tasks" 
        description="Verify your document readiness index for major life events and tasks."
      />

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
    </div>
  )
}
