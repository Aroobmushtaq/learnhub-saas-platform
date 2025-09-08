import exspress from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = exspress.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router