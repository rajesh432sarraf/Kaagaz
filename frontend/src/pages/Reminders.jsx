import { Bell, AlertTriangle, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const mockReminders = [
  { id: '1', name: 'Car Insurance', daysLeft: -5, category: 'Insurance', status: 'Expired' },
  { id: '2', name: 'Passport', daysLeft: 23, category: 'Travel', status: 'Critical' },
  { id: '3', name: 'Driving Licence', daysLeft: 84, category: 'Vehicle', status: 'Upcoming' },
  { id: '4', name: 'Identity Card (Aadhaar)', daysLeft: null, category: 'Identity', status: 'Lifetime' }
];

export default function Reminders() {
  const getStatusDisplay = (rem) => {
    if (rem.status === 'Expired') {
      return (
        <div className="flex items-center space-x-2 text-rose-600 font-extrabold text-sm">
          <ShieldAlert className="h-5 w-5" />
          <span>Expired {-rem.daysLeft} days ago</span>
        </div>
      );
    }
    if (rem.status === 'Critical') {
      return (
        <div className="flex items-center space-x-2 text-rose-500 font-extrabold text-sm animate-pulse">
          <AlertTriangle className="h-5 w-5" />
          <span>Expires in {rem.daysLeft} days</span>
        </div>
      );
    }
    if (rem.status === 'Upcoming') {
      return (
        <div className="flex items-center space-x-2 text-amber-600 font-extrabold text-sm">
          <Calendar className="h-5 w-5" />
          <span>Expires in {rem.daysLeft} days</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
        <CheckCircle2 className="h-5 w-5" />
        <span>Lifetime Validity</span>
      </div>
    );
  };

  const getUrgencyColor = (status) => {
    switch (status) {
      case 'Expired':
        return 'border-l-4 border-rose-500 bg-rose-50/10';
      case 'Critical':
        return 'border-l-4 border-rose-400 bg-amber-50/5';
      case 'Upcoming':
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

      <div className="max-w-2xl space-y-4">
        {mockReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`bg-white border border-slate-100/80 rounded-2xl p-5 shadow-sm flex items-center justify-between flex-wrap gap-4 transition-all duration-200 hover:shadow-md ${getUrgencyColor(reminder.status)}`}
          >
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base">{reminder.name}</h3>
              <p className="text-xs text-slate-400 font-medium capitalize">{reminder.category}</p>
            </div>
            
            <div className="flex items-center space-x-6">
              {getStatusDisplay(reminder)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
