const tailwindColors = require('tailwindcss/colors');
module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      sans: ['Inter'],
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
  plugins: [],
};
