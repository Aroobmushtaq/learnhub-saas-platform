import exspress from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = exspress.Router();
router.get('/profile',protect,(req,res)=>{
    res.json({message:`Welcome ${req.user.name}`,user:req.user});
})
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router