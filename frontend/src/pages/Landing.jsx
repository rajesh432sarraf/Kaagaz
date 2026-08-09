import { Link } from 'react-router-dom'
import { FileText, Shield, Bell, Sparkles, ArrowRight } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <FileText className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-slate-800 text-xl tracking-tight">Kaagaz</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-blue-500/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen Personal Life Administration</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Stop searching. <br />
            Start managing with <span className="text-blue-600">Kaagaz</span>.
          </h1>
          <p className="text-lg text-slate-500 max-w-lg font-medium">
            Keep your critical documents structured, track validity expiry dates automatically, and know exactly what you need for key life events.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              to="/register" 
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 hover:translate-y-[-1px]"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/login" 
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 rounded-xl font-bold transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Visual Mockup Area */}
        <div className="flex-1 w-full max-w-md md:max-w-none">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl relative">
            <div className="absolute -top-6 -left-6 bg-blue-600 text-white p-3 rounded-2xl shadow-xl shadow-blue-500/20 animate-bounce">
              <Shield className="h-6 w-6" />
            </div>
            
            {/* Visual Folder/File Stack Mockup */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Passport.pdf</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Travel • 1.2 MB</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                  Expiring in 23 days
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Driving Licence.pdf</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Vehicle • 840 KB</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Valid
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500">Life Task: Renew Passport</span>
                  <span className="text-xs font-extrabold text-blue-600">66% Ready</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-2/3 rounded-full" />
                </div>
                <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400 font-semibold">
                  <span>2 documents uploaded</span>
                  <span>1 document missing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="bg-white border-t border-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Structured Admin for Real Life</h2>
            <p className="text-slate-500 font-medium">Kaagaz simplifies the complex administrative task of holding document records. We notify you when things expire, and tell you exactly what you need for life milestones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 space-y-3 text-left">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl inline-block">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Secure Storage</h3>
              <p className="text-sm text-slate-500 font-medium">Organize and preview files from anywhere safely with local account credentials.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 space-y-3 text-left">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl inline-block">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Expiry Reminders</h3>
              <p className="text-sm text-slate-500 font-medium">Clear dashboards let you know immediately if any of your ID papers or policies are approaching expiration.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 space-y-3 text-left">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl inline-block">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Task Pre-flight</h3>
              <p className="text-sm text-slate-500 font-medium">Find out exactly what document packages are required before you apply for visas, buy cars, or buy insurance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 border-t border-slate-800 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="font-bold text-white text-sm">Kaagaz</span>
          </div>
          <p>© 2026 Kaagaz Hackathon Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
