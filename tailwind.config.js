// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css,scss}'],
  theme: {
    extend: {
      colors: {
        yellow: '#efc603',
        mint: {
          300: '#5ef9d6',
          400: '#42e9c7',
          500: '#00f2c3',
        },
      },
      backgroundImage: {
        'grid-bg': "linear-gradient(0deg, rgba(0, 242, 195, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 195, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      keyframes: {
        typing: {
          '0%, 100%': { width: '0%' },
          '30%, 70%': { width: '100%' },
        },
        blink: {
          '0%': { opacity: 0 },
        },
        'rotate-loader': {
          '0%': {
            transform: 'rotate(0deg)',
            strokeDashoffset: '360%',
          },
          '100%': {
            transform: 'rotate(360deg)',
            strokeDashoffset: '-360%',
          },
        },
      },
      screens: {
        touch: { raw: 'only screen and (pointer: coarse)' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
