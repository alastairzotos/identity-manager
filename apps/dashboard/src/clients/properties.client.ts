import { httpClient } from "@/clients/http.client"
import { IProperty, WithId } from "@bitmetro/auth-react"

export const getPropertiesForOwner = async () => {
  const { data } = await httpClient.get<WithId<IProperty>[]>('/properties/by-owner-id');
  return data;
}

export const getPropertyById = async (id: string) => {
  const { data } = await httpClient.get<WithId<IProperty>>(`/properties/with-credentials/${id}`);
  return data;
}

export const updateProperty = async (id: string, property: IProperty) => {
  await httpClient.patch<IProperty>(`/properties/${id}`, property);
}

export const createProperty = async (property: IProperty) => {
  const { data } = await httpClient.post<IProperty, { data: WithId<IProperty> }>('/properties', property);

  return data;
}
