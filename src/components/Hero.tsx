import { heroData } from '../data';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-night-start via-night-end to-night-start opacity-90" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-glow/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-glow/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h2 className="font-space text-amber-glow text-lg sm:text-xl font-semibold mb-4 tracking-wider uppercase">
            {heroData.subtitle}
          </h2>
          <h1 className="font-space text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {heroData.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {heroData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {heroData.ctaButtons.map((button, index) => (
              <a
                key={button.text}
                href={button.href}
                className={`px-10 py-4 rounded-lg font-semibold text-lg transition-all focus-ring ${
                  index === 0
                    ? 'bg-amber-glow text-night-start hover:bg-amber-glow/90 hover:scale-105 shadow-lg shadow-amber-glow/20'
                    : 'border-2 border-amber-glow text-amber-glow hover:bg-amber-glow/10'
                }`}
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
        
        {/* Animated lamp icon */}
        <div className="absolute bottom-10 right-10 lg:right-20 opacity-20">
          <svg
            className="w-32 h-32 sm:w-48 sm:h-48 animate-glow-pulse"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="95" y="100" width="10" height="80" fill="#FFB347" />
            <rect x="90" y="175" width="20" height="5" fill="#FFB347" />
            <path d="M70 100 L100 40 L130 100 Z" fill="#FFB347" />
            <ellipse cx="100" cy="100" rx="30" ry="8" fill="#FFB347" />
            <circle cx="100" cy="85" r="15" fill="#FFB347" opacity="0.9" />
            <circle cx="100" cy="85" r="20" fill="#FFB347" opacity="0.4" />
            <circle cx="100" cy="85" r="25" fill="#FFB347" opacity="0.2" />
          </svg>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-amber-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
