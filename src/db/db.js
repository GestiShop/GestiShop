/* eslint-disable import/prefer-default-export */
import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const DATABASE_URL = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : new Error('DATABASE_URL not found');
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
  ? process.env.DATABASE_PASSWORD
  : new Error('DATABASE_PASSWORD not found');

const connectDb = () => {
  return connect(DATABASE_URL.replace('<password>', DATABASE_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export { connectDb };
