import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String },
  authby: { type: String },
  key: { type: String },
  password: { type: String, default: '' },
  mailSent: { type: Number, default: 0 },
  successSent: { type: Number, default: 0 },
  failedToBeSent: { type: Number, default: 0 },
  GmailAccounts: [
    {
      usermail: { type: String },
      refreshToken: { type: String },
      scope: { type: String },
      tokenType: { type: String },
      emailSent: { type: Number, default: 0 },
    },
  ],
  customDomains: [
    {
      server: { type: String },
      user: { type: String },
      pwd: { type: String },
    },
  ],
  activities: [
    {
      from: { type: String },
      recepients: { type: Number },
      origin: { type: String },
      status: { type: String },
      sucess: { type: Boolean },
      reqDate: { type: Date, default: Date.now },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model('User', usersSchema);
