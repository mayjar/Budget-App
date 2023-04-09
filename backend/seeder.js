import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/userModel.js';
import TransactionLog from './models/transactionLogModel.js';
import connectDB from './config/db.js';
import users from './data/users.js';
import transactions from './data/transactions.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		console.log(createdUsers);

		console.log(`Data Imported`.green.inverse);
		process.exit();
	} catch (e) {
		console.error(`${e}`.red.inverse);
		process.exit(1);
	}
};

const importTrans = async () => {
	try {
		await TransactionLog.deleteMany();

		await TransactionLog.insertMany(transactions);
		console.log('Imported transaction log seed data.');

		process.exit();
	} catch (e) {
		console.error(`${e}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await User.deleteMany();

		console.log('Data Destroyed'.red.inverse);
		process.exit();
	} catch (e) {
		console.error(`${e}`.red.inverse);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else if (process.argv[2] === '-c') {
	importTrans();
} else {
	importData();
}
