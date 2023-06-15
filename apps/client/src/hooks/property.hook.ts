import { useGetProperty } from "@/state/property";
import { FetchStatus } from "@bitmetro/create-query";
import { IProperty, WithId } from "@bitmetro/identity";
import { useEffect } from "react";

export const useProperty = (propertyId: string): [FetchStatus | undefined, WithId<IProperty> | null] => {
  const [getPropertyStatus, getProperty, property] = useGetProperty(s => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!!propertyId) {
      getProperty(propertyId);
    }
  }, [propertyId]);

  return [getPropertyStatus, property];
}
