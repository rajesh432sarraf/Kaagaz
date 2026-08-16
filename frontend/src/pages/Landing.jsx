import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import { 
  FileText, Shield, Bell, Sparkles, ArrowRight, CheckCircle2, 
  XCircle, Clock, Lock, ShieldCheck, Download, Trash2, Smartphone, 
  HelpCircle, Eye, EyeOff, Check, RefreshCw
} from 'lucide-react'

// Interactive Demo Documents
const demoDocs = [
  { id: '1', name: 'Aadhaar Card', category: 'Identity', issueDate: '2021-04-12', expiryDate: '', status: 'Valid', description: 'National identity card. Validity is lifetime.', color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' },
  { id: '2', name: 'Car Insurance', category: 'Insurance', issueDate: '2025-08-01', expiryDate: '2026-08-01', status: 'Expiring Soon', description: 'Comprehensive car insurance policy with National Insurance.', color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
  { id: '3', name: 'Driving Licence', category: 'Vehicle', issueDate: '2016-09-01', expiryDate: '2026-09-01', status: 'Critical', description: 'Class LMV & MCWG transport permit issued by RTO.', color: 'text-rose-400 border-rose-500/20 bg-rose-500/5' },
];

export default function Landing() {
  // States for Interactive Widgets
  const [selectedDemoDocId, setSelectedDemoDocId] = useState('1');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState({
    aadhaar: true,
    pan: true,
    license: false,
    rc: false,
    insurance: false,
    passport: false,
  });

  // Auto-cycle demo documents every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedDemoDocId((currentId) => {
        const currentIndex = demoDocs.findIndex((d) => d.id === currentId);
        const nextIndex = (currentIndex + 1) % demoDocs.length;
        return demoDocs[nextIndex].id;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [selectedDemoDocId]);

  const activeDemoDoc = demoDocs.find(d => d.id === selectedDemoDocId) || demoDocs[0];

  // Calculate readiness score
  const totalDocs = Object.keys(checkedDocs).length;
  const ownedDocsCount = Object.values(checkedDocs).filter(Boolean).length;
  const readinessPercentage = Math.round((ownedDocsCount / totalDocs) * 100);

  const toggleCheck = (key) => {
    setCheckedDocs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getUrgencyText = (status) => {
    if (status === 'Expiring Soon') return 'Expires in 350 days';
    if (status === 'Critical') return 'Expires in 23 days';
    return 'Lifetime Validity';
  };

  return (
    <div className="min-h-screen document-bg amoled-ui text-[--text-primary] overflow-x-hidden pb-12 font-sans">
      
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-[--border] backdrop-blur-xl bg-[--bg-base]/85">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoImg} alt="Kaagaz Logo" style={{ height: '36px', width: 'auto' }} className="object-contain" />
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-[--text-secondary] hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-glow-sm hover:shadow-glow"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section: Two-Column Layout */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 lg:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Left: Text & CTA */}
        <div className="lg:col-span-6 space-y-6 text-left relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Smart Personal Document Administration</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Stop digging folders.<br />
            Manage with Kaagaz.
          </h1>

          <p className="text-base sm:text-lg text-[--text-secondary] font-medium leading-relaxed max-w-xl">
            A secure digital safe for your Aadhaar, driving license, vehicle papers, and insurance cards. Auto-calculates critical expiry dates and warns you before it's too late.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              to="/register"
              className="group flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:scale-[1.02]"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl border border-[--border-strong] text-[--text-secondary] hover:text-white hover:border-indigo-500/40 font-semibold text-sm transition-all"
            >
              <span>Sign In to Vault</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center space-x-6 text-xs text-[--text-muted]">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
              <span>100% Device-Local Database</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Lock className="h-4.5 w-4.5 text-indigo-400" />
              <span>Zero cloud uploads</span>
            </div>
          </div>
        </div>

        {/* Hero Right: Live Interactive App Preview */}
        <div className="lg:col-span-6 relative z-10">
          <div className="glass rounded-3xl p-6 shadow-card border border-[--border] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-amber-500/5 pointer-events-none" />
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-[--border] mb-5">
              <div>
                <p className="text-[10px] font-extrabold text-[--text-muted] uppercase tracking-widest">Interactive Sandbox</p>
                <h3 className="text-sm font-bold text-white mt-0.5">Kaagaz Dashboard Preview</h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Document select list */}
            <div className="space-y-2 mb-4">
              <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-2">Select a document card to inspect</p>
              <div className="grid grid-cols-3 gap-2">
                {demoDocs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDemoDocId(doc.id)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      selectedDemoDocId === doc.id
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow-sm scale-[1.03]'
                        : 'bg-white/5 border-[--border] text-[--text-secondary] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {doc.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Preview Display */}
            <div className="glass-elevated rounded-2xl p-5 border border-[--border-strong] space-y-4 shadow-card">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${activeDemoDoc.color.split(' ').slice(1).join(' ')}`}>
                  <FileText className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[--text-muted] block">Status</span>
                  <span className={`inline-block text-[10px] font-bold mt-1 px-2.5 py-0.5 rounded-full border ${
                    activeDemoDoc.status === 'Valid' 
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                      : activeDemoDoc.status === 'Expiring Soon'
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                        : 'text-rose-400 bg-rose-500/10 border-rose-500/20 animate-pulse'
                  }`}>
                    {activeDemoDoc.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base leading-snug">{activeDemoDoc.name}</h4>
                <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-wider mt-0.5">{activeDemoDoc.category}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-[--border] pt-3">
                <div>
                  <span className="text-[--text-muted] font-bold block uppercase tracking-wider text-[9px] mb-0.5">Issued</span>
                  <span className="text-[--text-secondary] font-semibold">{activeDemoDoc.issueDate}</span>
                </div>
                <div>
                  <span className="text-[--text-muted] font-bold block uppercase tracking-wider text-[9px] mb-0.5">Expiry / Alert</span>
                  <span className={`font-semibold ${activeDemoDoc.status === 'Critical' ? 'text-rose-400' : 'text-[--text-secondary]'}`}>
                    {getUrgencyText(activeDemoDoc.status)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-[--border] pt-3">
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/15 rounded-xl transition-all cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Metadata</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Milestone Readiness Calculator */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-[--border]/40">
        <div className="glass rounded-4xl p-8 sm:p-12 border border-[--border] shadow-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Checklist text on Left */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <span>Interactive Tool</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Check Your Personal<br />
                <span className="gradient-text">Readiness Index</span>
              </h2>
              <p className="text-sm text-[--text-secondary] leading-relaxed max-w-md">
                Select the documents you currently have inside your physical vault. We will calculate your instant preparedness rating for general transactions and audits.
              </p>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-[--border] space-y-3 max-w-sm">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[--text-secondary]">milestone readiness</span>
                  <span className={`font-extrabold ${readinessPercentage === 100 ? 'text-emerald-400' : readinessPercentage >= 50 ? 'text-indigo-400' : 'text-amber-400'}`}>
                    {readinessPercentage}%
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300 shadow-glow-sm" 
                    style={{ width: `${readinessPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Checklist grid of interactive buttons on Right */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
              {[
                { key: 'aadhaar', label: 'Aadhaar Card' },
                { key: 'pan', label: 'PAN Card' },
                { key: 'license', label: 'Driving Licence' },
                { key: 'rc', label: 'Vehicle RC Book' },
                { key: 'insurance', label: 'Car Insurance' },
                { key: 'passport', label: 'Passport Book' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all select-none ${
                    checkedDocs[item.key]
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-white shadow-glow-sm'
                      : 'bg-white/5 border-[--border] text-[--text-secondary] hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <div className={`h-4.5 w-4.5 rounded-md flex items-center justify-center border transition-all ${
                    checkedDocs[item.key]
                      ? 'bg-indigo-500 border-indigo-400 text-white'
                      : 'border-[--border-strong] bg-white/5'
                  }`}>
                    {checkedDocs[item.key] && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Feature Comparison Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[--border]/40 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Designed for Real Life.
            <span className="gradient-text-indigo"> Powered by privacy.</span>
          </h2>
          <p className="text-sm text-[--text-secondary] max-w-md mx-auto mt-2">
            Why use a dedicated personal safe instead of cloud storage folders?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email / WhatsApp block */}
          <div className="glass rounded-3xl p-6 border-red-500/10 space-y-4">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <XCircle className="h-4.5 w-4.5" />
              <span>WhatsApp / Email Folders</span>
            </h3>
            <ul className="space-y-2 text-xs text-[--text-secondary] list-disc list-inside">
              <li>Manual and cluttered search when you need documents urgently.</li>
              <li>Zero alerts when insurance, license or certificates expire.</li>
              <li>Exposed to cloud leaks and third-party data tracking.</li>
            </ul>
          </div>

          {/* Kaagaz Vault block */}
          <div className="glass rounded-3xl p-6 border-emerald-500/20 shadow-glow-sm space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5" />
              <span>Kaagaz Local Vault</span>
            </h3>
            <ul className="space-y-2 text-xs text-[--text-secondary] list-disc list-inside">
              <li>Direct category tags for instant offline lookup.</li>
              <li>Automated warning indicators for expiry schedules.</li>
              <li>Stored 100% locally on your browser. Zero cloud tracking.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Detail Modal Mockup */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md glass-elevated rounded-3xl p-6 space-y-5 shadow-glow-lg animate-fade-in-scale">
            {/* Close */}
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-[--text-muted] hover:text-white"
            >
              <XCircle className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-extrabold text-white text-base">{activeDemoDoc.name}</h3>
              </div>
              <p className="text-xs text-[--text-secondary]">{activeDemoDoc.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-y border-[--border] py-4">
              <div>
                <p className="font-bold text-[--text-muted] uppercase tracking-widest mb-1">Category</p>
                <p className="text-sm font-semibold text-[--text-secondary]">{activeDemoDoc.category}</p>
              </div>
              <div>
                <p className="font-bold text-[--text-muted] uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-semibold text-[--text-secondary]">{activeDemoDoc.status}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-glow-sm transition-colors"
              >
                Close Sandbox
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer block */}
      <footer className="border-t border-[--border]/40 pt-12 pb-8 px-6 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* About Me Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">About the Creator</h4>
            <p className="text-xs text-[--text-secondary] leading-relaxed max-w-sm">
              Designed & developed by <span className="text-white font-bold">Rajesh Sarraf</span>. Passionate about building secure, privacy-first, local-vault utilities to simplify digital life.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Contact Us</h4>
            <div className="flex items-center space-x-2 text-xs text-[--text-secondary]">
              <svg className="h-4 w-4 text-indigo-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <a 
                href="mailto:sarrafrajesh432@gmail.com" 
                className="hover:text-white hover:underline transition-all"
              >
                sarrafrajesh432@gmail.com
              </a>
            </div>
            <p className="text-[10px] text-[--text-muted]">Feel free to reach out for suggestions or collaborations.</p>
          </div>

          {/* Social Links Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Connect with Me</h4>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/rajesh432sarraf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/5 border border-[--border] hover:border-indigo-500/30 text-[--text-secondary] hover:text-white rounded-xl transition-all shadow-glow-sm hover:shadow-glow"
                title="GitHub Profile"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/rajesh432sarraf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/5 border border-[--border] hover:border-indigo-500/30 text-[--text-secondary] hover:text-white rounded-xl transition-all shadow-glow-sm hover:shadow-glow"
                title="LinkedIn Profile"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a 
                href="https://x.com/rajesh432sarraf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/5 border border-[--border] hover:border-indigo-500/30 text-[--text-secondary] hover:text-white rounded-xl transition-all shadow-glow-sm hover:shadow-glow"
                title="Twitter Profile"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-[--border]/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[--text-muted]">
          <div className="flex items-center">
            <img src={logoImg} alt="Kaagaz Logo" style={{ height: '24px', width: 'auto' }} className="object-contain" />
          </div>
          <p>© 2026 Kaagaz. Stored locally. Zero tracking. Crafted with ❤️ by Rajesh.</p>
        </div>
      </footer>

    </div>
  )
}
