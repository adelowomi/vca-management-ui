import { createTheme } from 'baseui';

const primitives = {
  // Primary Palette
  primaryA: '#0c1a38', // indigo
  primaryB: '#0035c1',
  primary: '#0035c1',
  primary50: '#0035c1',
  primary100: '#0035c1',
  primary200: '#0035c1',
  primary300: '#0035c1',
  primary400: '#0035c1',
  primary500: '#0035c1',
  primary600: '#0035c1',
  primary700: '#0035c1',

  accent: '#0c1a38',
  // accent50: '#FDEDFC',
  // accent100: '#FCD3F9',
  // accent200: '#F89FF3',
  // accent300: '#F45AEA',
  // accent400: '#F127E4',
  // accent500: '#B71DAD',
  // accent600: '#901788',
  // accent700: '#600F5B',

  // Monochrome Palette
  mono100: '#ffff',
  // mono200: '#000',
  mono300: '#c9c5c5',
  mono400: '#595959',
  // mono500: 'string',
  // mono600: 'string',
  // mono700: 'string',
  // mono800: 'string',
  // mono900: 'string',
  // mono1000: 'string',

  radius100: '2px',
  radius200: '4px',
  border100: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
};
const overrides = {
  colors: {
    calendarForegroundDisabled: primitives.mono300,
    calendarHeaderBackground: primitives.primaryA,
    calendarHeaderForegroundDisabled: primitives.primaryA,
    calendarDayForegroundPseudoSelected: primitives.primaryA,
    calendarDayForegroundSelected: primitives.primaryA,
    calendarDayBackgroundSelectedHighlighted: primitives.primaryA,

    // Input
    inputBorder: primitives.mono400,
    inputFill: primitives.mono100,
    inputFillActive: primitives.mono100,
    inputFillError: 'white',
    // inputPlaceholder: primitives.primaryA,
  },
  borders: {
    inputBorderRadius: primitives.radius200,
    border100: primitives.border100,
    border200: primitives.border100,
  },
};

export const appThemes = createTheme(primitives, overrides);
