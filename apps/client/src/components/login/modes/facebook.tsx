import React from "react";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { SocialLoginButton } from "@/components/_core/social-login-button";
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from "react-facebook-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { IProperty, WithId } from "@bitmetro/identity";
import { useStatus } from "@/hooks/status.hook";
import { loginWithFacebook } from "@/clients/identity.client";
import { useReturnWithAccessToken } from "@/hooks/return.hook";
import { errorString } from "@/utils";

interface Props {
  property: WithId<IProperty>;
}

export const FacebookLoginButton: React.FC<Props> = ({ property }) => {
  const { isFetching, setStatus } = useStatus();
  const returnWithAccessToken = useReturnWithAccessToken();

  const handleLogin = async (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if (!!(userInfo as ReactFacebookFailureResponse).status) {
      setStatus("error", `There was an error: ${(userInfo as ReactFacebookFailureResponse).status}`);
    } else {
      const info = userInfo as ReactFacebookLoginInfo;

      try {
        const accessToken = await loginWithFacebook({
          accessToken: info.accessToken,
          propertyId: property._id,
        })

        returnWithAccessToken(accessToken);
      } catch (e) {
        setStatus("error", errorString(e))
      }
    }
  }

  if (!property.credentials?.fbAppId) {
    return null;
  }

  return (
    <FacebookLogin
      buttonStyle={{ width: "100%" }}
      appId={property.credentials?.fbAppId}
      callback={handleLogin}

      render={({ onClick }) => (
        <SocialLoginButton
          title="Login with Facebook"
          icon={<FacebookRoundedIcon />}
          disabled={isFetching}
          onClick={() => {
            setStatus('fetching');
            onClick();
          }}
        />
      )}
    />
  )
}
