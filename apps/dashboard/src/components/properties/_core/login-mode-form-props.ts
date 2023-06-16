import { ILoginMode, IProperty } from "@bitmetro/auth-react";
import { UseFormSetValue } from "react-hook-form";

export interface ILoginModeFormGetSetProps {
  getValues: () => IProperty;
  setValue: UseFormSetValue<IProperty>;
}

export interface ILoginModeFormProps extends ILoginModeFormGetSetProps {
  mode: ILoginMode;
}
