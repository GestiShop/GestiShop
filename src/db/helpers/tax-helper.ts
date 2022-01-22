/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import { decodeTax } from '../../model/decoders';
import { DBHelperResponse, DBTax, Tax } from '../../model/types';

export const upsertTax = (tax: Tax): Promise<DBHelperResponse<boolean>> => {
  let queryPromise;
  if (tax.id == null) {
    // Insert
    const dbTax = new DBTax(tax);
    queryPromise = dbTax.save();
  } else {
    // Update
    queryPromise = DBTax.findOneAndUpdate({ _id: tax.id }, tax).exec();
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

export const fetchTaxes = (): Promise<DBHelperResponse<Array<Tax>>> => {
  return DBTax.find({})
    .exec()
    .then((data: any) => {
      const taxList: Array<Tax> = data.map((x: any) => decodeTax(x));

      return {
        error: null,
        result: taxList,
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

export const deleteTaxes = (
  taxIds: Array<Types.ObjectId>
): Promise<DBHelperResponse<boolean>> => {
  return DBTax.deleteMany({ _id: taxIds })
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
