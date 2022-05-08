import { mongo, Types } from 'mongoose';
import { DBHelperResponse, DBClient, Client, decodeClient } from '../../model';

export const upsertClient = (
  client: Client
): Promise<DBHelperResponse<boolean>> => {
  return DBClient.findByIdAndUpdate(
    client.id ?? new mongo.ObjectId(), //
    client,
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
          message: error.toString(),
        },
        result: null,
      };
    });
};

export const fetchClients = (): Promise<DBHelperResponse<Array<Client>>> => {
  return DBClient.find({})
    .exec()
    .then((data: any) => {
      const clientList: Array<Client> = data.map(decodeClient);

      return {
        error: null,
        result: clientList,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error.toString(),
        },
        result: null,
      };
    });
};

export const deleteClients = (
  clientIds: Array<Types.ObjectId>
): Promise<DBHelperResponse<boolean>> => {
  return DBClient.deleteMany({ _id: clientIds })
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
          message: error.toString(),
        },
        result: null,
      };
    });
};

export const fetchClientById = (
  id: Types.ObjectId
): Promise<DBHelperResponse<Client>> => {
  return DBClient.findById(id)
    .exec()
    .then((data: any) => {
      const client: Client = decodeClient(data);

      return {
        error: null,
        result: client,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error.toString(),
        },
        result: null,
      };
    });
};
