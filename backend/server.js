import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';

import mongoose from 'mongoose';

dotenv.config();
mongoose.set('strictQuery', false);
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json()); //allows us to accept JSON requests from req.body

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is running');
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on PORT: ${process.env.PORT}`.yellow
			.bold
	);
});
