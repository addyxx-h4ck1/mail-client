import mongoose from 'mongoose';

export const connection = async (URI: string) => {
  await mongoose.connect(URI as string);
};
