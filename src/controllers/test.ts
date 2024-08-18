import { Request, Response } from 'express';
import { createUser, readDB } from '../libs/save';

export const testHandler = async (req: Request, res: Response) => {
  try {
    await readDB();
    await createUser('Briannnnnjhlg,asj', 'gfgflglaeflifhaudh,aj,s');
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
