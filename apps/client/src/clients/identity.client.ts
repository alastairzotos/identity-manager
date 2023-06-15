import { httpClient } from "@/clients/http.client";
import { IRegisterWithEmailAndPasswordDto, ILoginWithEmailAndPasswordDto, ILoginResponseDto } from "@bitmetro/identity";

export const registerWithEmailAndPassword = async (registerData: IRegisterWithEmailAndPasswordDto) => {
  const { data } = await httpClient.put<IRegisterWithEmailAndPasswordDto, { data: ILoginResponseDto }>('/identities/email-and-password', registerData);

  return data;
}

export const loginWithEmailAndPassword = async (loginData: ILoginWithEmailAndPasswordDto) => {
  const { data } = await httpClient.post<ILoginWithEmailAndPasswordDto, { data: ILoginResponseDto }>('/identities/email-and-password', loginData);

  return data;
}
