import mongoose from 'mongoose';

/**
 * Connect to the MongoDb instance
 * @returns Promise
 */
const connectDb = () => {
	return mongoose.connect(process.env.GROUPIVE_FILESERVER_DB_URL, {useNewUrlParser: true, autoIndex: false});
};

mongoose.connection.on('connected', () => {
	if (process.env.NODE_ENV === 'development') {
		console.log('MongoDB is connected!');
		// turn on mongoose console debugger
		mongoose.set('debug', true);
	}
	mongoose.set('useFindAndModify', false);
	mongoose.set('useNewUrlParser', true);
});

export {connectDb};