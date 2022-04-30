import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';

let mongo: MongoMemoryServer | undefined;

export const connectDatabase = async () => {
  mongo = await MongoMemoryServer.create();
  const uri: string = mongo.getUri();

  await connect(uri, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    poolSize: 10,
  });
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
