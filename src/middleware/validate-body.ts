import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

export const validateMailBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { from, to, subject, html, text } = req.body;
  if (!from && !to && !subject && !html && !text)
    return res.status(400).json({
      status: 400,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'BAD_REQUEST',
        response:
          'Email options are empty . please check the docs on how to send emails with EngineM API',
      },
    });
  if (!from)
    return res.status(400).json({
      status: 400,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'BAD_REQUEST',
        response: '"FROM" field MUST not be empty',
      },
    });
  if (!to)
    return res.status(400).json({
      status: 400,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'BAD_REQUEST',
        response: '"TO" field MUST not be empty',
      },
    });
  if (!Array.isArray(to))
    return res.status(400).json({
      status: 400,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'BAD_REQUEST',
        response:
          '"TO" field MUST be an array of all the recepients eg ["example@gmail.com"]. Please read our docs.',
      },
    });

  if (!subject)
    return res.status(400).json({
      status: 400,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'BAD_REQUEST',
        response:
          '"SUBJECT" field MUST not be empty to prevent your email to be flagged as SPAM',
      },
    });
  if (!text)
    return res.status(400).json({
      status: 400,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'BAD_REQUEST',
        response: '"TEXT" field MUST not be empty',
      },
    });

  next();
};
