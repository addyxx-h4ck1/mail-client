import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  email: { type: String },
  refreshToken: { type: String },
  scope: { type: String },
  tokenType: { type: String },
});

export default mongoose.model('User', usersSchema);
