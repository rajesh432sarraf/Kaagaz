import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FileText, Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logoImg from '../assets/logo.png'

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen document-bg amoled-ui flex items-center justify-center p-6">
      {/* Glow orb */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in-scale">
        {/* Card */}
        <div className="glass rounded-4xl p-8 sm:p-10 shadow-card">

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img src={logoImg} alt="Kaagaz Logo" style={{ height: '40px', width: 'auto' }} className="mx-auto object-contain" />
            </Link>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome back</h1>
            <p className="text-[--text-secondary] text-sm mt-1.5">Sign in to access your documents</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-6">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[--text-muted] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold text-sm transition-all duration-200 shadow-glow-sm hover:shadow-glow mt-2"
            >
              <span>{loading ? 'Signing in…' : 'Sign In'}</span>
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-[--text-secondary] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Create one
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-xs text-[--text-muted]">
          <Link to="/" className="hover:text-[--text-secondary] transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
