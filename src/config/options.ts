import { config } from 'dotenv';
config();

export const configOptions: ConfigType = {
  ClientId: process.env.CLIENT_ID,
  ClientSecret: process.env.CLIENT_SECRET,
  RefreshToken: process.env.REFRESH_TOKEN,
  RedirectUri: process.env.REDIRECT_URI,
  smtpsMail: process.env.SMTPS_MAIL,
};

export const testMessage: string = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 100px;
        }
        .content {
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://main--photoapptest.netlify.app/assets/Photography-Logos-removebg-preview-DsnZ_8jO.png" alt="Company Logo">
            <h1>Welcome to Our Service</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>Thank you for signing up for our service! We're excited to have you on board.</p>
            <p>To get started, please click the button below to verify your email address:</p>
            <a href="#" class="button">Verify Email</a>
            <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
            <p>Best regards,<br>Your Company</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
