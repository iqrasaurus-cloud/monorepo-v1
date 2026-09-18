// Maps the CSS variables in src/tokens.css to Tailwind names.
// Every app's tailwind.config.cjs uses `presets: [require('@iqra/config/tailwind-preset')]`.
const token = (name) => `rgb(var(--${name}-rgb) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        ink: token('ink'),
        primary: token('primary'),
        plum: token('plum'),
        magenta: token('magenta'),
        sun: token('sun'),
        taupe: token('taupe'),
        paper: token('paper'),
        'paper-2': token('paper-2'),
        white: token('white'),
        accent: token('accent'),
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        arabic: ['var(--font-arabic)'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      maxWidth: {
        content: 'var(--content-max)',
      },
      letterSpacing: {
        label: '0.18em',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
        wipe: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
