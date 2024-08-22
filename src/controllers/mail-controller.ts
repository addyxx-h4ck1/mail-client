import { Request, Response } from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { configOptions, testMessage } from '../config/options.js';
import { config } from 'dotenv';
import data from '../db.js';
config();
export const mailController = async (req: Request, res: Response) => {
  const { email, body, subject, text } = req.body;
  if (!subject || !text)
    return res
      .status(409)
      .json({ err: 'please provide email, message body, subject, text' });

  //google auth
  const oAuth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    configOptions.RedirectUri
  );
  oAuth2Client.setCredentials({ refresh_token: configOptions.RefreshToken }); //refresh token from the authenticated user

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        //@ts-ignore
        service: 'gmail',
        auth: {
          type: 'OAuth2',

          user: configOptions.smtpsMail, //this is the authenticated user email
          clientId: configOptions.ClientId,
          clientSecret: configOptions.ClientSecret,
          refreshToken: configOptions.RefreshToken, // this is the authenticated user refresh token
          accessToken: accessToken.token, // this is the authenticated user access token created above
        },
      });

      const mailOptions = {
        from: `smtps Mailer <${configOptions.smtpsMail}>`, // this is the authenticated user email
        to: [
          'briannjosh25@gmail.com',
          'briannjosh23@gmail.com',
          'business.briann@gmail.com',
        ], // where the email is being sent to
        subject: subject,
        text: 'hello there',
        html: testMessage,
      };

      const success = await transporter.sendMail(mailOptions);
      res.status(200).json({ ok: true, success });
    } catch (error: any) {
      console.log(error);

      res.status(500).json({ ok: false, error });
    }
  }

  //execute email service
  sendMail();
};
