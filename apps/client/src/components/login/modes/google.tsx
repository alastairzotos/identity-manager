import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { SocialLoginButton } from "@/components/_core/social-login-button";
import { useStatus } from "@/hooks/status.hook";

export const GoogleLoginButton: React.FC = () => {
  const { isFetching } = useStatus();

  return (
    <SocialLoginButton
      title="Sign-in with Google"
      icon={<GoogleIcon />}
      disabled={isFetching}
      onClick={() => console.log("click")}
    />
  )
}
