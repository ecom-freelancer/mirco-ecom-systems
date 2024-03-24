import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { GoogleOptions } from './interfaces/config.interface';

@Injectable()
export class GoogleService {
  oauthClient: Auth.OAuth2Client;

  constructor(options: GoogleOptions) {
    const { clientId, clientSecret } = options;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async authenticate(token: string) {
    try {
      const userInfoClient = google.oauth2('v2').userinfo;

      this.oauthClient.setCredentials({
        access_token: token,
      });

      const { data } = await userInfoClient.get({
        auth: this.oauthClient,
      });

      return data;
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Cannot validate Google Authorize token');
    }
  }
}
