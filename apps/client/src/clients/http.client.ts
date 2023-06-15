import { getEnv } from '@/env';
import { createHttpClient } from '@bitmetro/http-client';

export const httpClient = createHttpClient(getEnv().apiUrl + '/api/v1');
