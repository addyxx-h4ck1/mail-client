import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/model.js';
import { generateNewAPIKey } from '../../libs/api-key-gen.js';

export const NewUser = async (req: Request, res: Response) => {
  const { userName, email, password, method } = req.body;
  if (!userName)
    return res
      .status(400)
      .json({ status: 400, err: 'Username field is empty' });
  if (!email)
    return res.status(400).json({ status: 400, err: 'Email field is empty' });
  if (!password)
    return res
      .status(400)
      .json({ status: 400, err: 'Password field is empty' });

  const checkUserName = await User.findOne({ userName: userName }); //check username exists
  if (checkUserName)
    return res
      .status(400)
      .json({ status: 400, err: `${userName} is already taken` });

  const checkEmail = await User.findOne({ email: email }); // checks if  email exists
  if (checkEmail)
    return res
      .status(409)
      .json({ status: 409, err: `${email} is already in use` });

  const hashedPwd = await bcrypt.hash(password, 10); //hashed password
  const apiKey = await generateNewAPIKey();

  try {
    await User.create({
      userName: userName,
      email: email,
      password: hashedPwd,
      authby: method,
      key: apiKey,
    });
    res.status(201).json({ status: 201, msg: 'User created successfully' });
  } catch (error: any) {
    res
      .status(201)
      .json({ status: 500, msg: 'server error, please try again' });
  }
};
