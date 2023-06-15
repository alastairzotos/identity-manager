import { createApiKey, deleteApiKey, getApiKeysForOwner } from "@/clients/api-key.client";
import { createQuery } from "@bitmetro/create-query";

export const useGetApiKeysForOwner = createQuery(getApiKeysForOwner);
export const useCreateApiKey = createQuery(createApiKey);
export const useDeleteApiKey = createQuery(deleteApiKey);
