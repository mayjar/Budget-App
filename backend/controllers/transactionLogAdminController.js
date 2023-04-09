import asyncHandler from 'express-async-handler';
import TransactionLog from '../models/transactionLogModel';

// @desc  Register a new user
// @route POST /api/users/
// @access Public
const getTransactions = asyncHandler(async (req, res) => {
	const transactions = await TransactionLog.find({});
	res.send(transactions);
});

// @desc  Register a new user
// @route POST /api/users/
// @access Public
const getTransactionById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const transaction = await TransactionLog.findById(id);

	if (transaction) {
		res.status(200).json(transaction);
	} else {
		res.status(400);
		throw new Error('Invalid ID');
	}
});

// @desc  Register a new user
// @route POST /api/users/
// @access Public
const createTransaction = asyncHandler(async (req, res) => {
	const { description, date, category, transactionType, transactionAmount } = req.body;

	const log = await TransactionLog.create({
		description,
		date,
		category,
		transactionType,
		transactionAmount,
	});

	if (log) {
		res.status(201).json({
			desc: log.description,
			date: log.date,
			category: log.category,
			type: log.transactionType,
			amount: log.transactionAmount,
		});
	} else {
		res.status(400);
		throw new Error('Invalid log data');
	}
});

// @desc  Register a new user
// @route POST /api/users/
// @access Public
const deleteTransaction = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const transaction = await TransactionLog.deleteOne({ _id: id });

	if (transaction.deletedCount !== 0) {
		res.status(200).json(transaction);
	} else {
		res.status(400);
		throw new Error('Invalid ID');
	}
});

// @desc  Register a new user
// @route POST /api/users/
// @access Public
const editTransaction = asyncHandler(async (req, res) => {
	const { description, date, category, transactionType, transactionAmount } = req.body;
	const { id } = req.params;

	const transaction = await TransactionLog.findById(id);

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
		throw new Error('Invalid ID');
	}
});

export {
	getTransactions,
	getTransactionById,
	createTransaction,
	deleteTransaction,
	editTransaction,
};
