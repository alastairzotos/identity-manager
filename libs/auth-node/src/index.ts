import axios, { AxiosInstance } from "axios";
import { IIdentity, ILoginResponseDto, IVerifyPasswordDto } from "@bitmetro/identity";

export interface IdentityProviderProps {
  idServer?: string;
  apiKey: string;
}

export class IdentityProvider<T = Object> {
  private httpClient: AxiosInstance;

  constructor({
    idServer = "https://identity-api.bitmetro.io",
    apiKey
  }: IdentityProviderProps) {
    this.httpClient = axios.create({
      baseURL: idServer + "/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.httpClient.interceptors.request.use((config) => {
      config.headers!.authentication = `Bearer ${apiKey}`;
      return config;
    }, console.error);
  }

  async verifyIdentityFromToken(accessToken: string): Promise<IIdentity<T>> {
    const { data } = await this.httpClient.post<ILoginResponseDto, { data: IIdentity<T> }>('/identities/verify', { accessToken });

    return data;
  }

  async verifyIdentityFromHeaders(headers: any): Promise<IIdentity<T> | false> {
    if (!headers) {
      return false;
    }

    const auth = headers.authentication || headers.authorization;
    if (!auth) {
      return false;
    }

    const [key, token] = auth.split(' ');

    if (key !== 'Bearer' || !token || token === 'null') {
      return false;
    }

    return await this.verifyIdentityFromToken(token);
  }

  async verifyPassword(identityId: string, password: string): Promise<boolean> {
    const { data } = await this.httpClient.post<IVerifyPasswordDto, { data: boolean }>('/identities/verify-password', { identityId, password });

    return data;
  }
}

export type {
  IIdentity,
  IProperty,
  IUserDetail,
  ILoginMode,
  ILoginResponseDto,
  WithId,
} from '@bitmetro/identity';
