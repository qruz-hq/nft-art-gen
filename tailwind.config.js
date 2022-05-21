/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'palette-1': '#1B264F',
      'palette-2': '#274690',
      'palette-3': '#576CA8',
      'palette-4': '#F7F0F5',
      'palette-5': '#DA4167',
    },
    fontFamily: {
      body: ['"Jaldi"'],
    },
    extend: {
      animation: {
        pop: 'pop 0.2s ease-in-out 1',
      },
      keyframes: {
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/typography')],
};
