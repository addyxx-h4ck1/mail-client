import { config } from 'dotenv';
config();

export const configOptions: ConfigType = {
  ClientId: process.env.CLIENT_ID,
  ClientSecret: process.env.CLIENT_SECRET,
  RefreshToken: process.env.REFRESH_TOKEN,
  RedirectUri: process.env.REDIRECT_URI,
  smtpsMail: process.env.SMTPS_MAIL,
};
