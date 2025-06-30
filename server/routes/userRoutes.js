import express from 'express';
import { getUserDashboard, getUserById, updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, getUserDashboard);
router.get('/test', (req, res) => res.json({ message: "User routes working!" }));


router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

export default router;
