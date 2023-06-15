import { FetchStatus } from "@bitmetro/create-query";
import { Alert, Form } from "antd";
import React from "react";
import { FieldValues } from "react-hook-form";

export interface FormBaseProps<T extends FieldValues> {
  errorMessage?: string;
  onSave: (values: any) => void;
  saveStatus: FetchStatus | undefined;
  fixColumns?: boolean;
}

const fixedColumns = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
}

export function FormBase<T extends FieldValues>({
  errorMessage,
  saveStatus,
  onSave,
  fixColumns = true,
  children,
}: React.PropsWithChildren<FormBaseProps<T>>) {
  return (
    <Form
      disabled={saveStatus === 'fetching'}
      onFinish={onSave}
      {...(fixColumns ? fixedColumns : {})}
      style={{ width: 600 }}
    >
      {!!errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          showIcon
          style={{ marginBottom: 10 }}
        />
      )}

      {children}
    </Form>
  )
}