import { useAuthState } from "./auth.state";

export const getAccessToken = () => useAuthState.getState().accessToken;

export const getPopupParams = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  const width = 500;
  const height = 600;

  const x = window.outerWidth / 2 - width / 2;
  const y = window.outerHeight / 2 - height / 2;

  const params = {
    scrollbars: "no",
    resizable: "no",
    status: "no",
    location: "no",
    toolbar: "no",
    menubar: "no",
    width: `${width}`,
    height: `${height}`,
    left: `${x}`,
    top: `${y}`,
  }

  return Object.entries(params)
    .reduce((acc, [key, value]) => [
      ...acc,
      `${key}=${value}`,
    ], [] as string[])
    .join(',')
}
