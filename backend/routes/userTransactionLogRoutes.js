import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import {
	getUserTransactions,
	getUserTransactionById,
	createUserTransaction,
	deleteUserTransaction,
	editUserTransaction,
} from '../controllers/transactionLogController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getUserTransactions).post(protect, createUserTransaction);
router
	.route('/:transactionId')
	.get(protect, getUserTransactionById)
	.delete(protect, deleteUserTransaction)
	.patch(protect, editUserTransaction);

export default router;
