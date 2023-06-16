import { LoginModeInput } from "@/components/properties/_core/login-mode-form";
import { ILoginModeFormGetSetProps } from "@/components/properties/_core/login-mode-form-props";
import { Form, Input, Typography } from "antd";
import React from "react";

export const LoginModeGoogle: React.FC<ILoginModeFormGetSetProps> = (props) => {
  const { getValues, setValue } = props;

  return (
    <LoginModeInput
      mode="google"
      {...props}
    >
      <Form
        size="small"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          googleClientId: getValues().credentials?.googleClientId,
          googleClientSecret: getValues().credentials?.googleClientSecret,
        }}
      >
        <Form.Item
          label="Client ID"
          name="googleClientId"
          rules={[{ required: true, message: 'Client ID is required' }]}
        >
          <Input
            onChange={e => setValue("credentials.googleClientId", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Client secret"
          name="googleClientSecret"
          rules={[{ required: true, message: 'Client secret is required' }]}
          extra={<Typography.Text type="secondary">Contents are encrypted</Typography.Text>}
        >
          <Input
            onChange={e => setValue("credentials.googleClientSecret", e.target.value)}
          />
        </Form.Item>
      </Form>
    </LoginModeInput>
  )
}
