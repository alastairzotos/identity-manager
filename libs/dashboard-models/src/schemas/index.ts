import { z } from 'zod';
import { timestamps } from '@bitmetro/identity'

export const apiKeySchema = z.object({
  ownerId: z.string().nonempty(),
  name: z.string().nonempty(),
  hashedKey: z.string().optional(),
  ...timestamps,
})

export type IApiKeySchema = z.infer<typeof apiKeySchema>;
