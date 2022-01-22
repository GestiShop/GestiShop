/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import { DBHelperResponse, DBUnitType, UnitType } from '../../model/types';
import { decodeUnitType } from '../../model/decoders';

export const upsertUnitType = (
  unitType: UnitType
): Promise<DBHelperResponse<boolean>> => {
  let queryPromise;
  if (unitType.id == null) {
    // Insert
    const dbUnitType = new DBUnitType(unitType);
    queryPromise = dbUnitType.save();
  } else {
    // Update
    queryPromise = DBUnitType.findOneAndUpdate(
      { _id: unitType.id },
      unitType
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
          message: error,
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
          message: error,
        },
        result: null,
      };
    });
};
