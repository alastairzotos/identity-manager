import { DependencyList, useEffect } from "react";
import { useAuthContext } from "./auth.context";
import { IAuthState, IAuthStateValues, useAuthState } from "./auth.state";
import { IIdentity, WithId } from "@bitmetro/identity";
import { getPopupParams } from "auth.util";

export const useLogout = () => {
  const { localStorageKey } = useAuthContext();
  return () => useAuthState.getState().logout(localStorageKey);
}

export const useLoggedInUser = <T = Object>() => {
  return useAuthState(s => s.loggedInUser) as WithId<IIdentity<T>>;
}

export const useCheckAuthState = <T = Object>(cb: (state: IAuthStateValues<T>) => Promise<void> | void, deps: DependencyList) => {
  const values = useAuthState() as IAuthState<T>;
  const { initialised, accessToken } = values;

  useEffect(() => {
    if (initialised) {
      cb(values);
    }
  }, [initialised, accessToken, ...deps])
}

export interface IAuthUrls {
  loginUrl: string;
  registerUrl: string;
}

export const useAuthUrls = (fwd: string): IAuthUrls => {
  const { idServiceUrl, propertyId } = useAuthContext();

  if (typeof window === "undefined") {
    return {
      loginUrl: "<NOT_SSR>",
      registerUrl: "<NOT_SSR>",
    }
  }
  const fwdUrl = window.location.protocol + "//" + window.location.host + fwd as string;

  return {
    loginUrl: `${idServiceUrl}/login?propertyId=${propertyId}&fwd=${encodeURIComponent(fwdUrl)}`,
    registerUrl: `${idServiceUrl}/register?propertyId=${propertyId}&fwd=${encodeURIComponent(fwdUrl)}`
  }
}

export const useLoginPopup = () => {
  const { loginUrl } = useAuthUrls('');
  const { idServiceUrl, localStorageKey } = useAuthContext();
  const { setAccessToken } = useAuthState();

  const openLoginPopup = (cb?: () => void) => {
    window.open(loginUrl, 'login', getPopupParams());

    window.addEventListener("message", (e) => {
      if (e.origin !== idServiceUrl) return;

      if (typeof e.data.accessToken === "string") {
        setAccessToken(localStorageKey, e.data.accessToken);
        cb?.();
      }
    }, false);
  }

  return openLoginPopup;
}
