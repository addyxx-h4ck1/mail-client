import { Router } from 'express';
import { mailController } from '../controllers/mail-controller';
import { registerUser } from '../controllers/register';
import { handleOauthcallback } from '../controllers/oauthcallback';
import { testHandler } from '../controllers/test';
const router = Router();

router.post('/mail', mailController);
router.get('/register', registerUser);
router.get('/', handleOauthcallback);
router.get('/test', testHandler)

export default router;
