import { NextFunction, Request, Response } from 'express';
import { writeLog } from '../libs/write-log.js';
import chalk from 'chalk';

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await writeLog(
    'logs.log',
    `${req.clientIp}\t${req.useragent?.os}\t${req.headers['host']}\t${req.protocol}\t${req.method}\t${req.originalUrl}`
  );
  console.log(
    `${chalk.greenBright('Request:')}\t${chalk.yellow(req.clientIp)}\t${
      req.useragent?.os
    }\t${req.headers['host']}\t${chalk.blue(req.protocol)}\t${
      req.method
    }\t${chalk.yellow(req.url)}`
  );

  next();
};
