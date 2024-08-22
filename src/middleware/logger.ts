import { NextFunction, Request, Response } from 'express';
import { writeLog } from '../libs/write-log.js';
import chalk from 'chalk';

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqOrigin: string | undefined =
    req.headers.origin == undefined ? 'same' : req.headers.origin;
  const source: string | undefined =
    req.useragent?.browser == 'unknown'
      ? req.useragent?.source
      : req.useragent?.browser;

  await writeLog(
    'logs.log',
    `${req.clientIp}\t${req.useragent?.os}\t${reqOrigin}\t${source}\t${req.protocol}\t${req.method}\t${req.originalUrl}`
  );
  console.log(
    `${chalk.greenBright('Request:')}\t${chalk.yellow(req.clientIp)}\t${
      req.useragent?.os
    }\t${reqOrigin}\t${source}\t${chalk.blue(req.protocol)}\t${
      req.method
    }\t${chalk.yellow(req.url)}`
  );

  next();
};
