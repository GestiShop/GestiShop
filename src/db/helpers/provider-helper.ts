import { mongo, Types } from 'mongoose';
import {
  DBHelperResponse,
  DBProvider,
  decodeProvider,
  Provider,
} from '../../model';

export const upsertProvider = (
  provider: Provider
): Promise<DBHelperResponse<boolean>> => {
  return DBProvider.findByIdAndUpdate(
    provider.id ?? new mongo.ObjectId(), //
    provider,
    {
      new: true,
      upsert: true,
      useFindAndModify: false,
    }
  )
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

export const fetchProviders = (): Promise<
  DBHelperResponse<Array<Provider>>
> => {
  return DBProvider.find({})
    .exec()
    .then((data: any) => {
      const providerList: Array<Provider> = data.map(decodeProvider);
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

export const fetchProviderById = (
  id: Types.ObjectId
): Promise<DBHelperResponse<Provider>> => {
  return DBProvider.findById(id)
    .exec()
    .then((data: any) => {
      const provider: Provider = decodeProvider(data);

      return {
        error: null,
        result: provider,
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
