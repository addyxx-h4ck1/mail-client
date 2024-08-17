import { Request, Response } from 'express';
import { google } from 'googleapis';
import { configOptions } from '../config/options';
import path from 'path';
import { getDir } from '../utils/getDir';

export const handleOauthcallback = async (req: Request, res: Response) => {
  const oauth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    'http://localhost:3000'
  );

  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json('Authorization code is missing');
  }

  try {
    // Exchange the authorization code for access and refresh tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log(tokens);

    res.sendFile(path.join(getDir(), '..', 'public', 'index.html'));
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    res.status(500).json('Failed to authenticate');
  }
};
