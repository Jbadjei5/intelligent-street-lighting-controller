import { overviewData } from '../data';

export default function Overview() {
  return (
    <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-3xl sm:text-4xl font-bold mb-4 text-amber-glow">
            {overviewData.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {overviewData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {overviewData.keyPoints.map((point, index) => (
            <div
              key={index}
              className="bg-night-end/50 border border-amber-glow/20 rounded-lg p-6 hover:border-amber-glow/40 transition-colors"
            >
              <div className="text-amber-glow text-2xl mb-3">✓</div>
              <p className="text-gray-200">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
