import { useState } from 'react'
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
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
        return <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />;
      case 'Missing':
        return <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />;
      case 'Needs Verification':
        return <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 animate-pulse" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Missing':
        return 'text-rose-700 bg-rose-50 border-rose-100';
      case 'Needs Verification':
        return 'text-amber-700 bg-amber-50 border-amber-100';
      default:
        return 'text-slate-500 bg-slate-50 border-slate-100';
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
              className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-200/60"
            >
              {/* Task Summary Card Header */}
              <div 
                onClick={() => toggleExpand(task.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex items-center space-x-2.5">
                    <h3 className="font-bold text-slate-800 text-base md:text-lg">{task.name}</h3>
                    {progress === 100 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Ready to go!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-medium line-clamp-1">{task.description}</p>
                </div>

                {/* Progress Circle / Indicator */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
                    <span className={`text-base font-extrabold block ${progress === 100 ? 'text-emerald-600' : progress >= 50 ? 'text-blue-600' : 'text-slate-500'}`}>
                      {progress}%
                    </span>
                  </div>

                  {/* Icon toggle */}
                  <div className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>

              {/* Progress Line Bar */}
              <div className="w-full bg-slate-100 h-1.5">
                <div 
                  className={`h-full transition-all duration-500 ${
                    progress === 100 
                      ? 'bg-emerald-600' 
                      : progress >= 50 
                        ? 'bg-blue-600' 
                        : 'bg-slate-400'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Checklist Expand Area */}
              {isExpanded && (
                <div className="bg-slate-50/50 p-5 border-t border-slate-100/50 space-y-3.5 animate-slide-down">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Required Document Checklist</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {task.documents.map((doc, idx) => (
                      <div 
                        key={idx}
                        className="bg-white border border-slate-150 rounded-xl p-3.5 flex items-center justify-between shadow-xs"
                      >
                        <span className="text-sm font-semibold text-slate-700">{doc.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadgeClass(doc.status)}`}>
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
