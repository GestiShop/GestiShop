/* eslint-disable prefer-destructuring */
import { connect, Mongoose } from 'mongoose';
import { PlatformDatabaseInfo } from '../model';
import LocalConfiguration from '../utils/local-configuration';

export const connectDb = (databaseUrl?: string): Promise<Mongoose> => {
  const localDatabaseInfo: PlatformDatabaseInfo =
    LocalConfiguration.getLocalDatabaseInfo();

  const url: string =
    databaseUrl ??
    (localDatabaseInfo.isRemote
      ? `mongodb+srv://${localDatabaseInfo.user}:${localDatabaseInfo.password}@${localDatabaseInfo.url}/${localDatabaseInfo.name}?retryWrites=true&w=majority`
      : `mongodb://${localDatabaseInfo.user}:${localDatabaseInfo.password}@${localDatabaseInfo.url}:${localDatabaseInfo.port}/${localDatabaseInfo.name}?retryWrites=true&w=majority`);

  return connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
