import { httpClient } from "@/clients/http.client";
import { IRegisterWithEmailAndPasswordDto, ILoginWithEmailAndPasswordDto, ILoginResponseDto, ILoginWithOAuthDto,  } from "@bitmetro/identity";

export const registerWithEmailAndPassword = async (registerData: IRegisterWithEmailAndPasswordDto) => {
  const { data } = await httpClient.put<IRegisterWithEmailAndPasswordDto, { data: ILoginResponseDto }>('/identities/email-and-password', registerData);

  return data;
}

export const loginWithEmailAndPassword = async (loginData: ILoginWithEmailAndPasswordDto) => {
  const { data } = await httpClient.post<ILoginWithEmailAndPasswordDto, { data: ILoginResponseDto }>('/identities/email-and-password', loginData);

  return data;
}

export const loginWithFacebook = async (details: ILoginWithOAuthDto): Promise<string> => {
  const { data } = await httpClient.post<
    ILoginWithOAuthDto,
    { data: ILoginResponseDto }
  >("/identities/oauth/facebook", details);
  return data.accessToken;
};
