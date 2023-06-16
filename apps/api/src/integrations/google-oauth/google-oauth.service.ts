import { googleFieldsToUserDetails } from "@bitmetro/identity";
import { Injectable } from "@nestjs/common"
import axios from 'axios';
import { IOAuthVerificationDetails, IOAuthVerifier } from 'models';

@Injectable()
export class GoogleOAuthService implements IOAuthVerifier {
  async verifyAccessToken(accessToken: string): Promise<IOAuthVerificationDetails | null> {
    try {
      const result = (await axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })).data;

      const { email, ...details } = result;

      return {
        email,
        userDetails: googleFieldsToUserDetails(details),
      };
    } catch {
      return null;
    }
  }
}
