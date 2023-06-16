import { LoginModesForms } from "@/components/_core/login-mode-forms";
import { PropertyContainer } from "@/components/_core/property-container";
import { LoginWithEmailAndPassword } from "@/components/login/modes/email-and-password";
import { FacebookLoginButton } from "@/components/login/modes/facebook";
import { GoogleLoginButton } from "@/components/login/modes/google";
import { StatusProvider, useStatus } from "@/hooks/status.hook";
import { IProperty, WithId } from "@bitmetro/identity";
import { Alert } from "@mui/material";
import React from "react";

const LoginFormInner: React.FC<{ property: WithId<IProperty> }> = ({ property }) => {
  const { errorMessage } = useStatus();

  return (
    <>
      <LoginModesForms
        property={property}
        modeMap={{
          email_and_password: <LoginWithEmailAndPassword property={property} />,
          facebook: <FacebookLoginButton property={property} />,
          google: <GoogleLoginButton property={property} />,
        }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mt: 1 }}>{errorMessage}</Alert>
      )}
    </>
  )
}

export const LoginForm: React.FC = () => {
  return (
    <PropertyContainer
      getTitle={(property) => `Login to ${property.name}`}
    >
      {(property) => (
        <StatusProvider>
          <LoginFormInner property={property} />
        </StatusProvider>
      )}
    </PropertyContainer>
  )
}
