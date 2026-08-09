import { Link } from 'react-router-dom'
import { FileText, Shield, Bell, Sparkles, ArrowRight, CheckCircle, Zap, Lock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your documents stay on your device. No cloud leaks, no third-party access.',
    color: 'from-indigo-500/20 to-indigo-500/5',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Bell,
    title: 'Smart Expiry Alerts',
    desc: 'Never miss a renewal. Get warned 90 days before any document expires.',
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
  },
  {
    icon: Sparkles,
    title: 'Life Tasks Ready',
    desc: 'Buying a car? Renewing passport? Know exactly which documents you need.',
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
  },
  {
    icon: Zap,
    title: 'Instant Upload',
    desc: 'Drag & drop PDFs, JPGs, PNGs. All organized automatically by category.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
  },
]

const stats = [
  { value: '10+', label: 'Document Types' },
  { value: '100%', label: 'Private' },
  { value: '0', label: 'Subscriptions' },
]

const docTypes = ['Aadhaar', 'Passport', 'PAN Card', 'Driving Licence', 'Insurance', 'RC Book', 'Property Docs', 'Health Card']

export default function Landing() {
  return (
    <div className="min-h-screen document-bg amoled-ui text-[--text-primary] overflow-x-hidden">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-[--border] backdrop-blur-xl bg-[--bg-base]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-glow-sm">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">Kaagaz</span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-semibold uppercase tracking-wider">
              Beta
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-[--text-secondary] hover:text-white transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-glow-sm hover:shadow-glow"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-36 md:pb-24 text-center">
        {/* Glow orb */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>India's personal document manager — now free</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <span className="text-white">Your documents.</span>
          <br />
          <span className="gradient-text">Always ready.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[--text-secondary] font-medium max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Stop digging through WhatsApp, email and drawers to find your Aadhaar, insurance or RC book.
          Kaagaz keeps all your documents organized, tracked and ready to share.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <Link
            to="/register"
            className="group flex items-center space-x-2.5 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start for free</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-2 px-8 py-3.5 rounded-2xl border border-[--border-strong] text-[--text-secondary] hover:text-white hover:border-indigo-500/40 font-semibold text-base transition-all duration-200"
          >
            <span>Sign in</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-10 sm:gap-16 mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs font-medium text-[--text-muted] mt-0.5 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Document type chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.25s' }}>
          {docTypes.map(doc => (
            <span key={doc} className="px-3 py-1.5 rounded-full bg-[--bg-card] border border-[--border] text-xs font-medium text-[--text-secondary] hover:text-white hover:border-indigo-500/30 transition-colors cursor-default">
              {doc}
            </span>
          ))}
          <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300">
            + many more
          </span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Everything you need,
            <span className="gradient-text-indigo"> nothing you don't</span>
          </h2>
          <p className="text-[--text-secondary] text-base max-w-xl mx-auto">
            Built for everyday Indians managing real-life documents — not enterprise complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="relative group glass rounded-3xl p-6 hover:border-indigo-500/25 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 animate-fade-in"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${f.color} mb-4`}>
                  <Icon className={`h-5 w-5 ${f.iconColor}`} />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="glass rounded-4xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5 pointer-events-none rounded-4xl" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="h-3 w-3" />
                <span>Super simple</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                Set up in under<br />
                <span className="gradient-text">2 minutes</span>
              </h2>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Create your account', desc: 'Free forever, no credit card needed.' },
                  { step: '02', title: 'Upload your documents', desc: 'Drag & drop PDF or photos of your documents.' },
                  { step: '03', title: 'Track & get reminded', desc: 'Kaagaz watches expiry dates so you don\'t have to.' },
                ].map(item => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="text-xs text-[--text-secondary] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {/* Mock document cards */}
              {[
                { name: 'Aadhaar Card', cat: 'Identity', status: 'Valid', days: null, color: 'text-emerald-400 bg-emerald-400/10' },
                { name: 'Car Insurance', cat: 'Insurance', status: 'Expiring', days: '23 days', color: 'text-amber-400 bg-amber-400/10' },
                { name: 'Passport', cat: 'Travel', status: 'Valid', days: null, color: 'text-emerald-400 bg-emerald-400/10' },
              ].map((doc, i) => (
                <div
                  key={doc.name}
                  className="glass-elevated rounded-2xl px-5 py-4 flex items-center justify-between animate-slide-up"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{doc.name}</p>
                      <p className="text-xs text-[--text-muted]">{doc.cat}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${doc.color}`}>
                    {doc.days || doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy note */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Lock className="h-6 w-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Your data stays yours</h2>
          <p className="text-[--text-secondary] max-w-md mx-auto text-sm">
            Kaagaz stores everything locally. No analytics, no tracking, no selling your data.
            This is a personal tool — for you.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative rounded-4xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-500/20" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 px-10 py-14 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to get organized?
            </h2>
            <p className="text-indigo-200 mb-8 text-base max-w-md mx-auto">
              Join and take control of your documents today. It's completely free.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <span>Create free account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[--border] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <FileText className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <span className="text-sm font-bold text-[--text-secondary]">Kaagaz</span>
          </div>
          <p className="text-xs text-[--text-muted]">
            © 2024 Kaagaz. Built with ❤️ for India.
          </p>
          <div className="flex items-center space-x-1 text-xs text-[--text-muted]">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span>Fully private. Zero tracking.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
