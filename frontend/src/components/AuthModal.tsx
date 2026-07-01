import { useState } from 'react';
import { createPortal } from 'react-dom';
import { GoogleLogin } from '@react-oauth/google';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    // For login, backend expects `identifier` which can be username or email
    const payload = isLogin 
      ? { identifier: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      onSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    
    try {
      const res = await fetch(`${apiUrl}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Google authentication failed');
      }
      
      onSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex p-4 sm:p-6 bg-night-start/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md m-auto animate-in fade-in zoom-in-95 duration-300">
        
        {/* Decorative background glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-glow/40 to-blue-500/40 rounded-3xl blur-xl opacity-50"></div>
        
        <div className="relative bg-gradient-to-b from-night-start to-night-end border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
          
          <div className="relative h-32 bg-night-start overflow-hidden flex items-center justify-center border-b border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-all bg-black/20 hover:bg-black/40 p-1.5 rounded-full backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative z-10 text-center">
              <div className="mx-auto w-12 h-12 bg-amber-glow/10 border border-amber-glow/30 rounded-xl flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(255,179,71,0.3)]">
                <Lock className="w-6 h-6 text-amber-glow" />
              </div>
              <h2 className="text-2xl font-space font-bold text-white tracking-wide">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-inter flex items-start gap-3">
                <span className="mt-0.5">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-inter ml-1">Username</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-500 group-focus-within:text-amber-glow transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      required
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-glow focus:border-amber-glow focus:bg-white/10 transition-all font-inter"
                      placeholder="johndoe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-inter ml-1">
                  {isLogin ? 'Email or Username' : 'Email Address'}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-amber-glow transition-colors" />
                  </div>
                  <input
                    type={isLogin ? 'text' : 'email'}
                    name="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-glow focus:border-amber-glow focus:bg-white/10 transition-all font-inter"
                    placeholder={isLogin ? "Enter email or username" : "you@example.com"}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-inter ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-amber-glow transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-glow focus:border-amber-glow focus:bg-white/10 transition-all font-inter"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-night-start bg-amber-glow hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-night-start focus:ring-amber-glow transition-all disabled:opacity-70 shadow-[0_0_15px_rgba(255,179,71,0.2)] hover:shadow-[0_0_25px_rgba(255,179,71,0.4)]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-night-start" /> : (isLogin ? 'Sign In Securely' : 'Create Account')}
              </button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
                <span className="px-4 bg-night-end text-gray-500">Or Continue With</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center px-1">
              <div className="w-full rounded-xl overflow-hidden shadow-lg border border-white/5 transition-all hover:border-white/20">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Login Failed')}
                  theme="filled_black"
                  shape="rectangular"
                  text="continue_with"
                />
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400 font-inter">
              {isLogin ? "New to StreetLight AI? " : "Already have an account? "}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="font-bold text-amber-glow hover:text-amber-500 transition-colors focus:outline-none focus:underline"
              >
                {isLogin ? 'Create an account' : 'Log in here'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
