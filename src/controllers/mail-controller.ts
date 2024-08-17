import { Request, Response } from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { configOptions } from '../config/options';

export const mailController = async (req: Request, res: Response) => {
  //req Object received

  //google auth
  const oAuth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    configOptions.RedirectUri
  );
  oAuth2Client.setCredentials({ refresh_token: configOptions.RefreshToken });

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        //@ts-ignore
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          //change the user with the one you've permitted to use thus API on the google console
          user: 'briannjosh23@gmail.com',
          clientId: configOptions.ClientId,
          clientSecret: configOptions.ClientSecret,
          refreshToken: configOptions.RefreshToken,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: `John Doe <briannjosh23@gmail.com>`,
        to: 'briannjosh25@gmail.com',
        subject: `Test Mail`,
        text: 'Hello there',
        html: `<h1>Hello there</h1>`,
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
