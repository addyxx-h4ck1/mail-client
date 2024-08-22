import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { getDir } from '../utils/getDir.js';
import { data } from '../db.js';

export const readDB = async () => {
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
      path.join(getDir(), '..', 'db.js'),
      JSON.stringify(newData)
    );
    return true;
  } catch (error: any) {
    console.log(error);
  }
};
