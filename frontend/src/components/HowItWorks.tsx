import { howItWorksData } from '../data';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-glow/5 rounded-full blur-[100px] -translate-y-1/2 -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
            System Architecture
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-inter">
            The core components and technologies powering our intelligent lighting infrastructure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {howItWorksData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-night-end/30 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:bg-night-end/50 hover:border-amber-glow/40 transition-all duration-300 hover:-translate-y-2 group shadow-xl hover:shadow-amber-glow/10"
              >
                <div className="w-16 h-16 rounded-xl bg-night-start flex items-center justify-center mb-8 border border-white/5 group-hover:border-amber-glow/30 transition-colors">
                  <Icon className="w-8 h-8 text-amber-glow group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-space text-xl font-bold mb-4 text-white group-hover:text-amber-glow transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm font-inter">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
