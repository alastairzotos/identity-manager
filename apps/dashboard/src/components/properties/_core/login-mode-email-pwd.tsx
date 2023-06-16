import { LoginModeInput } from "@/components/properties/_core/login-mode-form";
import { ILoginModeFormGetSetProps } from "@/components/properties/_core/login-mode-form-props";
import React from "react";

export const LoginModeEmailPassword: React.FC<ILoginModeFormGetSetProps> = (props) => (
  <LoginModeInput
    mode="email_and_password"
    {...props}
  />
)
