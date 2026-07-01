import { useState, useEffect } from 'react';
import { statsData as fallbackStats } from '../data';

export default function Stats() {
  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (data && data.stats) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error("Failed to fetch stats:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-night-end relative overflow-hidden border-y border-amber-glow/10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {stats.map((stat: any, index: number) => (
            <div key={index} className="text-center group bg-night-start/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-amber-glow/30 transition-all duration-300 shadow-xl">
              <div className="font-space text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-glow to-amber-200 mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,179,71,0.2)]">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
