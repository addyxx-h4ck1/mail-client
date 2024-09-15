import { Router } from 'express';
import { registerUser } from '../controllers/register.js';
import { handleOauthcallback } from '../controllers/oauthcallback.js';
import { testHandler } from '../controllers/test.js';
import { handleDomainMail } from '../controllers/domain-mail.js';
import { verifyUserToken } from '../middleware/verify-user-token.js';
import { GmailAPIController } from '../controllers/gmail/gmail-mail.js';
import { checkAPIKeyValidity } from '../middleware/api-key-verify.js';
import { validateMailBody } from '../middleware/validate-body.js';
const router = Router();

router.post('/domain', handleDomainMail);
router.post(
  '/api/v1/gmail',
  checkAPIKeyValidity,
  validateMailBody,
  GmailAPIController
);
router.get('/register', registerUser);
router.post('/i/gmail', verifyUserToken, handleOauthcallback);
router.get('/test', testHandler);

export default router;
