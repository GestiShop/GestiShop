import { mongo, Types } from 'mongoose';
import {
  DBHelperResponse,
  DBUnitType,
  UnitType,
  decodeUnitType,
} from '../../model';

export const upsertUnitType = (
  unitType: UnitType
): Promise<DBHelperResponse<boolean>> => {
  return DBUnitType.findByIdAndUpdate(
    unitType.id ?? new mongo.ObjectId(), //
    unitType,
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

export const fetchUnitTypes = (): Promise<
  DBHelperResponse<Array<UnitType>>
> => {
  return DBUnitType.find({})
    .exec()
    .then((data: any) => {
      const unitTypeList: Array<UnitType> = data.map((x: any) =>
        decodeUnitType(x)
      );

      return {
        error: null,
        result: unitTypeList,
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

export const fetchUnitTypeById = (
  id: Types.ObjectId
): Promise<DBHelperResponse<UnitType>> => {
  return DBUnitType.findById(id)
    .exec()
    .then((data: any) => {
      const unitType: UnitType = decodeUnitType(data);

      return {
        error: null,
        result: unitType,
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

export const deleteUnitTypes = (
  unitTypeIds: Array<Types.ObjectId>
): Promise<DBHelperResponse<boolean>> => {
  return DBUnitType.deleteMany({ _id: unitTypeIds })
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
