import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { getDir } from '../utils/getDir.js';
import data from '../db.json' assert { type: 'json' };

export const readDB = async () => {
  const data = await fsPromises.readFile(
    path.join(getDir(), '..', 'db.json'),
    'utf8'
  );
  return data;
};

export const createUser = async (
  email: string | null | undefined,
  refreshToken: string | null | undefined,
  accessToken: string | null | undefined
) => {
  if (!email || !refreshToken) throw new Error('token and email needed');
  let newData = await [...data, { email, refreshToken, accessToken }];
  try {
    await fsPromises.writeFile(
      path.join(getDir(), '..', 'db.json'),
      JSON.stringify(newData)
    );
    return true;
  } catch (error: any) {
    console.log(error);
  }
};
