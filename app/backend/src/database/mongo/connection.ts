import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = async (
  mongoDatabaseURI = process.env.MONGO_URI || '',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
