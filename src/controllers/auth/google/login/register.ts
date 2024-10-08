import { google } from 'googleapis';
import { configOptions } from '../../../../config/options.js';
import { Request, Response } from 'express';
import { config } from 'dotenv';
config();

export const loginGoogleOauth = async (req: Request, res: Response) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      configOptions.ClientId,
      configOptions.ClientSecret,
      process.env.GOOGLEOAUTH_LOGIN as string
    );

    const googleOauthUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.email'],
    });

    res.json(googleOauthUrl);
  } catch (error: any) {
    console.log(error);
    res.json('there was an error');
  }
};
