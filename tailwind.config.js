/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          50: 'var(--ink-50)', 100: 'var(--ink-100)', 200: 'var(--ink-200)',
          300: 'var(--ink-300)', 400: 'var(--ink-400)', 500: 'var(--ink-500)',
          600: 'var(--ink-600)', 700: 'var(--ink-700)', 800: 'var(--ink-800)',
          900: 'var(--ink-900)', 950: 'var(--ink-950)',
        },
        primary: {
          50:'#f0f9ff',100:'#e0f2fe',200:'#bae6fd',300:'#7dd3fc',400:'#38bdf8',
          500:'#0ea5e9',600:'#0284c7',700:'#0369a1',800:'#075985',900:'#0c4a6e',
        },
        success: { 400:'#4ade80', 500:'#22c55e', 600:'#16a34a' },
        warning: { 400:'#fbbf24', 500:'#f59e0b', 600:'#d97706' },
        error: { 400:'#f87171', 500:'#ef4444', 600:'#dc2626' },
        gold: { 300:'#fde68a', 400:'#fbbf24', 500:'#f59e0b', 600:'#d97706' },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
