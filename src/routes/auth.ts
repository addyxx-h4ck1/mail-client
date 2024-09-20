import { Router } from 'express';
import { NewUser } from '../controllers/auth/new-user.js';
import { Login } from '../controllers/auth/login.js';
import { verifyUserToken } from '../middleware/verify-user-token.js';
import {
  changePasswordDashboard,
  createPassword,
  deleteAccount,
} from '../controllers/auth/passwords.js';
import { registerGoogleOauth } from '../controllers/auth/google/register.js';
import { googleOauthProvider } from '../controllers/auth/google/auth.js';
import { loginGoogleOauth } from '../controllers/auth/google/login/register.js';
import { googleOauthProviderLogin } from '../controllers/auth/google/login/auth.js';

const router = Router();

router.get('/new/google', registerGoogleOauth);
router.get('/login/google', loginGoogleOauth);
router.post('/new/google/cb', googleOauthProvider);
router.post('/login/google/cb', googleOauthProviderLogin);
router.post('/new/sso', NewUser);
router.post('/login/sso', Login);
router.post('/p/create', verifyUserToken, createPassword);
router.post('/p/change', verifyUserToken, changePasswordDashboard);
router.delete('/acc/delete', verifyUserToken, deleteAccount);

export default router;
