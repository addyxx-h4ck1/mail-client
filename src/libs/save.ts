import User from '../models/model.js';

export const readDB = async () => {
  const allUsers = await User.find();
  return allUsers;
};

export const createUser = async (
  email: string,
  refreshToken: string,
  scope: string,
  tokenType: string
) => {
  try {
    await User.create({
      email: email,
      refreshToken: refreshToken,
      scope: scope,
      tokenType: tokenType,
    });
  } catch (error) {
    console.error(error);
  }
};
