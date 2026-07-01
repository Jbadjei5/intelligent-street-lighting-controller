import { testimonialData } from '../data';

export default function Testimonial() {
  const Icon = testimonialData.image as any;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-night-end relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-night-start to-transparent opacity-90 z-0" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-4 text-white tracking-tight">
            Developer Notes
          </h2>
        </div>
        
        <div className="bg-night-start/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-14 shadow-2xl relative">
          {/* Quote icon watermark */}
          <div className="absolute top-8 right-10 text-9xl text-white/5 font-serif select-none pointer-events-none">
            "
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 relative z-10">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-amber-glow/10 rounded-full flex items-center justify-center border border-amber-glow/30 shadow-[0_0_20px_rgba(255,179,71,0.2)]">
                {typeof Icon === 'function' ? <Icon className="w-12 h-12 text-amber-glow" /> : <span className="text-6xl text-amber-glow">👨‍💻</span>}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <svg className="w-10 h-10 text-amber-glow/50 mb-6 mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 italic leading-relaxed font-inter font-light">
                "{testimonialData.quote}"
              </p>
              <div>
                <h3 className="font-space text-2xl font-bold text-amber-glow mb-1 tracking-wide">
                  {testimonialData.name}
                </h3>
                <p className="text-gray-400 font-inter text-sm uppercase tracking-widest">
                  {testimonialData.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
