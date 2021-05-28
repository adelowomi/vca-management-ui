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
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
