/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import { connect, Mongoose } from 'mongoose';
import { config } from 'dotenv';

config();

const DATABASE_URL: string | undefined = process.env.DATABASE_URL;
const DATABASE_PASSWORD: string | undefined = process.env.DATABASE_PASSWORD;

export const connectDb = (): Promise<Mongoose> => {
  if (DATABASE_URL === undefined) {
    throw new Error('DATABASE_URL not found');
  }

  if (DATABASE_PASSWORD === undefined) {
    throw new Error('DATABASE_PASSWORD not found');
  }

  return connect(DATABASE_URL.replace('<password>', DATABASE_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
