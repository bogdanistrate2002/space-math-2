import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'space-black': '#0a0a1a',
        'space-deep': '#0d1b3e',
        'nebula-purple': '#6c3fc5',
        'star-yellow': '#ffd700',
        'rocket-orange': '#ff6b35',
        'cosmic-cyan': '#00d4ff',
        'success-green': '#39ff14',
        'danger-red': '#ff2244',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 8px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
