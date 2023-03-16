import 'dotenv/config';
import app from './app';
import connectToDatabase from '../database/mongo/connection';

const PORT = process.env.API_PORT ?? '';
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => { console.log(`Running server on port: ${PORT}`); });
  })
  .catch((e) => {
    console.log(e);
    process.exit(0);
  });
