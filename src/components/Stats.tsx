import { statsData } from '../data';

export default function Stats() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-night-start to-night-end border-y border-amber-glow/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="font-space text-5xl sm:text-6xl lg:text-7xl font-bold text-amber-glow mb-3 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm sm:text-base font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
