export default {
  fontSize: {
    extraSmall: '10px',
    small: '14px',
    medium: '17px',
    large: '24px',
    extraLarge: '30px',
    massive: '40px',
  },
  screens: {
    // max-widths in pixels
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  colors: {
    blue: '#1890FF',
    blueBkg: 'rgba(0, 53, 193, 0.1)',
    darkIndigo: '#0c1a38',
    white: '#fff',
    black: ' #000',
    paleGrey: '#f2f4f7',
    cloudyBlue: '#bcc3ce',
    dark: '#263238',
    greyishBrown: '#595959',
    darkSlateBlue: '#143648',
    darkishGreen: '#287638',
    darkishGreenBkg: 'rgba(40, 118, 56, 0.1)',
    barneyPurple: '#8b008b',
    barneyPurpleBkg: 'rgba(139, 0, 139, 0.1)',
    orange: '#FF9429',
    red: '#b70303',
    grey: 'rgba(138, 145, 162, 0.58)',
  },
  opacity: {
    0: 0,
    25: 0.25,
    50: 0.5,
    75: 0.75,
    100: 1,
  },
  py: (value: number | string) =>
    `padding-top: ${value}; padding-bottom: ${value};`,
  // Add anything else you'd like.
};
