import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = async (mongoDatabaseURI = process.env.MONGO_URI,
): Promise<typeof mongoose | any> => mongoose
  .connect(mongoDatabaseURI as string)
  .catch(error => {
    console.error(error);
  });

mongoose.connection.on('error', err => {
  console.error(err);
});

export default connectToDatabase;
