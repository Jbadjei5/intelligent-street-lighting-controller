import { useState } from 'react';

export default function RemoteAccess() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <section id="remote-access" className="py-16 px-4 sm:px-6 lg:px-8 bg-night-end/30">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-space text-3xl sm:text-4xl font-bold mb-4 text-amber-glow">
            Remote Access
          </h2>
          <p className="text-lg text-gray-300">
            Secure control panel for system monitoring
          </p>
        </div>
        
        {!isLoggedIn ? (
          <div className="bg-night-start/50 border border-amber-glow/20 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-night-end/50 border border-amber-glow/20 rounded-lg text-white placeholder-gray-500 focus:border-amber-glow focus:ring-2 focus:ring-amber-glow/20 focus-ring"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-night-end/50 border border-amber-glow/20 rounded-lg text-white placeholder-gray-500 focus:border-amber-glow focus:ring-2 focus:ring-amber-glow/20 focus-ring"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-3 bg-amber-glow text-night-start font-medium rounded-lg hover:bg-amber-glow/90 transition-colors focus-ring"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Demo: Enter any credentials to continue
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-night-start/50 border border-amber-glow/20 rounded-lg p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="font-space text-2xl font-bold text-amber-glow mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-300 mb-6">
              Remote dashboard functionality is under development.
            </p>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-6 py-2 border border-amber-glow/40 text-amber-glow rounded-lg hover:bg-amber-glow/10 transition-colors focus-ring"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
