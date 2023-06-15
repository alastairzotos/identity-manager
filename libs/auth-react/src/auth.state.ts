import { create } from 'zustand';
import jwt from 'jsonwebtoken';
import { IIdentity, WithId } from '@bitmetro/identity';

export interface IAuthStateValues<T = Object> {
  initialised: boolean;
  accessToken?: string;
  loggedInUser?: WithId<IIdentity<T>>;
}

interface IAuthStateActions {
  init(localStorageKey: string): void;
  setAccessToken(localStorageKey: string, accessToken: string): void;
  logout: (localStorageKey: string) => void;
}

export interface IAuthState<T = Object> extends IAuthStateValues<T>, IAuthStateActions {}

export const useAuthState = create<IAuthState>((set) => ({
  initialised: false,
  accessToken: undefined,

  init(localStorageKey: string) {
    const accessToken = localStorage.getItem(localStorageKey);

    if (accessToken) {
      set({
        initialised: true,
        accessToken,
        loggedInUser: jwt.decode(accessToken) as WithId<IIdentity>,
      });
    } else if (typeof window !== "undefined") {
      const urlAccessToken = new URLSearchParams(window.location.search).get('accessToken');

      if (urlAccessToken) {
        localStorage.setItem(localStorageKey, urlAccessToken);
        
        set({
          initialised: true,
          accessToken: urlAccessToken,
          loggedInUser: jwt.decode(urlAccessToken) as WithId<IIdentity>,
        })
      } else {
        set({ initialised: true });
      }
    }
  },

  setAccessToken(localStorageKey: string, accessToken: string) {
    localStorage.setItem(localStorageKey, accessToken);
    set({
      accessToken,
      loggedInUser: jwt.decode(accessToken) as WithId<IIdentity>,
    });
  },

  logout(localStorageKey: string) {
    set({ accessToken: undefined, loggedInUser: undefined });
    localStorage.removeItem(localStorageKey);
  },
}))
