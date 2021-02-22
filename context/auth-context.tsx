import * as React from 'react';

export const AuthContext = React.createContext(null);
AuthContext.displayName = 'AuthContext';

interface AuthProviderProps {
  children?: any;
  value: Session;
}

export function AuthProvider({ children, value }: AuthProviderProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
