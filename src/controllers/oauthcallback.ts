import { Request, Response } from 'express';
import { google } from 'googleapis';
import { configOptions } from '../config/options.js';
import User from '../models/model.js';

export const handleOauthcallback = async (req: Request, res: Response) => {
  const { userID } = req.body;

  if (!userID) {
    return res.status(401).json({ status: 401, err: 'Unauthorized' });
  }

  const existUser = await User.findById(userID);

  if (!existUser) {
    return res.status(404).json({ status: 404, err: 'User not found' });
  }

  const oauth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    'http://localhost:3000/dashboard/gmail-accounts/auth'
  );

  const code = req.query.code as string;

  if (!code) {
    return res
      .status(400)
      .json({ status: 400, err: 'Authorization code is missing' });
  }

  try {
    // Exchange the authorization code for access and refresh tokens

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    const existMail = await User.findOne({
      _id: userID,
      GmailAccounts: { $elemMatch: { usermail: userInfo.data.email } },
    });

    if (existMail)
      return res
        .status(409)
        .json({ status: 409, err: 'Email already intergrated' });

    await User.findByIdAndUpdate(userID, {
      $push: {
        GmailAccounts: {
          usermail: userInfo.data.email,
          refreshToken: tokens.refresh_token,
          scope: tokens.scope,
          tokenType: tokens.token_type,
        },
      },
    });

    return res.status(201).json({ status: 201, msg: 'Intergration success' });
  } catch (error) {
    res.status(500).json({ status: 500, err: 'Failed to authenticate' });
  }
};
