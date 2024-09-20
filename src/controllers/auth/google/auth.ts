import { Request, Response } from 'express';
import { google } from 'googleapis';
import { configOptions } from '../../../config/options.js';
import User from '../../../models/model.js';
import { generateNewAPIKey } from '../../../libs/api-key-gen.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const googleOauthProvider = async (req: Request, res: Response) => {
  const oauth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    process.env.GOOGLEOAUTH_URL as string
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
    if (checkUser)
      return res
        .status(409)
        .json({ status: 409, err: 'This user is already registered' });

    const apiKey = await generateNewAPIKey();
    let n = await userInfo.data.email?.split('@')[0];

    await User.create({
      email: userInfo.data.email,
      userName: n,
      key: apiKey,
      password: '',
      authby: 'Google',
    });
    const newUser = await User.findOne({ email: userInfo.data.email });

    const token = await jwt.sign(
      //@ts-ignore
      { userID: newUser._id },
      process.env.LOGIN_JWT_TOKEN as string,
      {
        expiresIn: '1 day',
      }
    );
    return res.status(201).json({
      status: 201,
      msg: 'Account created successfully',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ status: 500, err: 'Failed to authenticate' });
  }
};
