import express from 'express';
import { authUser, registerUser } from '../controllers/userAuthController.js';
import {
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userManagerController.js';
import {
	getUserProfile,
	updateUserProfile,
} from '../controllers/userProfileController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import userTransactionRoutes from './userTransactionLogRoutes.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser);

router.use('/:id/transactions', userTransactionRoutes);

export default router;
