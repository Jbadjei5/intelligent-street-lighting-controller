import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { signup, login, me, googleLogin } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Slow down brute-force attempts against login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});

router.post('/signup', signup);
router.post('/login', loginLimiter, login);
router.post('/google', googleLogin);
router.get('/me', requireAuth, me);

export default router;
