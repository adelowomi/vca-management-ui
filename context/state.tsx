import { createContext, useContext } from 'react';

const AppContext = createContext({
  siteId: '',
});

export function AppWrapper({ children, value }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
