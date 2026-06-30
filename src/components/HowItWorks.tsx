import { howItWorksData } from '../data';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-4 text-white">
            Our Services
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Key components and technologies that power our intelligent lighting system
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {howItWorksData.map((item, index) => (
            <div
              key={index}
              className="bg-night-start/50 border border-amber-glow/20 rounded-xl p-8 hover:border-amber-glow/40 transition-all hover:scale-105 group"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-space text-2xl font-bold mb-4 text-amber-glow">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
