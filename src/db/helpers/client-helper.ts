/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  DBHelperResponse,
  DBClient,
  Client,
  FullClient,
  decodeClient,
  decodeFullClient,
} from '../../model';

export const upsertClient = (
  client: Client
): Promise<DBHelperResponse<boolean>> => {
  return DBClient.findOneAndUpdate(
    client.id !== undefined ? { _id: client.id } : client,
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
          message: error,
        },
        result: null,
      };
    });
};

export const fetchClients = (): Promise<DBHelperResponse<Array<Client>>> => {
  return DBClient.find({})
    .exec()
    .then((data: any) => {
      const clientList: Array<Client> = data.map((x: any) => decodeClient(x));

      return {
        error: null,
        result: clientList,
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

export const fetchFullClients = (): Promise<
  DBHelperResponse<Array<FullClient>>
> => {
  return DBClient.find({})
    .populate('bills')
    .exec()
    .then((data: any) => {
      const clientList: Array<FullClient> = data.map((x: any) =>
        decodeFullClient(x)
      );

      return {
        error: null,
        result: clientList,
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

export const addBill = (
  clientId: Types.ObjectId,
  billId: Types.ObjectId
): Promise<DBHelperResponse<boolean>> => {
  return DBClient.findOneAndUpdate(
    { _id: clientId },
    { $push: { bills: billId } }
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

export const removeBill = (
  clientId: Types.ObjectId,
  billId: Types.ObjectId
): Promise<DBHelperResponse<boolean>> => {
  return DBClient.findOneAndUpdate(
    { _id: clientId },
    { $pullAll: { bills: [billId] } }
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
          message: error,
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
          message: error,
        },
        result: null,
      };
    });
};
