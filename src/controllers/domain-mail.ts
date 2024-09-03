import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const handleDomainMail = async (req: Request, res: Response) => {
  const transporter = nodemailer.createTransport({
    host: 'mail.pogkenyasafaris.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: 'testup@pogkenyasafaris.com',
      pass: 'briansbns1',
    },
    logger: true,
    debug: true,
  });

  let mailOptions = {
    from: 'testup@pogkenyasafaris.com', // sender address
    to: 'webtech.bn@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: `Hi Briann,

I hope this email finds you well.

I'm just sending this email to test the delivery of messages from my application. Please let me know if you receive this message successfully.

Best regards,
`, // plain text body
    // html body
  };

  try {
    let mail = await transporter.sendMail(mailOptions);
    console.log(mail);
    res.json({ ok: true });
  } catch (error: any) {
    console.error(error);

    res.json(error);
  }
};
