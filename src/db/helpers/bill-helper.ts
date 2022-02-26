/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  DBHelperResponse,
  DBClientBill,
  DBProviderBill,
  Bill,
} from '../../model/types';
import { decodeBill } from '../../model/decoders';

// TODO: FINISH LOGIC
export const upsertBill = (
  bill: Bill,
  billType: 'client' | 'provider'
): Promise<DBHelperResponse<boolean>> => {
  const DBEntity = billType === 'provider' ? DBProviderBill : DBClientBill;
  let queryPromise;

  if (bill.id == null) {
    // Insert
    const dbEntity = new DBEntity(bill);
    queryPromise = dbEntity.save();
  } else {
    // Update
    queryPromise = DBEntity.findOneAndUpdate({ _id: bill.id }, bill).exec();
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

export const fetchBills = (
  billType: 'client' | 'provider'
): Promise<DBHelperResponse<Array<Bill>>> => {
  const DBEntity = billType === 'provider' ? DBProviderBill : DBClientBill;

  return DBEntity.find({})
    .exec()
    .then((data: any) => {
      const providerList: Array<Bill> = data.map((x: any) => decodeBill(x));

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

// TODO: FINISH LOGIC
export const deleteBills = (
  billIds: Array<Types.ObjectId>,
  billType: 'client' | 'provider'
): Promise<DBHelperResponse<boolean>> => {
  const DBEntity = billType === 'provider' ? DBProviderBill : DBClientBill;

  return DBEntity.deleteMany({ _id: billIds })
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
