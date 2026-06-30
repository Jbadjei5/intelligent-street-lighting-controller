import { testimonialData } from '../data';

export default function Testimonial() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-night-start to-night-end">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-4 text-white">
            Testimonial
          </h2>
        </div>
        
        <div className="bg-night-end/50 border border-amber-glow/20 rounded-2xl p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-amber-glow/20 rounded-full flex items-center justify-center text-6xl sm:text-7xl">
                {testimonialData.image}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <svg className="w-12 h-12 text-amber-glow/40 mb-4 mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 italic leading-relaxed">
                "{testimonialData.quote}"
              </p>
              <h3 className="font-space text-2xl font-bold text-amber-glow mb-2">
                {testimonialData.name}
              </h3>
              <p className="text-gray-400">
                {testimonialData.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
