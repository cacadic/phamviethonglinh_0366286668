module.exports = {
  content: ['./apps/**/*.{js,ts,jsx,tsx}', './libs/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scale: {
        85: '0.85',
      },
      colors: {
        red: {
          300: '#e03232',
        },
        blue: {
          700: '#3c90b8',
          900: '#29637E',
        },
        gray: {
          100: '#FAF8F6',
          200: '#f2f1ef',
          300: '#e6e6e6',
          700: '#888787',
          800: '#000000D9',
          900: '#1A1818',
        },
      },
      scale: {
        115: '1.15',
      },
      flex: {
        1.25: '1.25 1.25 0%',
        1.5: '1.5 1.5 0%',
        2: '2 2 0%',
      },
      minHeight: {
        96: '384px',
      },
    },
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', '#6D6F72'),
    }),
  },
  plugins: [],
};
