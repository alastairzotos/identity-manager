import { IUserDetail, IUserDetails } from "@bitmetro/identity";

export interface IOAuthVerifier {
  verifyAccessToken(accessToken: string, userDetails: IUserDetail[]): Promise<IOAuthVerificationDetails | null>;
}

export interface IOAuthVerificationDetails {
  email: string;
  userDetails: IUserDetails;
}
