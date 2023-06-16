import { LoginModeInput } from "@/components/properties/_core/login-mode-form";
import { ILoginModeFormGetSetProps } from "@/components/properties/_core/login-mode-form-props";
import { Form, Input, Typography } from "antd";
import React from "react";

export const LoginModeFacebook: React.FC<ILoginModeFormGetSetProps> = (props) => {
  const { getValues, setValue } = props;

  return (
    <LoginModeInput
      mode="facebook"
      {...props}
    >
      <Form
        size="small"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          fbAppId: getValues().credentials?.fbAppId,
          fbAppSecret: getValues().credentials?.fbAppSecret,
        }}
      >
        <Form.Item
          label="App ID"
          name="fbAppId"
          rules={[{ required: true, message: 'App ID is required' }]}
        >
          <Input
            onChange={e => setValue("credentials.fbAppId", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="App secret"
          name="fbAppSecret"
          rules={[{ required: true, message: 'App secret is required' }]}
          extra={<Typography.Text type="secondary">Contents are encrypted</Typography.Text>}
        >
          <Input
            onChange={e => setValue("credentials.fbAppSecret", e.target.value)}
          />
        </Form.Item>
      </Form>
    </LoginModeInput>
  )
}
