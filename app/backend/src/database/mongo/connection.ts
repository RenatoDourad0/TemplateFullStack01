import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = async (
  mongoDatabaseURI = process.env.MONGO_URI,
): Promise<typeof mongoose> => mongoose.connect(mongoDatabaseURI as string);

export default connectToDatabase;
