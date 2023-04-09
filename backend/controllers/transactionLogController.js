import asyncHandler from 'express-async-handler';
import TransactionLog from '../models/transactionLogModel.js';

// @desc  Get all transactions of logged in user
// @route GET /api/users/:id/transactions
// @access Private
const getUserTransactions = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const transactions =
		id == req.user._id
			? await TransactionLog.find({ user: { _id: req.user._id } })
			: undefined;

	if (transactions) {
		res.status(200).send(transactions);
	} else {
		res.status(400);
		if (id != req.user._id) {
			throw new Error('Invalid User');
		} else {
			//soft catch - no reason for this error to show up
			throw new Error('Err: ref#1');
		}
	}
});

// @desc  Get a single transaction of logged in user
// @route GET /api/users/:id/transactions/:transactionId
// @access Private
const getUserTransactionById = asyncHandler(async (req, res) => {
	const { id, transactionId } = req.params;

	const transaction =
		id == req.user._id
			? await TransactionLog.findOne({ _id: transactionId, user: req.user._id })
			: undefined;

	if (transaction) {
		res.status(200).send(transaction);
	} else {
		res.status(400);
		if (id != req.user._id) {
			throw new Error('Invalid User');
		} else {
			throw new Error('Invalid Transaction ID');
		}
	}
});

// @desc Create a transaction log to logged in user profile
// @route POST /api/users/:id/transactions
// @access Private
const createUserTransaction = asyncHandler(async (req, res) => {
	const { description, date, category, transactionType, transactionAmount } = req.body;

	const log = await TransactionLog.create({
		user: req.user._id,
		description,
		date,
		category,
		transactionType,
		transactionAmount,
	});

	if (log) {
		res.status(201).send(log);
	} else {
		res.status(400);
		throw new Error('Invalid log data');
	}
});

// @desc  Delete a transaction log from logged in user profile
// @route DELETE /api/users/:id/transactions/:transactionId
// @access Private
const deleteUserTransaction = asyncHandler(async (req, res) => {
	const { id, transactionId } = req.params;
	console.log(id, req.user._id);
	const transaction =
		id == req.user._id
			? await TransactionLog.deleteOne({
					_id: transactionId,
					user: req.user._id,
			  })
			: undefined;

	if (transaction && transaction.deletedCount === 1) {
		res.status(200).send(transaction);
	} else {
		res.status(400);
		if (id != req.user._id) {
			throw new Error('Invalid User');
		} else {
			throw new Error('Invalid Transaction ID');
		}
	}
});

// @desc  Edit a logged in user single transaction
// @route PATCH /api/users/:id/transactions/:transactionId
// @access Private
const editUserTransaction = asyncHandler(async (req, res) => {
	const { description, date, category, transactionType, transactionAmount } = req.body;
	const { id, transactionId } = req.params;

	const transaction =
		id == req.user._id
			? await TransactionLog.findOne({ _id: transactionId, user: req.user._id })
			: undefined;

	if (transaction) {
		transaction.description = description || transaction.description;
		transaction.date = date || transaction.date;
		transaction.category = category || transaction.category;
		transaction.transactionType = transactionType || transaction.transactionType;
		transaction.transactionAmount = transactionAmount || transaction.transactionAmount;

		await transaction.save();

		res.status(200).json(transaction);
	} else {
		res.status(400);
		if (id != req.user._id) {
			throw new Error('Invalid User');
		} else {
			throw new Error('Invalid Transaction ID');
		}
	}
});

export {
	getUserTransactions,
	getUserTransactionById,
	createUserTransaction,
	deleteUserTransaction,
	editUserTransaction,
};
