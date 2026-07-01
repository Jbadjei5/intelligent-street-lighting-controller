import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function RemoteAccess() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role); // Save role for UI checks
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section id="remote-access" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-night-end">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-night-start to-night-end opacity-90 z-0" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-glow/5 rounded-full blur-[100px] z-0" />

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-space text-3xl sm:text-4xl font-bold mb-4 text-white tracking-tight">
            Remote Access
          </h2>
          <p className="text-gray-400 font-inter">
            Secure control panel for system monitoring
          </p>
        </div>
        
        <div className="bg-night-end/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-200" />
          
          <p className="text-gray-300 font-inter text-center mb-8">
            Please sign in with your Google account to access the dashboard.
          </p>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setError('Google Login Failed');
            }}
            useOneTap
            theme="filled_black"
            shape="pill"
          />

          {error && <div className="text-red-400 text-sm font-inter text-center mt-6">{error}</div>}
        </div>
      </div>
    </section>
  );
}
