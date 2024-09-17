import { Router } from 'express';
import {
  deleteKey,
  regenerateKey,
} from '../controllers/keys/keys-contoller.js';
import { verifyUserToken } from '../middleware/verify-user-token.js';

const router = Router();

router.patch('/', verifyUserToken, regenerateKey);
router.delete('/', verifyUserToken, deleteKey);

export default router;
