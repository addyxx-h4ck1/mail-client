import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const generateNewAPIKey = async () => {
  const key = await crypto.randomBytes(32).toString('hex'); // Generates a 64-character API key
  return key;
};
