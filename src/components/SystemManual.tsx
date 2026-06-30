import { useState } from 'react';
import { systemManualData } from '../data';

export default function SystemManual() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section id="system-manual" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-3xl sm:text-4xl font-bold mb-4 text-amber-glow">
            System Manual
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Complete guide for setup, operation, and maintenance
          </p>
        </div>
        
        <div className="space-y-4">
          {systemManualData.map((section) => (
            <div
              key={section.id}
              className="bg-night-start/50 border border-amber-glow/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus-ring"
                aria-expanded={openSection === section.id}
              >
                <span className="font-space text-lg font-semibold text-amber-glow">
                  {section.title}
                </span>
                <svg
                  className={`w-5 h-5 text-amber-glow transition-transform ${
                    openSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {openSection === section.id && (
                <div className="px-6 pb-6 pt-2 border-t border-amber-glow/10">
                  <div 
                    className="text-gray-300 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
