import { httpClient } from "@/clients/http.client"
import { ICreateApiKeyDto, ICreatedApiKeyDto, IGetApiKeyDto } from "@bitmetro/dashboard-models"

export const getApiKeysForOwner = async () => {
  const { data } = await httpClient.get<IGetApiKeyDto[]>('/api-keys');

  return data;
}

export const createApiKey = async (name: string) => {
  const { data } = await httpClient.post<ICreateApiKeyDto, { data: ICreatedApiKeyDto }>('/api-keys', { name });

  return data;
}

export const deleteApiKey = async (id: string) => {
  await httpClient.delete(`/api-keys/${id}`);
}
