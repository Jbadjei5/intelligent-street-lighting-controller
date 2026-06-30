export const navLinks = [
  { name: 'Overview', href: '#overview' },
  { name: 'Services', href: '#how-it-works' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'System Manual', href: '#system-manual' },
  { name: 'Remote Access', href: '#remote-access' },
];

export const heroData = {
  title: 'Intelligent Street Lighting Controller',
  subtitle: 'Smart Lighting Solution',
  description: 'Advanced dual-sensor system using LDR and PIR technology with PWM-based dimming for energy-efficient, adaptive street illumination.',
  ctaButtons: [
    { text: 'GET STARTED', href: '#system-manual' },
    { text: 'LEARN MORE', href: '#overview' },
  ],
};

export const overviewData = {
  title: 'Welcome To Our Project',
  description: 'Our intelligent street lighting controller represents the future of smart city infrastructure. By combining LDR-based ambient light detection with PIR motion sensing and PWM dimming technology, we create a system that adapts to environmental conditions in real-time, maximizing energy efficiency while ensuring public safety.',
  readMore: '#how-it-works',
};

export const howItWorksData = [
  {
    title: 'LDR MODULE',
    description: 'Light Dependent Resistor detects ambient light levels, triggering automatic activation at dusk for seamless dusk-to-dawn operation.',
    icon: '🔆',
  },
  {
    title: 'PIR SENSOR',
    description: 'HC-SR501 motion sensor detects pedestrian presence, signaling the controller to brighten LEDs when movement is detected.',
    icon: '🚶',
  },
  {
    title: 'PWM CONTROL',
    description: 'Pulse-width modulation enables smooth LED dimming, allowing adaptive brightness levels based on sensor inputs.',
    icon: '⚡',
  },
  {
    title: 'ARDUINO LOGIC',
    description: 'Microcontroller processes dual sensor inputs and implements intelligent control algorithms for optimal performance.',
    icon: '🔌',
  },
  {
    title: 'LED SYSTEM',
    description: 'High-efficiency LEDs with transistor drivers provide bright, reliable illumination while minimizing power consumption.',
    icon: '�',
  },
  {
    title: 'RELAY CONTROL',
    description: '2-channel relay module enables flexible power switching and integration with existing street lighting infrastructure.',
    icon: '🔀',
  },
];

export const aboutData = [
  {
    title: 'Our Story',
    description: 'Born from a need to reduce energy consumption in public lighting, our project evolved into a comprehensive intelligent lighting solution that combines cutting-edge sensor technology with practical embedded systems engineering.',
    icon: '📖',
  },
  {
    title: 'Our Mission',
    description: 'To create sustainable, energy-efficient street lighting systems that enhance public safety while minimizing environmental impact through smart sensor integration and adaptive control algorithms.',
    icon: '🎯',
  },
  {
    title: 'Our Vision',
    description: 'A future where every street light is intelligent, responsive, and optimized for both energy conservation and community safety, contributing to smarter, greener cities worldwide.',
    icon: '🌟',
  },
];

