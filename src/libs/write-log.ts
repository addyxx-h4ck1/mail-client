import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { format } from 'date-fns';
import { getDir } from '../utils/getDir.js';
import { randomUUID } from 'crypto';

export const writeLog = async (filename: string, log: string) => {
  const date = `${format(new Date(), 'MM/dd/yyyy\tHH:mm:ss')}`;
  const content = `${randomUUID()}\t${date}\t${log}\t\n`;

  if (!fs.existsSync(path.join(getDir(), '..', 'logs'))) {
    await fsPromises.mkdir(path.join(getDir(), '..', 'logs'));
  }
  try {
    await fsPromises.appendFile(
      path.join(getDir(), '..', 'logs', filename),
      content
    );
  } catch (error) {
    console.error(error);
  }
};
