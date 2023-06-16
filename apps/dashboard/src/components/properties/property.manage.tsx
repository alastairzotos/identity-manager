import { StatusSwitch } from "@/components/_core/status-switch";
import { PropertyEditForm } from "@/components/properties/property.edit";
import { useGetPropertyById, useUpdateProperty } from "@/state/properties.state";
import { getAxiosError } from "@/utils/misc";
import { IProperty } from "@bitmetro/auth-react";
import React, { useEffect } from "react";

interface Props {
  propertyId: string;
}

export const PropertyManage: React.FC<Props> = ({ propertyId }) => {
  const [loadStatus, loadProperty, property] = useGetPropertyById(s => [s.status, s.request, s.value]);
  const [updateStatus, updateProperty, updateError] = useUpdateProperty(s => [s.status, s.request, s.error]);

  useEffect(() => {
    if (!!propertyId) {
      loadProperty(propertyId);
    }
  }, [propertyId]);

  const handleUpdate = async (updated: IProperty) => {
    await updateProperty(property?._id!, updated);
  }

  return (
    <StatusSwitch status={loadStatus}>
      {property && (
        <PropertyEditForm
          property={property}
          saveStatus={updateStatus}
          onSave={handleUpdate}
          errorMessage={updateStatus === "error" ? getAxiosError(updateError) : undefined}
        />
      )}
    </StatusSwitch>
  )
}
