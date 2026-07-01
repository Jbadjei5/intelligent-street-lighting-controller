import { useState, useEffect } from 'react';
import { Activity, LayoutDashboard, Sliders, LogOut, Power, Sun } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'settings'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [userRole, setUserRole] = useState<'viewer' | 'admin'>('viewer');
  const [userData, setUserData] = useState<any>(null);
  
  const [devices, setDevices] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    ldrThreshold: 150,
    pirTimeout: 30,
    globalOverride: false,
  });

  const fetchDashboardData = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    
    // Fetch stats
    fetch(`${apiUrl}/api/stats`)
      .then(res => res.json())
      .then(data => { if (data?.stats) setStats(data); })
      .catch(err => console.error("Failed to fetch stats:", err));

    // Fetch devices
    fetch(`${apiUrl}/api/devices`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setDevices(data); })
      .catch(err => console.error("Failed to fetch devices:", err));

    // Fetch settings
    fetch(`${apiUrl}/api/settings`)
      .then(res => res.json())
      .then(data => { 
        if (data && data.ldr_threshold) {
          setSettings({
            ldrThreshold: data.ldr_threshold,
            pirTimeout: data.pir_timeout,
            globalOverride: data.global_override
          });
        }
      })
      .catch(err => console.error("Failed to fetch settings:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      onLogout();
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        if (data.user) {
          setUserData(data.user);
          if (data.user.role) {
            setUserRole(data.user.role);
          }
        }
      })
      .catch(() => {
        onLogout();
      });

    fetchDashboardData();
    // Poll every 5 seconds for live updates
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = async (id: string, currentOverride: boolean, currentBrightness: number) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const newOverride = !currentOverride;
    // If we are overriding it ON, set to 255. If OFF, set to 0. 
    // If we are disabling override, the hardware will take over naturally.
    const targetBrightness = newOverride ? (currentBrightness === 0 ? 255 : 0) : 0;

    const token = localStorage.getItem('token');
    try {
      await fetch(`${apiUrl}/api/devices/${id}/override`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          manual_override: newOverride,
          target_brightness: targetBrightness
        })
      });
      fetchDashboardData(); // Refresh immediately
    } catch (error) {
      console.error("Failed to toggle device:", error);
    }
  };

  const saveSettings = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const token = localStorage.getItem('token');
    try {
      await fetch(`${apiUrl}/api/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          ldr_threshold: settings.ldrThreshold,
          pir_timeout: settings.pirTimeout,
          global_override: settings.globalOverride
        })
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert('Error saving settings.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-night-end relative z-10 overflow-hidden">
      
      {/* Navigation (Sidebar on Desktop, Top/Bottom bar on Mobile) */}
      <div className="w-full md:w-64 bg-night-start/80 border-b md:border-b-0 md:border-r border-white/5 flex flex-col md:p-6 p-4">
        <div className="flex items-center justify-between md:justify-start gap-3 md:mb-10 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-glow/20 flex items-center justify-center border border-amber-glow/30">
              <Activity className="w-5 h-5 text-amber-glow" />
            </div>
            <div>
              <h3 className="font-space font-bold text-white tracking-wide">ISLC</h3>
              <p className="text-xs text-amber-glow font-inter hidden md:block">Control Panel</p>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="md:hidden flex items-center justify-center p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide flex-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all duration-300 font-inter text-sm font-medium ${
              activeTab === 'overview' 
                ? 'bg-amber-glow/10 text-amber-glow border border-amber-glow/30' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('devices')}
            className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all duration-300 font-inter text-sm font-medium ${
              activeTab === 'devices' 
                ? 'bg-amber-glow/10 text-amber-glow border border-amber-glow/30' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Power className="w-4 h-4" />
            Devices
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all duration-300 font-inter text-sm font-medium ${
              activeTab === 'settings' 
                ? 'bg-amber-glow/10 text-amber-glow border border-amber-glow/30' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Settings
          </button>
        </nav>

        <div className="hidden md:block mt-auto pt-6 border-t border-white/5">
          {userData && (
            <div className="mb-4 px-2">
              <div className="text-sm font-space font-bold text-white truncate">{userData.username}</div>
              <div className="text-xs font-inter text-gray-500 truncate">{userData.email}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest mt-1 text-amber-glow">
                Role: {userData.role}
              </div>
            </div>
          )}
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all duration-300 font-inter text-sm font-bold uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-space text-3xl font-bold text-white mb-2">Live Overview</h2>
            <p className="text-gray-400 font-inter mb-8">Real-time system telemetry and statistics.</p>
            
            {stats ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-night-start/40 border border-white/5 rounded-2xl p-6">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Energy Saved</div>
                  <div className="text-4xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-glow to-amber-200">
                    {stats.details?.energySavedPercent || 0}%
                  </div>
                </div>
                <div className="bg-night-start/40 border border-white/5 rounded-2xl p-6">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">System Uptime</div>
                  <div className="text-4xl font-space font-bold text-green-400">
                    {stats.details?.uptimePercent || 0}%
                  </div>
                </div>
                <div className="bg-night-start/40 border border-white/5 rounded-2xl p-6">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Motion Events</div>
                  <div className="text-4xl font-space font-bold text-white">
                    {stats.details?.motionEvents?.toLocaleString() || 0}
                  </div>
                </div>
                <div className="bg-night-start/40 border border-white/5 rounded-2xl p-6">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Sensor Readings</div>
                  <div className="text-4xl font-space font-bold text-white">
                    {stats.details?.totalReadings?.toLocaleString() || 0}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-amber-glow animate-pulse">Loading telemetry...</div>
            )}
            
            <div className="bg-night-start/40 border border-white/5 rounded-2xl p-6">
              <h3 className="font-space font-bold text-white mb-4">Activity Feed</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm font-inter text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-amber-glow"></div>
                  <span className="text-gray-500 w-24">Just now</span>
                  <span>Motion detected in <strong className="text-white">Zone B</strong>. Brightness increased to 100%.</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-inter text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-gray-500 w-24">12 mins ago</span>
                  <span>Ambient light level dropped below threshold. System active.</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-inter text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-gray-500 w-24">1 hour ago</span>
                  <span>System routine diagnostic completed successfully.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEVICES TAB */}
        {activeTab === 'devices' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-space text-3xl font-bold text-white mb-2">Device Management</h2>
            <p className="text-gray-400 font-inter mb-8">Manually override and monitor individual street light zones.</p>
            
            <div className="grid grid-cols-1 gap-4">
              {devices.map(device => (
                <div key={device.id} className="bg-night-start/40 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-amber-glow/20 transition-all duration-300">
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${device.status === 'online' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                      <Sun className={`w-6 h-6 ${device.status === 'online' ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-space font-bold text-white text-lg">{device.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                        <span className="text-xs font-inter text-gray-400 uppercase tracking-wider">{device.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-8 bg-night-end/50 py-3 px-6 rounded-xl border border-white/5">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 font-bold uppercase mb-1">Brightness</div>
                      <div className="font-space font-bold text-white">{Math.round((device.current_brightness / 255) * 100)}%</div>
                    </div>
                    <div className="text-center border-l border-white/10 pl-8">
                      <div className="text-xs text-gray-500 font-bold uppercase mb-1">Motion</div>
                      <div className={`font-space font-bold ${device.motion_detected ? 'text-amber-glow' : 'text-gray-400'}`}>
                        {device.motion_detected ? 'YES' : 'NO'}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleDevice(device.id, device.manual_override, device.current_brightness)}
                    disabled={device.status === 'offline' || userRole !== 'admin'}
                    title={userRole !== 'admin' ? "Only Admins can override devices" : ""}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-space transition-all duration-300 disabled:opacity-50 ${
                      device.current_brightness > 0 
                        ? 'bg-amber-glow text-night-start hover:bg-amber-500 shadow-[0_0_15px_rgba(255,179,71,0.3)]' 
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    } ${userRole !== 'admin' ? 'cursor-not-allowed grayscale' : ''}`}
                  >
                    {device.current_brightness > 0 ? 'TURN OFF' : 'TURN ON'}
                  </button>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-space text-3xl font-bold text-white mb-2">System Settings</h2>
            <p className="text-gray-400 font-inter mb-8">Configure hardware thresholds and automation rules.</p>
            
            <div className="space-y-6 max-w-2xl">
              <div className="bg-night-start/40 border border-white/5 rounded-2xl p-6">
                <label className="flex items-center justify-between mb-4">
                  <span className="font-space font-bold text-white">LDR Sensitivity Threshold</span>
                  <span className="text-amber-glow font-bold">{settings.ldrThreshold}</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="1023" 
                  value={settings.ldrThreshold}
                  onChange={(e) => setSettings({...settings, ldrThreshold: parseInt(e.target.value)})}
                  className="w-full accent-amber-glow" 
                />
                <p className="text-xs text-gray-500 font-inter mt-3">Values below this threshold will be considered "Night" and activate the lighting system.</p>
              </div>

              <div className="bg-night-start/40 border border-white/5 rounded-2xl p-6">
                <label className="flex items-center justify-between mb-4">
                  <span className="font-space font-bold text-white">PIR Motion Timeout (Seconds)</span>
                  <span className="text-amber-glow font-bold">{settings.pirTimeout}s</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="300" 
                  value={settings.pirTimeout}
                  onChange={(e) => setSettings({...settings, pirTimeout: parseInt(e.target.value)})}
                  className="w-full accent-amber-glow" 
                />
                <p className="text-xs text-gray-500 font-inter mt-3">Duration the lights stay at 100% brightness after detecting motion.</p>
              </div>

              <div className="bg-night-start/40 border border-amber-glow/20 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-space font-bold text-white mb-1">Global Manual Override</h3>
                  <p className="text-xs text-gray-400 font-inter max-w-sm">When enabled, the system will ignore all sensor inputs and keep lights ON indefinitely.</p>
                </div>
                <button 
                  onClick={() => setSettings({...settings, globalOverride: !settings.globalOverride})}
                  disabled={userRole !== 'admin'}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${settings.globalOverride ? 'bg-amber-glow' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.globalOverride ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="pt-6">
                <button 
                  onClick={saveSettings}
                  disabled={userRole !== 'admin'}
                  title={userRole !== 'admin' ? "Only Admins can save settings" : ""}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-300 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
