import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import locales from '../public/static/locales/en/common.json';

const Providers = ({ children }) => (
  <IntlProvider locale={'en'} defaultLocale={'en'} messages={locales}>
    {children}
  </IntlProvider>
);

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
