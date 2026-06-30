import { overviewData, aboutData } from '../data';

export default function About() {
  return (
    <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8 bg-night-end/30">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-6 text-white">
            {overviewData.title}
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {overviewData.description}
          </p>
          <a
            href={overviewData.readMore}
            className="inline-block px-8 py-3 bg-amber-glow text-night-start font-semibold rounded-lg hover:bg-amber-glow/90 transition-all focus-ring"
          >
            READ MORE
          </a>
        </div>
        
        {/* Story, Mission, Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {aboutData.map((item, index) => (
            <div
              key={index}
              className="bg-night-start/50 border border-amber-glow/20 rounded-xl p-8 hover:border-amber-glow/40 transition-all hover:scale-105 group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
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
