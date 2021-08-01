const tailwindColors = require('tailwindcss/colors');
module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width:{
        'form-col':'830px'
      },
      sans: ['Inter'],
      extend: {
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
    fontFamily: {
      inter: 'Inter',
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
