import { useState } from 'react';
import { systemManualData } from '../data';
import { ChevronDown, FileText } from 'lucide-react';

export default function SystemManual() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section id="system-manual" className="py-24 px-4 sm:px-6 lg:px-8 bg-night-start relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-night-end/50 border border-amber-glow/20 backdrop-blur-md mb-6">
            <FileText className="w-8 h-8 text-amber-glow" />
          </div>
          <h2 className="font-space text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
            System Manual
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-inter">
            Complete guide for setup, operation, and maintenance of the intelligent street lighting system
          </p>
        </div>
        
        <div className="space-y-4">
          {systemManualData.map((section) => (
            <div
              key={section.id}
              className={`bg-night-end/40 backdrop-blur-md border ${openSection === section.id ? 'border-amber-glow/50' : 'border-white/5'} rounded-2xl overflow-hidden transition-all duration-300 shadow-lg`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow/50 group"
                aria-expanded={openSection === section.id}
              >
                <span className="font-space text-xl font-bold text-white group-hover:text-amber-glow transition-colors">
                  {section.title}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-amber-glow transition-transform duration-300 ${
                    openSection === section.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  openSection === section.id 
                    ? 'max-h-[1000px] opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-8 pb-8 pt-2 border-t border-white/5">
                  <div 
                    className="text-gray-400 font-inter prose prose-invert prose-amber max-w-none prose-headings:font-space prose-headings:text-amber-glow prose-a:text-amber-glow hover:prose-a:text-amber-500"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
