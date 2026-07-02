import { Router } from 'express';
import { loginController, logoutController, registerController, getMeController } from './auth.controller';
import { authenticate } from '../../middlewares/auth';


const router = Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/logout', logoutController)
router.get('/me', authenticate, getMeController)


export default router