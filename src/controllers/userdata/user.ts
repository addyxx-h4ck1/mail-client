import User from '../../models/model.js';
import { Request, Response } from 'express';

export const handleUserData = async (req: Request, res: Response) => {
  const { userID } = req.body;
  if (!userID) return res.sendStatus(400);
  const userData = await User.findById(userID as string)
    .select(
      '-password -GmailAccounts.refreshToken -GmailAccounts.scope -GmailAccounts.tokenType'
    )
    .populate({
      path: 'activities',
      options: {
        sort: { createdAt: 1 },
      },
    })
    .exec();

  if (!userData) return res.sendStatus(404); // if user is null send 404

  res.status(200).json([userData]);
};
