import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (e) {
		console.error(`Err: ${e}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDB;
