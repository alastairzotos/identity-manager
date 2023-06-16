import { IUserDetail, facebookFieldsToUserDetails, userDetailsToFacebookFields } from "@bitmetro/identity";
import { Injectable } from "@nestjs/common"
import axios from 'axios';
import { IOAuthVerificationDetails, IOAuthVerifier } from 'models';

@Injectable()
export class FacebookOAuthService implements IOAuthVerifier {
  async verifyAccessToken(accessToken: string, userDetails: IUserDetail[]): Promise<IOAuthVerificationDetails | null> {
    try {
      const result = (await axios.get(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=${userDetailsToFacebookFields(userDetails)}`
      )).data;

      const { email, ...details } = result;

      return {
        email,
        userDetails: facebookFieldsToUserDetails(details),
      }
    } catch {
      return null;
    }
  }
}
