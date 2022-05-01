import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection } from 'mongoose';
import { connectDb } from '../../../src/db';

let mongo: MongoMemoryServer | undefined;

export const connectDatabase = async () => {
  mongo = await MongoMemoryServer.create();
  await connectDb(mongo.getUri());
};

export const closeDatabase = async () => {
  await connection.dropDatabase();
  await connection.close();
  await mongo?.stop();
};

export const clearDatabase = async () => {
  for (const key in connection.collections) {
    await connection.collections[key]?.deleteMany({});
  }
};
