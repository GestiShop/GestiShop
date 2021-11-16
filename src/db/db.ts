/* eslint-disable import/prefer-default-export */
import { connect, Mongoose } from 'mongoose';
import { config } from 'dotenv';

config();

const { DATABASE_URL, DATABASE_PASSWORD } = process.env;

export const connectDb = (): Promise<Mongoose> => {
  if (DATABASE_URL == null || DATABASE_PASSWORD == null) {
    throw new Error('DATABASE_PASSWORD not found');
  }

  return connect(DATABASE_URL.replace('<password>', DATABASE_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
