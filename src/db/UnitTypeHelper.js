import { UnitType } from '../model/UnitTypeModel';

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

export { addUnitType, fetchUnitTypes };
