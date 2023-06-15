import { WithId } from '@bitmetro/identity';
import { z } from 'zod';
import { apiKeySchema } from '../schemas';

export const createApiKeyDto = z.object({
  name: z.string(),
})

export type ICreateApiKeyDto = z.infer<typeof createApiKeyDto>;

export const createdApiKeyDto = z.object({
  ownerId: z.string(),
  name: z.string(),
  key: z.string(),
})

export type ICreatedApiKeyDto = WithId<z.infer<typeof createdApiKeyDto>>;

export const getApiKeyDto = apiKeySchema.omit({ hashedKey: true });

export type IGetApiKeyDto = WithId<z.infer<typeof getApiKeyDto>>;

