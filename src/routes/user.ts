import { Router } from 'express';
import { handleUserData } from '../controllers/userdata/user.js';
import { verifyUserToken } from '../middleware/verify-user-token.js';

const router = Router();

router.get('/', verifyUserToken, handleUserData);

export default router;
