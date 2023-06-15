import { createForwardUrl } from "@/utils";
import { useRouter } from "next/router";

export const useReturnWithAccessToken = () => {
  const router = useRouter();

  return (accessToken: string) => {
    if (typeof window !== "undefined" && !!window.opener) {
      window.opener.postMessage({ accessToken }, '*');
      window.close();
    } else {
      router.push(createForwardUrl(accessToken));
    }
  }
}
