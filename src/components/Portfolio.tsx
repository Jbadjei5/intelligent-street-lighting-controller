import { useState } from 'react';
import { portfolioData } from '../data';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = ['all', 'sensor', 'control', 'hardware'];

  const filteredData = activeFilter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-night-end/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-4 text-white">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the key features and components of our intelligent lighting system
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all focus-ring ${
                activeFilter === category
                  ? 'bg-amber-glow text-night-start'
                  : 'border border-amber-glow/40 text-amber-glow hover:bg-amber-glow/10'
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
              className="bg-night-start/50 border border-amber-glow/20 rounded-xl overflow-hidden group hover:border-amber-glow/40 transition-all hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-amber-glow/20 to-night-end flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">
                  {item.category === 'sensor' ? '🔆' : item.category === 'control' ? '⚡' : '🔧'}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-space text-xl font-bold mb-2 text-amber-glow">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">
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
