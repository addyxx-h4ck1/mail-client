import { NextFunction, Request, Response } from 'express';
import User from '../models/model.js';
import { randomUUID } from 'crypto';

export const checkAPIKeyValidity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).json({
      status: 400,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'BAD_REQUEST',
        response: 'API key not provided',
      },
    });
  try {
    const APIKEY = await authorization.split(' ');

    if (APIKEY?.length !== 2)
      return res.status(400).json({
        status: 400,
        ok: false,
        data: {},
        reqID: randomUUID(),
        reqDate: new Date(),
        err: {
          err: 'BAD_REQUEST',
          response: 'Invalid API key format',
        },
      });
    const account = await User.findOne({ key: APIKEY[1] });
    if (!account)
      return res.status(404).json({
        status: 404,
        ok: false,
        data: {},
        reqID: randomUUID(),
        reqDate: new Date(),
        err: {
          err: 'NOT_FOUND',
          response: 'Unknown API key',
        },
      });
    req.params['apikey'] = APIKEY[1] as string;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      ok: false,
      data: {},
      reqID: randomUUID(),
      reqDate: new Date(),
      err: {
        err: 'SERVER_ERROR',
        response: 'Internal server error',
      },
    });
  }
};
