import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/model.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email)
    return res.status(409).json({ status: 400, err: 'Email not provided' });

  try {
    const findUser: any = await User.findOne({ email: email }); // checks if  email exists
    if (!findUser)
      return res
        .status(404)
        .json({ status: 404, err: `${email} is not registred` });

    const dbPwd: boolean = await bcrypt.compare(password, findUser?.password);

    if (!dbPwd)
      return res.status(401).json({ status: 401, err: `wrong credentials` });

    //asign jwt token
    const token = jwt.sign(
      { userID: findUser._id },
      process.env.LOGIN_JWT_TOKEN as string,
      {
        expiresIn: '1 day',
      }
    );
    res.status(201).json({ status: 201, msg: 'login success', t: token });
  } catch (error: any) {
    res
      .status(201)
      .json({ status: 500, msg: 'server error, please try again' });
  }
};
