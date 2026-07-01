import { heroData } from '../data';
import { ChevronDown, Lightbulb } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-night-start">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-night-start via-night-end to-night-start opacity-90 z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-glow/10 rounded-full blur-[120px] animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse z-0" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night-end/50 border border-amber-glow/20 backdrop-blur-md mb-8">
          <Lightbulb className="w-4 h-4 text-amber-glow animate-glow-pulse" />
          <span className="text-amber-glow text-sm font-medium tracking-widest uppercase font-space">
            {heroData.subtitle}
          </span>
        </div>

        <h1 className="font-space text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
          Intelligent <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-glow to-amber-200">
            Street Lighting
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-inter font-light">
          {heroData.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
          {heroData.ctaButtons.map((button, index) => (
            <a
              key={button.text}
              href={button.href}
              className={`px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                index === 0
                  ? 'bg-gradient-to-r from-amber-glow to-amber-500 text-night-start hover:scale-105 hover:shadow-[0_0_30px_rgba(255,179,71,0.4)]'
                  : 'bg-night-end/40 backdrop-blur-md border border-amber-glow/30 text-white hover:bg-amber-glow/10 hover:border-amber-glow'
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-xs text-gray-400 font-space tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-amber-glow opacity-80" />
      </div>
    </section>
  );
}
