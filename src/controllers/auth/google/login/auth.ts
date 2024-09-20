import { Request, Response } from 'express';
import { google } from 'googleapis';
import { configOptions } from '../../../../config/options.js';
import User from '../../../../models/model.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const googleOauthProviderLogin = async (req: Request, res: Response) => {
  const oauth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    process.env.GOOGLEOAUTH_LOGIN as string
  );

  const code = req.query.code as string;

  if (!code) {
    return res
      .status(400)
      .json({ status: 400, err: 'Authorization code is missing' });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    const checkUser = await User.findOne({ email: userInfo.data.email });
    if (!checkUser)
      return res
        .status(404)
        .json({ status: 404, err: `${userInfo.data.email} is not registered` });

    const token = await jwt.sign(
      //@ts-ignore
      { userID: checkUser._id },
      process.env.LOGIN_JWT_TOKEN as string,
      {
        expiresIn: '1 day',
      }
    );
    return res.status(201).json({
      status: 201,
      msg: 'Login successful',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ status: 500, err: 'Failed to authenticate' });
  }
};
