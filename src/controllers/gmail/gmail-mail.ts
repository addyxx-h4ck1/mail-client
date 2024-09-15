import { randomUUID } from 'crypto';
import User from '../../models/model.js';
import { NextFunction, Request, Response } from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { configOptions } from '../../config/options.js';
import { config } from 'dotenv';
config();

export const GmailAPIController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { from, to, subject, html, text } = req.body;

  const sender = await User.findOne(
    {
      key: req.params.apikey,
      GmailAccounts: { $elemMatch: { usermail: from } },
    },
    { 'GmailAccounts.$': 1 }
  );

  if (!sender)
    return res.status(404).json({
      status: 404,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'NOT_FOUND',
        response: `${from} is not intergrated with with EngineM`,
      },
    });

  //send mail mechanism

  const oAuth2Client = new google.auth.OAuth2(
    configOptions.ClientId,
    configOptions.ClientSecret,
    configOptions.RedirectUri
  );
  oAuth2Client.setCredentials({
    refresh_token: sender?.GmailAccounts[0]?.refreshToken,
    scope: sender?.GmailAccounts[0]?.scope as string,
    token_type: sender?.GmailAccounts[0]?.tokenType,
  });

  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      //@ts-ignore
      host: 'smtp.gmail.com',
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: sender?.GmailAccounts[0]?.usermail, //this is the authenticated user email
        clientId: configOptions.ClientId,
        clientSecret: configOptions.ClientSecret,
        refreshToken: sender?.GmailAccounts[0]?.refreshToken, // this is the authenticated user refresh token
        accessToken: accessToken.token, // this is the authenticated user access token created above
      },
    });

    const mailOptions = {
      from: `<${sender?.GmailAccounts[0]?.usermail}>`, // this is the authenticated user email
      to: to, // where the email is being sent to
      subject: subject,
      text: text,
      html: html,
    };
    await User.findOneAndUpdate(
      { key: req.params.apikey, 'GmailAccounts.usermail': from }, // Find user and specific Gmail account

      {
        $inc: {
          mailSent: 1, // Increment mailSent
          successSent: 1,
          'GmailAccounts.$.emailSent': 1, // Increment emailSent in the matched Gmail account
        },
        $push: {
          activities: {
            from: from,
            recepients: to.length,
            origin: req.headers.origin || req.useragent?.source,
            status: '201',
            sucess: true,
          }, // Add the new activity to the activities array
        },
      }
    );
    const success = await transporter.sendMail(mailOptions);
    res.status(201).json({
      status: 201,
      ok: true,
      data: success,
      reqID: randomUUID(),
      reqDate: new Date(),
      message: {
        message: 'CREATED',
        response: `Email has been passed to Gmail SMPT successfully for delivery`,
      },
    });
  } catch (error: any) {
    await User.findOneAndUpdate(
      { key: req.params.apikey, 'GmailAccounts.usermail': from }, // Find user and specific Gmail account

      {
        $inc: {
          mailSent: 1, // Increment mailSent
          failedToBeSent: 1,
        },
        $push: {
          activities: {
            from: from,
            recepients: to.length,
            origin: req.headers.origin || req.useragent?.source,
            status: error?.code || 'NO_CODE',
            sucess: false,
          }, // Add the new activity to the activities array
        },
      }
    );
    console.log(error);
    return res.status(500).json({
      status: 500,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'SERVER_ERROR',
        response: `Internal server error`,
      },
    });
  }
};
