import { google } from 'googleapis';
import { configOptions } from '../config/options';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      configOptions.ClientId,
      configOptions.ClientSecret,
      'http://localhost:3000'
    );

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/gmail.send',
      ],
    });

    console.log(authorizationUrl);
    res.json(authorizationUrl);
  } catch (error: any) {
    console.log(error);
    res.json('there was an error');
  }
};
