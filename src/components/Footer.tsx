import { footerData } from '../data';

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-night-start to-night-end border-t border-amber-glow/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-space text-2xl font-bold text-white mb-4">
              <span className="text-amber-glow">🌙</span> StreetLight AI
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Intelligent street lighting controller using LDR and PIR sensors with PWM-based dimming for energy-efficient illumination.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-space text-lg font-semibold text-amber-glow mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="text-gray-400 hover:text-amber-glow transition-colors focus-ring">
                  Overview
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-amber-glow transition-colors focus-ring">
                  Services
                </a>
              </li>
              <li>
                <a href="#system-manual" className="text-gray-400 hover:text-amber-glow transition-colors focus-ring">
                  System Manual
                </a>
              </li>
              <li>
                <a href="#remote-access" className="text-gray-400 hover:text-amber-glow transition-colors focus-ring">
                  Remote Access
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-space text-lg font-semibold text-amber-glow mb-4">
              Connect
            </h4>
            <div className="flex items-center space-x-4">
              {footerData.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-amber-glow px-4 py-2 border border-amber-glow/30 rounded-lg hover:bg-amber-glow/10 transition-all focus-ring"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-amber-glow/10">
          <p className="text-center text-gray-500 text-sm">
            {footerData.credits}
          </p>
        </div>
      </div>
    </footer>
  );
}
