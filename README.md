# Intelligent Street Lighting Controller - Frontend

A responsive single-page frontend for an embedded systems project featuring intelligent street lighting using LDR sensor, PIR motion sensor, and PWM-based LED dimming.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Fonts** - Space Grotesk (headings) & Inter (body)

## Features

- **Dusk/Night Theme** - Deep navy sky gradient (#0B1530 → #16213E) with warm amber glow accents (#FFB347)
- **Animated Lamp Icon** - Subtle glow pulse animation in the hero section
- **Responsive Design** - Mobile-first approach, works on all screen sizes
- **Keyboard Accessible** - Visible focus states on all interactive elements
- **Component-Based** - Modular architecture with separate components per section

## Project Description

This intelligent street lighting controller uses dual sensors for adaptive illumination:
- **LDR Module** - Detects ambient light levels for automatic dusk-to-dawn operation
- **HC-SR501 PIR Motion Sensor** - Detects pedestrian presence to brighten LEDs
- **PWM-based Dimming** - Arduino implements pulse-width modulation for energy-efficient brightness control
- **Dual-sensor Logic** - Combines light and motion inputs for intelligent control

## Hardware Components

- Arduino Uno microcontroller
- LDR Module (Light Dependent Resistor)
- HC-SR501 PIR Motion Sensor
- LEDs (for street lighting)
- Resistors (various values for LED current limiting)
- Transistors (for LED driving)
- Relay Module (2-channel)
- Potentiometer (for sensitivity adjustment)
- Breadboard and jumper wires
- Li-ion battery with case
- SPDT switch (power control)

## Sections

1. **Navigation Bar** - Fixed header with smooth scroll links
2. **Hero** - Project title, description, and CTA buttons with animated lamp illustration
3. **Overview** - Project description and key features (LDR + PIR + PWM)
4. **How It Works** - 4 component cards (LDR Module, PIR Motion Sensor, Arduino Controller, LED & Relay System)
5. **System Manual** - Accordion-style expandable sections (Components, Circuit Diagram, Setup, Troubleshooting, Maintenance)
6. **Remote Access** - Mock login portal with placeholder authentication
7. **Stats Strip** - Mock statistics display
8. **Footer** - Credits and placeholder links

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation bar with mobile menu
│   ├── Hero.tsx            # Hero section with animated lamp
│   ├── Overview.tsx        # Project overview
│   ├── HowItWorks.tsx      # Component cards
│   ├── SystemManual.tsx    # Accordion-style manual
│   ├── RemoteAccess.tsx    # Login portal
│   ├── Stats.tsx           # Statistics strip
│   └── Footer.tsx          # Footer with links
├── data.ts                 # Mock data for all sections
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles and Tailwind
```

## Customization

### Updating Content

All content is centralized in `src/data.ts`. Edit the following exports to customize:

- `navLinks` - Navigation menu items
- `heroData` - Hero section content
- `overviewData` - Overview text and key points
- `howItWorksData` - Component cards
- `systemManualData` - Manual sections (supports HTML content)
- `statsData` - Statistics numbers
- `footerData` - Footer text and links

### Theme Colors

Modify colors in `tailwind.config.js`:

```javascript
colors: {
  night: {
    start: '#0B1530',  // Lighter navy
    end: '#16213E',    // Darker navy
  },
  amber: {
    glow: '#FFB347',   // Amber accent
  }
}
```

### Fonts

Fonts are loaded via Google Fonts in `index.html`. To change fonts:

1. Update the GoogleFonts link in `index.html`
2. Update font family names in `tailwind.config.js`
3. Apply new font classes in components

## Accessibility

- All interactive elements have visible focus states (`focus-ring` utility class)
- Semantic HTML elements used throughout
- ARIA labels on interactive controls
- Keyboard navigation support
- Color contrast meets WCAG AA standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of an embedded systems educational project.

## Future Enhancements

- Real backend integration
- Actual authentication system
- Live sensor data visualization
- Circuit diagram image uploads
- Multi-language support
