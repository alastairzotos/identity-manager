import { Injectable } from "@nestjs/common"
import axios from 'axios';

@Injectable()
export class FacebookOAuthService {
  async verifyAccessToken(accessToken: string): Promise<boolean> {
    try {
      await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);
      return true;
    } catch {
      return false;
    }
  }
}
