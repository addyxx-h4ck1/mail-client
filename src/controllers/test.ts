import { Request, Response } from 'express';
import { createUser, readDB } from '../libs/save.js';

export const testHandler = async (req: Request, res: Response) => {
  try {
    let data = await readDB();
    res.status(200).json(data);
  } catch (error) {
    res.sendStatus(500);
  }
};
