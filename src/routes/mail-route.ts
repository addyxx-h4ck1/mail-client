import { Router } from 'express';
import { mailController } from '../controllers/mail-controller.js';
import { registerUser } from '../controllers/register.js';
import { handleOauthcallback } from '../controllers/oauthcallback.js';
import { testHandler } from '../controllers/test.js';
import { handleDomainMail } from '../controllers/domain-mail.js';
const router = Router();

router.post('/mail', mailController);
router.post('/domain', handleDomainMail);
router.get('/register', registerUser);
router.get('/', handleOauthcallback);
router.get('/test', testHandler);

export default router;
