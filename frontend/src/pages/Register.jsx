import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FileText, User, Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) { setError('Please fill in all fields.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 900);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen document-bg amoled-ui flex items-center justify-center p-6">
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in-scale">
        <div className="glass rounded-4xl p-8 sm:p-10 shadow-card">

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-5 hover:bg-indigo-500/20 transition-colors">
              <FileText className="h-6 w-6 text-indigo-400" />
            </Link>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Create your account</h1>
            <p className="text-[--text-secondary] text-sm mt-1.5">Keep your documents organized and secure</p>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-6">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>Account created! Taking you to your dashboard…</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-muted]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full pl-11 pr-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-muted]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-muted]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-11 pr-12 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[--text-muted] hover:text-white transition-colors">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-muted]" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="group w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold text-sm transition-all duration-200 shadow-glow-sm hover:shadow-glow mt-2"
            >
              <span>{loading ? 'Creating account…' : 'Sign Up'}</span>
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-sm text-[--text-secondary] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        <p className="text-center mt-6 text-xs text-[--text-muted]">
          <Link to="/" className="hover:text-[--text-secondary] transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
