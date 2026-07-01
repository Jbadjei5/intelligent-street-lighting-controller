import { useState } from 'react';
import { portfolioData } from '../data';
import { Activity, Cpu, Wrench } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = ['all', 'sensor', 'control', 'hardware'];

  const filteredData = activeFilter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    if (category === 'sensor') return <Activity className="w-16 h-16 text-amber-glow" />;
    if (category === 'control') return <Cpu className="w-16 h-16 text-amber-glow" />;
    return <Wrench className="w-16 h-16 text-amber-glow" />;
  };

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-night-start">
      <div className="absolute inset-0 bg-gradient-to-t from-night-end via-transparent to-transparent opacity-80" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
            Our Features
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-inter">
            Explore the key functionalities and integrations of our smart lighting system
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 focus-ring font-inter text-sm tracking-wide ${
                activeFilter === category
                  ? 'bg-amber-glow text-night-start shadow-[0_0_15px_rgba(255,179,71,0.4)]'
                  : 'bg-night-end/50 backdrop-blur-sm border border-amber-glow/20 text-gray-300 hover:bg-amber-glow/10 hover:text-amber-glow hover:border-amber-glow'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-night-end/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden group hover:bg-night-end/50 hover:border-amber-glow/40 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-amber-glow/10"
            >
              <div className="h-48 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-glow/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                  {getCategoryIcon(item.category)}
                </div>
              </div>
              <div className="p-8 border-t border-white/5 relative bg-night-end/50">
                <h3 className="font-space text-xl font-bold mb-3 text-white group-hover:text-amber-glow transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm font-inter leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
