import React from "react";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { SocialLoginButton } from "@/components/_core/social-login-button";
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from "react-facebook-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { IProperty, WithId } from "@bitmetro/identity";
import { useStatus } from "@/hooks/status.hook";
import { facebookFieldsToUserInfo, userDetailsToFacebookFields } from "@/utils/facebook";
import { loginWithFacebook } from "@/clients/identity.client";
import { useReturnWithAccessToken } from "@/hooks/return.hook";

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
          propertyId: property._id,
          accessToken: info.accessToken,
          email: info.email!,
          userDetails: facebookFieldsToUserInfo(info),
        })

        returnWithAccessToken(accessToken);
      } catch (e) {
        setStatus("error", (e as any)?.message || JSON.stringify(e))
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
      fields={"email," + userDetailsToFacebookFields(property.userDetails)}
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
