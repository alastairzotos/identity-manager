import { Input, Select, Switch } from "antd";
import React, { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchStatus } from "@bitmetro/create-query";
import { IProperty, propertySchema } from "@bitmetro/identity";
import Editor, { } from '@monaco-editor/react';
import { ResourceForm } from "@/components/_core/form/resource-form";
import { FormItem } from "@/components/_core/form/form-item";

interface Props {
  errorMessage?: string;
  property: IProperty;
  saveStatus: FetchStatus | undefined;
  onSave: SubmitHandler<IProperty>;
}

const parseJson = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const PropertyEditForm: React.FC<Props> = ({ errorMessage, property, saveStatus, onSave }) => {
  const editorRef = useRef<{ getValue: () => string } | null>(null);

  return (
    <ResourceForm
      resolver={zodResolver(propertySchema)}
      resource={property}
      saveStatus={saveStatus}
      onSave={onSave}
      errorMessage={errorMessage}
    >
      {({ errors, control, getValues, setValue, isSubmitting }) => (
        <>
          <FormItem
            label="Name"
            field="name"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />

          <FormItem
            label="Unique ID"
            field="uniqueId"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />

          <FormItem
            label="Login modes"
            field="loginModes"
            control={control}
            errors={errors}
            render={() => (
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select..."
                value={getValues().loginModes}
                onChange={(modes) => setValue("loginModes", modes)}
                options={[
                  {
                    label: "Email and password",
                    value: "email_and_password"
                  },
                  {
                    label: "Google",
                    value: "google"
                  },
                  {
                    label: "Facebook",
                    value: "facebook"
                  },
                ]}
              />
            )}
          />

          <FormItem
            label="User details"
            field="userDetails"
            control={control}
            errors={errors}
            render={() => (
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select..."
                value={getValues().userDetails}
                onChange={(details) => setValue("userDetails", details)}
                options={[
                  {
                    label: "First name",
                    value: "first_name"
                  },
                  {
                    label: "Last name",
                    value: "last_name"
                  },
                  {
                    label: "Display name",
                    value: "display_name"
                  },
                ]}
              />
            )}
          />

          <FormItem
            label="Default user data"
            field="defaultUserData"
            control={control}
            errors={errors}
            render={() => (
              <Editor
                options={{
                  readOnly: isSubmitting,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "off",
                  folding: false,
                }}
                height={120}
                theme="vs-dark"
                defaultLanguage="json"
                defaultValue={JSON.stringify(getValues().defaultUserData, null, 2)}
                onMount={(e) => { editorRef.current = e; }}
                onChange={() => {
                  const json = parseJson(editorRef.current?.getValue() || "{}");

                  if (json !== null) {
                    setValue("defaultUserData", json);
                  }
                }}
              />
            )}
          />

          <FormItem
            label="Theme"
            field="formTheme"
            control={control}
            errors={errors}
            render={() => (
              <Switch
                checkedChildren="dark"
                unCheckedChildren="light"
                checked={getValues().formTheme === "dark"}
                onChange={e => setValue("formTheme", e ? "dark" : "light")}
              />
            )}
          />

          <FormItem
            label="Logo URL"
            field="logo"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />
        </>
      )}
    </ResourceForm>
  )
}
