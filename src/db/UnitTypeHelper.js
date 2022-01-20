/* eslint-disable no-underscore-dangle */
import { DBUnitType } from '../model/types';

const addUnitType = (unitType, errorCallback, resultCallback) => {
  const dbUnitType = new DBUnitType(unitType);
  dbUnitType.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchUnitTypes = (errorCallback, resultCallback) => {
  return DBUnitType.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateUnitType = (unitType, errorCallback, resultCallback) => {
  const query = { _id: unitType._id };
  return DBUnitType.findOneAndUpdate(query, unitType, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteUnitTypes = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBUnitType.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addUnitType, fetchUnitTypes, updateUnitType, deleteUnitTypes };
