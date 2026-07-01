import { overviewData, aboutData } from '../data';

export default function About() {
  return (
    <section id="overview" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-night-start">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
            {overviewData.title}
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed font-inter">
            {overviewData.description}
          </p>
          <a
            href={overviewData.readMore}
            className="inline-block px-8 py-3 bg-night-end/40 backdrop-blur-md border border-amber-glow/50 text-white font-medium rounded-xl hover:bg-amber-glow/10 hover:border-amber-glow transition-all duration-300"
          >
            READ MORE
          </a>
        </div>
        
        {/* Story, Mission, Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {aboutData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-night-end/20 backdrop-blur-md border border-white/5 rounded-3xl p-10 hover:bg-night-end/40 hover:border-amber-glow/20 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 rounded-full bg-amber-glow/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-glow/20 transition-all duration-300">
                  <Icon className="w-7 h-7 text-amber-glow" />
                </div>
                <h3 className="font-space text-2xl font-bold mb-4 text-white group-hover:text-amber-glow transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-inter text-sm">
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
