import React from "react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import GoogleIcon from '@mui/icons-material/Google';
import { SocialLoginButton } from "@/components/_core/social-login-button";
import { useStatus } from "@/hooks/status.hook";
import { IProperty, WithId } from "@bitmetro/identity";
import { loginWithGoogle } from "@/clients/identity.client";
import { useReturnWithAccessToken } from "@/hooks/return.hook";
import { errorString } from "@/utils";

interface Props {
  property: WithId<IProperty>;
}

const GoogleLoginButtonInner: React.FC<Props> = ({ property }) => {
  const { isFetching, setStatus } = useStatus();
  const returnWithAccessToken = useReturnWithAccessToken();

  const handleGoogleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      try {
        const accessToken = await loginWithGoogle({
          accessToken: response.access_token,
          propertyId: property._id,
        });

        returnWithAccessToken(accessToken);
      } catch (e) {
        setStatus("error", errorString(e))
      }
    },
  });

  return (
    <SocialLoginButton
      title="Sign-in with Google"
      icon={<GoogleIcon />}
      disabled={isFetching}
      onClick={() => {
        setStatus("fetching");
        handleGoogleLogin();
      }}
    />
  )
}

export const GoogleLoginButton: React.FC<Props> = ({ property }) => {
  if (!property.credentials?.googleClientId) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={property.credentials.googleClientId}>
      <GoogleLoginButtonInner property={property} />
    </GoogleOAuthProvider>
  )
}
