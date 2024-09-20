import { Request, Response } from 'express';
import User from '../../models/model.js';
import bcrypt from 'bcrypt';

export const createPassword = async (req: Request, res: Response) => {
  const { userID, password, confirmPassword } = req.body;

  if (!password || !confirmPassword)
    return res
      .status(400)
      .json({ status: 400, ok: false, err: 'necessary fields are empty' });

  if (password !== confirmPassword)
    return res.status(409).json({ status: 409, ok: false, err: 'CONFLICT' });

  try {
    const user = await User.findOne({ _id: userID });
    if (!user)
      return res
        .status(404)
        .json({ status: 404, ok: false, err: 'user not found' });

    if (user.authby?.toLocaleLowerCase() == 'sso')
      return res.status(400).json({
        status: 400,
        ok: false,
        err: 'This account was created by sso',
      });

    if (user.password !== '')
      return res.status(400).json({
        status: 400,
        ok: false,
        err: 'This account already has a password',
      });

    const hashedPwd = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(userID, { password: hashedPwd }).exec();

    res
      .status(201)
      .json({ status: 201, ok: true, msg: 'Password created successfully' });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: 500, ok: false, err: 'Internal server error' });
  }
};

export const changePasswordDashboard = async (req: Request, res: Response) => {
  const { userID, password, confirmPassword } = req.body;

  if (!password || !confirmPassword)
    return res
      .status(400)
      .json({ status: 400, ok: false, err: 'necessary fields are empty' });

  if (password !== confirmPassword)
    return res.status(409).json({ status: 409, ok: false, err: 'CONFLICT' });

  try {
    const user = await User.findOne({ _id: userID });
    if (!user)
      return res
        .status(404)
        .json({ status: 404, ok: false, err: 'user not found' });

    if (user.password == '')
      return res.status(400).json({
        status: 400,
        ok: false,
        err: 'This is a passwordless account',
      });

    const hashedPwd = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(userID, { password: hashedPwd }).exec();

    res
      .status(201)
      .json({ status: 201, ok: true, msg: 'Password changed successfully' });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: 500, ok: false, err: 'Internal server error' });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { userID } = req.body;
  try {
    const user = await User.findById(userID);
    if (!user)
      return res
        .status(404)
        .json({ status: 404, ok: false, err: 'User not found' });

    await User.findByIdAndDelete(userID).exec();
    res
      .status(200)
      .json({ status: 200, ok: true, msg: 'Account deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, ok: false, err: 'Internal server error' });
  }
};
