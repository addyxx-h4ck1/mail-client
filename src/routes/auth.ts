import { Router } from 'express';
import { NewUser } from '../controllers/auth/new-user.js';
import { Login } from '../controllers/auth/login.js';

const router = Router();

router.post('/new/sso', NewUser);
router.post('/login/sso', Login);

export default router;
