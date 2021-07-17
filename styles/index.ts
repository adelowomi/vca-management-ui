export { GlobalStyles } from './global-styles';
import { useContext } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';

import themeObject from './theme';

type DefaultThemeObject = Omit<typeof themeObject, 'screens'> & unknown;

const theme = (): DefaultTheme => {
  const { ...themeValues }: DefaultThemeObject = themeObject;

  return {
    ...themeValues,
  };
};

const useTheme = () => useContext(ThemeContext);

export { theme, useTheme };
