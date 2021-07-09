const tailwindColors = require('tailwindcss/colors');
module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      sans: ['Inter'],
      extend: {
        colors: {
          gray: {
            darkest: '#424242',
            dark: '#808080',
            DEFAULT: '#c4c4c4',
            light: '#c4c4c4',
            lightest: '#f2f2f2',
            four: '#BDBDBD',
            one: '#333333',
            twozero: '#E5E7EB',
            three: '#828282',
          },
          black: {
            light: '#212121',
          },
          white: '#ffffff',
          warning: '#E8b601',
          danger: '#c9585c',
          primary: '#1890FF',
        },
        screens: {
          xsm: { max: '630px' },
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
    colors: {
      ...tailwindColors,
      'vca-blue': '#1890FF',
      'vca-black': '#000000',
      'vca-grey-1': '#333333',
      'vca-grey-2': '#4F4F4F',
      'vca-grey-3': '#828282',
      'vca-grey-4': '#BDBDBD',
      'vca-grey-5': '#E0E0E0',
      'vca-grey-6': '#F2F2F2',
      'vca-grey-7': '#F8F8F8',
      'vca-green': '#219653',
      'vca-red': '#EB5757',
      'vca-orage': '#DD970B',
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      fontWeight: ['hover', 'focus'],
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
