/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0c1628',
        'accent-red': '#ff1744',
        'accent-cyan': '#00d4ff',
        'accent-green': '#22c55e',
        'accent-amber': '#f59e0b',
        'accent-purple': '#a855f7',
      },
      fontFamily: {
        sans: ['"Inter"', '"Avenir Next"', '"Segoe UI Variable"', '"SF Pro Display"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', '"SF Mono"', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card: '28px',
        panel: '36px',
        btn: '18px',
      },
      keyframes: {
        waveBar: {
          '0%':   { height: '15%' },
          '100%': { height: '85%' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.42s cubic-bezier(0.16,1,0.3,1) both',
        reveal:    'revealIn 0.36s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
