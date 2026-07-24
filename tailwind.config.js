/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Tajawal','Cairo','Inter','sans-serif'], display: ['Cairo','Tajawal','Inter','sans-serif'] },
      colors: {
        primary: { 50:'#fff8eb',100:'#ffefc6',200:'#ffdf88',300:'#ffc44a',400:'#ffab1f',500:'#f98e07',600:'#dd6c02',700:'#b74a06',800:'#94380c',900:'#7a2f0d',950:'#461703' },
        secondary: { 50:'#f0fdfa',100:'#ccfbf1',200:'#99f6e4',300:'#5eead4',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59',900:'#134e4a',950:'#042f2e' },
        success: { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d' },
        warning: { 50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f' },
        error: { 50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d' },
        ink: { 50:'var(--ink-50)',100:'var(--ink-100)',200:'var(--ink-200)',300:'var(--ink-300)',400:'var(--ink-400)',500:'var(--ink-500)',600:'var(--ink-600)',700:'var(--ink-700)',800:'var(--ink-800)',900:'var(--ink-900)',950:'var(--ink-950)' },
      },
      animation: { 'fade-up':'fadeUp 0.7s ease-out forwards', 'fade-in':'fadeIn 0.7s ease-out forwards', 'scale-in':'scaleIn 0.6s ease-out forwards', 'float':'float 6s ease-in-out infinite', 'bounce-slow':'bounceSlow 3s ease-in-out infinite', 'spin-slow':'spin 30s linear infinite', 'shimmer':'shimmer 2s linear infinite', 'glow-pulse':'glowPulse 3s ease-in-out infinite' },
      keyframes: {
        fadeUp: { '0%':{opacity:'0',transform:'translateY(30px)'}, '100%':{opacity:'1',transform:'translateY(0)'} },
        fadeIn: { '0%':{opacity:'0'}, '100%':{opacity:'1'} },
        scaleIn: { '0%':{opacity:'0',transform:'scale(0.9)'}, '100%':{opacity:'1',transform:'scale(1)'} },
        float: { '0%,100%':{transform:'translateY(0px)'}, '50%':{transform:'translateY(-20px)'} },
        bounceSlow: { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-12px)'} },
        shimmer: { '0%':{backgroundPosition:'-200% 0'}, '100%':{backgroundPosition:'200% 0'} },
        glowPulse: { '0%,100%':{boxShadow:'0 0 20px rgba(249,142,7,0.3)'}, '50%':{boxShadow:'0 0 40px rgba(249,142,7,0.5)'} },
      },
    },
  },
  plugins: [],
};
