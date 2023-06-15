import { createProperty, getPropertiesForOwner, getPropertyById, updateProperty } from "@/clients/properties.client";
import { createQuery } from "@bitmetro/create-query";

export const useGetPropertiesForOwner = createQuery(getPropertiesForOwner);
export const useGetPropertyById = createQuery(getPropertyById);
export const useUpdateProperty = createQuery(updateProperty);
export const useCreateProperty = createQuery(createProperty);
