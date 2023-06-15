import { LoginModesForms } from "@/components/_core/login-mode-forms";
import { PropertyContainer } from "@/components/_core/property-container";
import { RegisterWithEmailAndPassword } from "@/components/register/modes/email-and-password";
import React from "react";

export const RegisterForm: React.FC = () => {
  return (
    <PropertyContainer
      getTitle={(property) => `Register with ${property.name}`}
    >
      {(property) => (
        <LoginModesForms
          property={property}
          modeMap={{
            email_and_password: <RegisterWithEmailAndPassword property={property} />,
            facebook: null,
            google: null,
          }}
        />
      )}
    </PropertyContainer>
  )
}
