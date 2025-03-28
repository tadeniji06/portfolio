/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Futuristic primary colors
        neon: {
          blue: '#00f0ff',
          purple: '#9d00ff',
          pink: '#ff00f7',
          green: '#00ff9d',
          yellow: '#ffee00',
        },
        // Dark backgrounds
        space: {
          black: '#050715',
          dark: '#0a0b1e',
          navy: '#12143a',
          purple: '#1a1145',
        },
        // Accent colors
        glow: {
          blue: 'rgba(0, 240, 255, 0.7)',
          purple: 'rgba(157, 0, 255, 0.7)',
          pink: 'rgba(255, 0, 247, 0.7)',
        },
      },
      fontFamily: {
        winky: ['"Winky Sans"', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.7)',
        'neon-purple': '0 0 5px #9d00ff, 0 0 20px rgba(157, 0, 255, 0.7)',
        'neon-pink': '0 0 5px #ff00f7, 0 0 20px rgba(255, 0, 247, 0.7)',
        'neon-green': '0 0 5px #00ff9d, 0 0 20px rgba(0, 255, 157, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slideIn 1s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px rgba(0, 240, 255, 0.7), 0 0 10px rgba(0, 240, 255, 0.5)' },
          '100%': { textShadow: '0 0 10px rgba(0, 240, 255, 0.9), 0 0 20px rgba(0, 240, 255, 0.7), 0 0 30px rgba(0, 240, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(10, 11, 30, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 11, 30, 0.8) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid-lg': '50px 50px',
      },
    },
  },
  plugins: [],
};
