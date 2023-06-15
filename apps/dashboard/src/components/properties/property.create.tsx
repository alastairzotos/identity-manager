import { PropertyEditForm } from "@/components/properties/property.edit";
import { useCreateProperty } from "@/state/properties.state";
import { urls } from "@/urls";
import { getAxiosError } from "@/utils/misc";
import { IProperty } from "@bitmetro/auth-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const defaultProperty: IProperty = {
  name: "New property",
  uniqueId: "unique-id",
  loginModes: ["email_and_password"],
  userDetails: ["first_name"],
  logo: "https://i.imgur.com/QkVl0LB.png",
  formTheme: "light",
  defaultUserData: {}
}

export const PropertyCreateForm: React.FC = () => {
  const router = useRouter();
  const [createStatus, createProperty, createError] = useCreateProperty(s => [s.status, s.request, s.error]);

  useEffect(() => {
    if (createStatus === "success") {
      router.push(urls.properties.home());
    }
  }, [createStatus]);

  const handleCreate = async (property: IProperty) => {
    await createProperty(property);
  }

  return (
    <PropertyEditForm
      property={defaultProperty}
      saveStatus={createStatus}
      onSave={handleCreate}
      errorMessage={createStatus === "error" ? getAxiosError(createError) : undefined}
    />
  )
}