export const systemManualData = [
  {
    id: 'components',
    title: 'Components List',
    content: `
      <h3 class="text-lg font-semibold mb-3 text-amber-glow">Required Components:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Arduino Uno microcontroller</li>
        <li>LDR Module (Light Dependent Resistor)</li>
        <li>HC-SR501 PIR Motion Sensor</li>
        <li>LEDs (for street lighting)</li>
        <li>Resistors (various values for LED current limiting)</li>
        <li>Transistors (for LED driving)</li>
        <li>Relay Module (2-channel)</li>
        <li>Potentiometer (for sensitivity adjustment)</li>
        <li>Breadboard and jumper wires</li>
        <li>Li-ion battery with case</li>
        <li>SPDT switch (power control)</li>
      </ul>
      <div class="mt-4 p-4 bg-night-end/50 rounded-lg border border-amber-glow/20">
        <p class="text-sm text-gray-300">💡 Tip: Use the potentiometer to calibrate LDR sensitivity and PIR detection range.</p>
      </div>
    `,
    hasImage: false,
  },
  {
    id: 'circuit',
    title: 'Circuit Diagram',
    content: `
      <h3 class="text-lg font-semibold mb-3 text-amber-glow">Wiring Instructions:</h3>
      <p class="mb-4">Connect the components as shown in the diagram below:</p>
      <div class="bg-night-end/50 rounded-lg p-6 border border-amber-glow/20 text-center">
        <div class="text-gray-400 italic">Circuit diagram placeholder</div>
        <div class="text-sm text-gray-500 mt-2">Upload your circuit diagram image here</div>
      </div>
    `,
    hasImage: true,
  },
  {
    id: 'setup',
    title: 'Setup Instructions',
    content: `
      <h3 class="text-lg font-semibold mb-3 text-amber-glow">Step-by-Step Setup:</h3>
      <ol class="list-decimal list-inside space-y-3">
        <li>Connect LDR module output to Arduino analog pin A0</li>
        <li>Connect HC-SR501 PIR sensor output to Arduino digital pin 2</li>
        <li>Connect LEDs with transistors to PWM pins (D3, D5, D6, D9, D10, D11)</li>
        <li>Connect 2-channel relay module to digital pins D7 and D8</li>
        <li>Connect potentiometer to analog pin A1 for sensitivity calibration</li>
        <li>Connect SPDT switch to control power from Li-ion battery</li>
        <li>Upload the PWM dimming code to Arduino Uno</li>
        <li>Test LDR response by covering sensor (should trigger at dusk)</li>
        <li>Test PIR response by moving hand in front of sensor (should brighten LEDs)</li>
        <li>Adjust potentiometer for optimal sensitivity thresholds</li>
      </ol>
    `,
    hasImage: false,
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    content: `
      <h3 class="text-lg font-semibold mb-3 text-amber-glow">Common Issues:</h3>
      <div class="space-y-4">
        <div class="p-3 bg-night-end/50 rounded-lg border border-amber-glow/10">
          <h4 class="font-medium text-amber-glow">LEDs not turning on at dusk</h4>
          <p class="text-sm text-gray-300 mt-1">Check LDR module connections, adjust potentiometer for sensitivity, verify analog pin A0 reading in serial monitor.</p>
        </div>
        <div class="p-3 bg-night-end/50 rounded-lg border border-amber-glow/10">
          <h4 class="font-medium text-amber-glow">LEDs not brightening on motion</h4>
          <p class="text-sm text-gray-300 mt-1">Verify PIR sensor connections to pin D2, check PIR power (5V), adjust PIR sensitivity and time delay potentiometers.</p>
        </div>
        <div class="p-3 bg-night-end/50 rounded-lg border border-amber-glow/10">
          <h4 class="font-medium text-amber-glow">PWM dimming not working</h4>
          <p class="text-sm text-gray-300 mt-1">Ensure LEDs are connected to PWM-capable pins (marked with ~), check transistor base resistor values, verify analogWrite() in code.</p>
        </div>
        <div class="p-3 bg-night-end/50 rounded-lg border border-amber-glow/10">
          <h4 class="font-medium text-amber-glow">PIR sensor false triggers</h4>
          <p class="text-sm text-gray-300 mt-1">Adjust PIR sensitivity potentiometer, ensure sensor is stable and not affected by heat sources or air currents.</p>
        </div>
        <div class="p-3 bg-night-end/50 rounded-lg border border-amber-glow/10">
          <h4 class="font-medium text-amber-glow">Battery draining quickly</h4>
          <p class="text-sm text-gray-300 mt-1">Check for short circuits, verify LED current limiting resistors, ensure SPDT switch is off when not in use.</p>
        </div>
      </div>
    `,
    hasImage: false,
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    content: `
      <h3 class="text-lg font-semibold mb-3 text-amber-glow">Regular Maintenance:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li>Clean LDR sensor surface monthly to prevent dust accumulation affecting light readings</li>
        <li>Check PIR sensor lens for dirt or obstructions that may affect motion detection</li>
        <li>Test Li-ion battery voltage regularly and recharge as needed</li>
        <li>Verify all breadboard connections are secure and not oxidized</li>
        <li>Recalibrate potentiometer settings seasonally for changing ambient light conditions</li>
        <li>Check LED brightness and replace any dimming LEDs</li>
        <li>Inspect transistor and relay module for overheating during operation</li>
      </ul>
    `,
    hasImage: false,
  },
];

export const statsData = [
  { label: 'YEARS OF RESEARCH', value: '2+' },
  { label: 'SENSORS INTEGRATED', value: '2' },
  { label: 'PWM CHANNELS', value: '6' },
  { label: 'ENERGY SAVED', value: '45%' },
];

export const portfolioData = [
  { title: 'LDR Integration', category: 'sensor', description: 'Ambient light detection module' },
  { title: 'PIR Motion Detection', category: 'sensor', description: 'Pedestrian presence sensing' },
  { title: 'PWM Dimming', category: 'control', description: 'Adaptive brightness control' },
  { title: 'Arduino Logic', category: 'control', description: 'Dual-sensor processing' },
  { title: 'LED System', category: 'hardware', description: 'Efficient illumination' },
  { title: 'Relay Module', category: 'hardware', description: 'Power switching system' },
];

export const testimonialData = {
  name: 'Project Team',
  role: 'Embedded Systems Engineers',
  quote: 'This intelligent lighting controller demonstrates how combining simple sensors with smart algorithms can create significant energy savings while improving public safety and comfort.',
  image: '👨‍💻',
};

export const footerData = {
  credits: 'Automatic Street Lighting System © 2024',
  links: [
    { name: 'GitHub', href: '#' },
    { name: 'Contact', href: '#' },
  ],
};
