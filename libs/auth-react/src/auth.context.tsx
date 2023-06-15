import React, { useEffect } from "react";
import { useAuthState } from "./auth.state";

interface IAuthContext {
  localStorageKey: string;
  propertyId: string;
  idServiceUrl?: string;
}

const AuthContext = React.createContext<IAuthContext>({
  localStorageKey: '',
  propertyId: '',
  idServiceUrl: '',
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<IAuthContext>> = ({
  children,
  localStorageKey = '@bitmetro:auth-storage-key',
  propertyId,
  idServiceUrl = 'https://identity.bitmetro.io',
}) => {
  const { init } = useAuthState();

  useEffect(() => {
    init(localStorageKey);
  }, []);

  return (
    <AuthContext.Provider value={{ localStorageKey, propertyId, idServiceUrl }}>
      {children}
    </AuthContext.Provider>
  )
}
