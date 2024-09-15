import User from '../models/model.js';

export const readDB = async () => {
  const allUsers = await User.find(
    {},
    {
      password: 0, // Exclude password field
      'GmailAccounts.refreshToken': 0, // Exclude refreshToken from GmailAccounts
      'GmailAccounts.scope': 0, // Exclude scope from GmailAccounts
      'GmailAccounts.tokenType': 0, // Exclude tokenType from GmailAccounts
      'GmailAccounts._id': 0, // Exclude _id from GmailAccounts
      customDomains: 0, // Exclude customDomains
      __v: 0, // Exclude __v
    }
  );
  return allUsers;
};

export const createUser = async (
  usermail: string,
  refreshToken: string,
  scope: string,
  tokenType: string
) => {
  try {
    await User.create({
      email: usermail,
      GmailAccounts: [
        {
          usermail: usermail,
          refreshToken: refreshToken,
          scope: scope,
          tokenType: tokenType,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};
