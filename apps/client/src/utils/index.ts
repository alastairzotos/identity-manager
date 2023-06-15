export const getForwardUrl = () => {
  return new URLSearchParams(window.location.search).get("fwd") || "/";
}

export const createForwardUrl = (accessToken: string) => {
  const newUrl = new URL(getForwardUrl());
  newUrl.searchParams.append('accessToken', accessToken);
  return newUrl.toString();
}
