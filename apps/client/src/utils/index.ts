import { ILoginMode } from "@bitmetro/identity";

export const getForwardUrl = () => {
  return new URLSearchParams(window.location.search).get("fwd") || "/";
}

export const createForwardUrl = (accessToken: string) => {
  const newUrl = new URL(getForwardUrl());
  newUrl.searchParams.append('accessToken', accessToken);
  return newUrl.toString();
}

const socialLogins: ILoginMode[] = ["facebook", "google"];

export const usesSocialLogin = (modes: ILoginMode[]) =>
  !!socialLogins.find(socialLogin => modes.includes(socialLogin));

export const errorString = (e: any) =>
  e?.response?.data?.message || e?.message || JSON.stringify(e);
