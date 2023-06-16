import { ILoginModeFormProps } from "@/components/properties/_core/login-mode-form-props";
import { ILoginMode } from "@bitmetro/auth-react";
import { Card, Checkbox } from "antd";
import React from "react";

const modeTitle: Record<ILoginMode, string> = {
  email_and_password: "Email and password",
  facebook: "Facebook",
  google: "Google",
}

export const LoginModeInput: React.FC<React.PropsWithChildren<ILoginModeFormProps>> = ({ mode, getValues, setValue, children }) => {
  const isChecked = getValues().loginModes.includes(mode);

  return (
    <Card>
      <Checkbox
        checked={isChecked}
        onChange={e => {
          if (e.target.checked) {
            setValue("loginModes", [
              ...getValues().loginModes,
              mode,
            ])
          } else {
            setValue("loginModes", getValues().loginModes.filter(m => m !== mode))
          }
        }}
      >
        {modeTitle[mode]}
      </Checkbox>

      {(isChecked && children) && (
        <div style={{ marginTop: 20 }}>
          {children}
        </div>
      )}
    </Card>
  )
}
