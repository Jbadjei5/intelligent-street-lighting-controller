import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { navLinks } from '../data';
import { ArrowLeft, UserCircle, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (data: any) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthModalOpen(false);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    if (isDashboard) {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-night-start/95 backdrop-blur-md border-b border-amber-glow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-space text-2xl font-bold text-white hover:text-amber-glow transition-colors">
                <span className="text-amber-glow">🌙</span> StreetLight AI
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {isDashboard ? (
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-300 hover:text-amber-glow px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-amber-glow/10 focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Website
                </Link>
              ) : (
                navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-amber-glow px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-amber-glow/10 focus-ring"
                  >
                    {link.name}
                  </a>
                ))
              )}
            </div>

            <div className="pl-6 border-l border-white/10 flex items-center space-x-4">
              {user ? (
                <>
                  {!isDashboard && (
                    <Link
                      to="/dashboard"
                      className="text-white hover:text-amber-glow flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-amber-glow/10 border border-amber-glow/20 transition-all hover:bg-amber-glow/20 focus-ring"
                    >
                      <UserCircle className="w-4 h-4" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-red-400/10 focus-ring"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-night-start bg-amber-glow hover:bg-amber-500 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all focus-ring shadow-[0_0_15px_rgba(255,179,71,0.2)]"
                >
                  <UserCircle className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-amber-glow p-3 rounded-lg focus-ring hover:bg-amber-glow/10 transition-all"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-night-start/95 backdrop-blur-md border-t border-amber-glow/20">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {isDashboard ? (
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-300 hover:text-amber-glow px-4 py-3 rounded-lg text-base font-semibold transition-all hover:bg-amber-glow/10 focus-ring"
                onClick={() => setIsMenuOpen(false)}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Website
              </Link>
            ) : (
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-amber-glow block px-4 py-3 rounded-lg text-base font-semibold transition-all hover:bg-amber-glow/10 focus-ring"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))
            )}
            
            <div className="pt-4 mt-2 border-t border-white/10">
              {user ? (
                <>
                  {!isDashboard && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white hover:text-amber-glow flex items-center gap-2 px-4 py-3 rounded-lg text-base font-bold bg-amber-glow/10 border border-amber-glow/20 transition-all mb-2"
                    >
                      <UserCircle className="w-5 h-5" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-400 hover:text-red-300 flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold transition-all hover:bg-red-400/10"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setIsMenuOpen(false); setIsAuthModalOpen(true); }}
                  className="w-full text-night-start bg-amber-glow hover:bg-amber-500 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-bold transition-all"
                >
                  <UserCircle className="w-5 h-5" />
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
    </nav>
  );
}
