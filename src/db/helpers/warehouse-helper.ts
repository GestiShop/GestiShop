/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import { DBHelperResponse, DBWarehouse, Warehouse } from '../../model/types';
import { decodeWarehouse } from '../../model/decoders';

export const upsertWarehouse = (
  warehouse: Warehouse
): Promise<DBHelperResponse<boolean>> => {
  let queryPromise;
  if (warehouse.id == null) {
    // Insert
    const dbWarehouse = new DBWarehouse(warehouse);
    queryPromise = dbWarehouse.save();
  } else {
    // Update
    queryPromise = DBWarehouse.findOneAndUpdate(
      { _id: warehouse.id },
      warehouse
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

export const fetchWarehouses = (): Promise<
  DBHelperResponse<Array<Warehouse>>
> => {
  return DBWarehouse.find({})
    .exec()
    .then((data: any) => {
      const warehouseList: Array<Warehouse> = data.map((x: any) =>
        decodeWarehouse(x)
      );

      return {
        error: null,
        result: warehouseList,
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

export const deleteWarehouses = (
  warehouseIds: Array<Types.ObjectId>
): Promise<DBHelperResponse<boolean>> => {
  return DBWarehouse.deleteMany({ _id: warehouseIds })
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
