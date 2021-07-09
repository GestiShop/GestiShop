import { UnitType } from '../model/UnitTypeModel';

const addUnitType = (
  unitType: any,
  errorCallback: (arg0: any) => void,
  resultCallback: () => void
) => {
  const dbUnitType = new UnitType(unitType);
  dbUnitType.save((err: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchUnitTypes = (
  errorCallback: (arg0: any) => void,
  resultCallback: (arg0: any) => void
) => {
  return UnitType.find({}, (err: any, docs: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

export { addUnitType, fetchUnitTypes };
