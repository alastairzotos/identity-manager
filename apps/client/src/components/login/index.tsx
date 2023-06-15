import { LoginModesForms } from "@/components/_core/login-mode-forms";
import { PropertyContainer } from "@/components/_core/property-container";
import { LoginWithEmailAndPassword } from "@/components/login/modes/email-and-password";
import React from "react";

export const LoginForm: React.FC = () => {
  return (
    <PropertyContainer
      getTitle={(property) => `Login to ${property.name}`}
    >
      {(property) => (
        <LoginModesForms
          property={property}
          modeMap={{
            email_and_password: <LoginWithEmailAndPassword property={property} />,
            facebook: null,
            google: null,
          }}
        />
      )}
    </PropertyContainer>
  )
}
