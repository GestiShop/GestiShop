import { mongo, Types } from 'mongoose';
import { decodeTax, DBHelperResponse, DBTax, Tax } from '../../model';

export const upsertTax = (tax: Tax): Promise<DBHelperResponse<boolean>> => {
  return DBTax.findByIdAndUpdate(
    tax.id ?? new mongo.ObjectId(), //
    tax,
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
          message: error.toString(),
        },
        result: null,
      };
    });
};

export const fetchTaxById = (
  id: Types.ObjectId
): Promise<DBHelperResponse<Tax>> => {
  return DBTax.findById(id)
    .exec()
    .then((data: any) => {
      const tax: Tax = decodeTax(data);

      return {
        error: null,
        result: tax,
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
          message: error.toString(),
        },
        result: null,
      };
    });
};
