/* eslint-disable no-underscore-dangle */
import { UnitType } from './model/UnitType';

const addUnitType = (unitType, errorCallback, resultCallback) => {
  const dbUnitType = new UnitType(unitType);
  dbUnitType.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchUnitTypes = (errorCallback, resultCallback) => {
  return UnitType.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateUnitType = (unitType, errorCallback, resultCallback) => {
  const query = { _id: unitType._id };
  return UnitType.findOneAndUpdate(query, unitType, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteUnitTypes = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return UnitType.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addUnitType, fetchUnitTypes, updateUnitType, deleteUnitTypes };
