import { Request, Response } from 'express';
import User from '../../models/model.js';
import { generateNewAPIKey } from '../../libs/api-key-gen.js';

export const regenerateKey = async (req: Request, res: Response) => {
  const { userID } = req.body;
  if (!userID)
    return res.status(400).json({ status: 400, ok: false, err: 'no key' });
  try {
    const user = await User.findById(userID);
    if (!user) return res.status(403).json({ status: 403, ok: false, err: '' });
    const newKey = await generateNewAPIKey();
    await User.findByIdAndUpdate(userID, { key: newKey });
    res.status(200).json({ status: 200, ok: false, msg: 'New key created' });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: 500, ok: false, err: 'Internal server error' });
  }
};

export const deleteKey = async (req: Request, res: Response) => {
  const { userID } = req.body;
  if (!userID)
    return res.status(400).json({ status: 400, ok: false, err: 'no key' });
  try {
    const user = await User.findById(userID);
    if (!user) return res.status(403).json({ status: 403, ok: false, err: '' });
    await User.findByIdAndUpdate(userID, { key: '' });
    res.status(200).json({ status: 200, ok: false, msg: 'API key deleted' });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: 500, ok: false, err: 'Internal server error' });
  }
};
