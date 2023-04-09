import mongoose from 'mongoose';

const transactionLogSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	transactionType: {
		type: String,
		required: true,
	},
	transactionAmount: {
		type: Number,
		required: true,
	},
});

const TransactionLog = mongoose.model('TransactionLog', transactionLogSchema);
export default TransactionLog;
