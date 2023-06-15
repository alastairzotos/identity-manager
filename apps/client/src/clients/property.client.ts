import { httpClient } from "@/clients/http.client"
import { IProperty, WithId } from "@bitmetro/identity";

export const getProperty = async (id: string) => {
  const { data } = await httpClient.get<WithId<IProperty>>(`/properties/by-unique-id/${id}`);

  return data;
}
