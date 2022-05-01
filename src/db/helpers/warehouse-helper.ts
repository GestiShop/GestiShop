/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  DBHelperResponse,
  DBWarehouse,
  Warehouse,
  decodeWarehouse,
} from '../../model';

export const upsertWarehouse = (
  warehouse: Warehouse
): Promise<DBHelperResponse<boolean>> => {
  return DBWarehouse.findOneAndUpdate(
    warehouse.id !== undefined ? { _id: warehouse.id } : undefined,
    warehouse,
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

export const fetchWarehouseById = (
  id: Types.ObjectId
): Promise<DBHelperResponse<Warehouse>> => {
  return DBWarehouse.findById(id)
    .exec()
    .then((data: any) => {
      const warehouse: Warehouse = decodeWarehouse(data);

      return {
        error: null,
        result: warehouse,
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
