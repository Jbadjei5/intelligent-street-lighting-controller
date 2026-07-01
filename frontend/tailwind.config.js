/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          start: '#0B1530',
          end: '#16213E',
        },
        amber: {
          glow: '#FFB347',
        }
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'inter': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 10px #FFB347) drop-shadow(0 0 20px #FFB347)',
          },
          '50%': {
            filter: 'drop-shadow(0 0 20px #FFB347) drop-shadow(0 0 40px #FFB347)',
          },
        },
      },
    },
  },
  plugins: [],
}
