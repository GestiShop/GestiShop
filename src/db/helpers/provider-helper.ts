/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  DBHelperResponse,
  DBProvider,
  Provider,
  FullProvider,
} from '../../model/types';
import { decodeFullProvider, decodeProvider } from '../../model/decoders';

export const upsertProvider = (
  provider: Provider
): Promise<DBHelperResponse<boolean>> => {
  let queryPromise;
  if (provider.id == null) {
    // Insert
    const dbProvider = new DBProvider(provider);
    queryPromise = dbProvider.save();
  } else {
    // Update
    queryPromise = DBProvider.findOneAndUpdate(
      { _id: provider.id },
      provider
    ).exec();
  }

  return queryPromise
    .then((_: any) => {
      return {
        error: null,
        result: true,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const fetchProviders = (): Promise<
  DBHelperResponse<Array<Provider>>
> => {
  return DBProvider.find({})
    .exec()
    .then((data: any) => {
      const providerList: Array<Provider> = data.map((x: any) =>
        decodeProvider(x)
      );

      return {
        error: null,
        result: providerList,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const fetchFullProviders = (): Promise<
  DBHelperResponse<Array<FullProvider>>
> => {
  return DBProvider.find({})
    .populate('bills')
    .exec()
    .then((data: any) => {
      const providerList: Array<FullProvider> = data.map((x: any) =>
        decodeFullProvider(x)
      );

      return {
        error: null,
        result: providerList,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const deleteProviders = (
  providerIds: Array<Types.ObjectId>
): Promise<DBHelperResponse<boolean>> => {
  return DBProvider.deleteMany({ _id: providerIds })
    .exec()
    .then((_: any) => {
      return {
        error: null,
        result: true,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};
