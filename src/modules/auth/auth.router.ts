import { Router } from 'express';
import { loginController, logoutController, registerController, getMeController } from './auth.controller';
import { authenticate } from '../../middlewares/auth';
import { loginSchema, registerSchema } from './auth.validation';
import { validateRequest } from '../../middlewares/validate';


const router = Router();

router.post('/register', validateRequest(registerSchema), registerController)
router.post('/login', validateRequest(loginSchema), loginController)
router.post('/logout', logoutController)
router.get('/me', authenticate, getMeController)


export default router