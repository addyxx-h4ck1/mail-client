import { Request, Response } from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { configOptions } from '../config/options';
import data from '../db.json';

export const mailController = async (req: Request, res: Response) => {
  const { email, body, subject, text } = req.body;
  if (!email || !body || !subject || !text)
    return res
      .status(409)
      .json({ err: 'please provide email, message body, subject, text' });

  const existUser = await data.find((user) => user.email === email); // this is the authenticated user
  if (!existUser)
    return res
      .status(401)
      .json({ err: `user with email ${email} is not registered` });

  console.log(existUser);

  //google auth
  const oAuth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    configOptions.RedirectUri
  );
  oAuth2Client.setCredentials({ refresh_token: existUser.refreshToken }); //refresh token from the authenticated user

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        //@ts-ignore
        service: 'gmail',
        auth: {
          type: 'OAuth2',

          user: existUser?.email, //this is the authenticated user email
          clientId: configOptions.ClientId,
          clientSecret: configOptions.ClientSecret,
          refreshToken: existUser?.refreshToken, // this is the authenticated user refresh token
          accessToken: existUser?.accessToken, // this is the authenticated user access token created above
        },
      });

      const mailOptions = {
        from: `${existUser?.email}`, // this is the authenticated user email
        to: 'briannjosh25@gmail.com', // where the email is being sent to
        subject: subject,
        text: text,
        html: `<h1>${body}</h1>`,
      };

      const success = await transporter.sendMail(mailOptions);
      res.status(200).json({ ok: true, success });
    } catch (error: any) {
      console.log(error.response);

      res.status(500).json({ ok: false, error });
    }
  }

  //execute email service
  sendMail();
};
