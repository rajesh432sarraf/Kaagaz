/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand palette
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Dark surfaces
        dark: {
          base:     '#0a0a0f',
          surface:  '#111118',
          card:     '#16161f',
          elevated: '#1c1c28',
          border:   'rgba(255,255,255,0.07)',
        },
        // Amber accent
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-scale': {
          '0%':   { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-8deg)' },
          '50%':      { transform: 'rotate(8deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(99,102,241,0.5)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-in':       'fade-in 0.4s ease-out both',
        'fade-in-scale': 'fade-in-scale 0.3s ease-out both',
        'slide-down':    'slide-down 0.25s ease-out both',
        'slide-up':      'slide-up 0.3s ease-out both',
        wiggle:          'wiggle 0.6s ease-in-out',
        'pulse-glow':    'pulse-glow 2s ease-in-out infinite',
        shimmer:         'shimmer 2s linear infinite',
        float:           'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'xs':      '0 1px 2px 0 rgba(0,0,0,0.3)',
        'glow-sm': '0 0 15px rgba(99,102,241,0.3)',
        'glow':    '0 0 40px rgba(99,102,241,0.25)',
        'glow-lg': '0 0 80px rgba(99,102,241,0.2)',
        'amber':   '0 0 30px rgba(245,158,11,0.2)',
        'card':    '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset',
        'card-hover': '0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand':  'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'gradient-gold':   'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'shimmer-gradient':'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
