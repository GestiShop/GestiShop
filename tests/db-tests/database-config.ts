import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';

let mongo: MongoMemoryServer | undefined;

export const connectDatabase = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    poolSize: 10,
  };

  await connect(uri, mongooseOpts);
};

export const closeDatabase = async () => {
  await connection.dropDatabase();
  await connection.close();
  await mongo?.stop();
};

export const clearDatabase = async () => {
  const collections = connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection?.deleteMany({});
  }
};
