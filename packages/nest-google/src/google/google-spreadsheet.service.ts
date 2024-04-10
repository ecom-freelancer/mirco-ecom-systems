import { Auth } from 'googleapis';
import { GoogleOptions } from './interfaces';
import { sheets } from '@googleapis/sheets';

export class GoogleSpreadSheetService {
  private readonly auth: Auth.GoogleAuth;
  constructor(options: GoogleOptions) {
    this.auth = new Auth.GoogleAuth({
      credentials: {
        private_key: options.privateKey?.replace(/\\n/g, '\n'),
        client_email: options.clientEmail,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  private async authorize() {
    return sheets({
      version: 'v4',
      auth: this.auth,
    });
  }

  async getSpreadsheet(spreadsheetId: string, gId?: string) {
    const instance = await this.authorize().catch((err) => {
      throw new Error('Could not authenticate with your google certificate');
    });
    const sheets = await instance.spreadsheets
      .get({
        spreadsheetId: spreadsheetId,
      })
      .then((res) => res.data.sheets);

    try {
      const data = await Promise.all(
        sheets
          .filter((s) => (gId ? s.properties.sheetId.toString() === gId : true))
          .map(async (sheet) => {
            const data = await instance.spreadsheets.values.get({
              spreadsheetId: spreadsheetId,
              range: `${sheet.properties.title}!A1:ZZZ`,
            });
            return data?.data;
          }),
      );
      return data;
    } catch (e) {
      throw new Error('Could not get data from google sheets');
    }
  }
}
