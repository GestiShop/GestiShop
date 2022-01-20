/* eslint-disable no-underscore-dangle */
import { DBWarehouse } from '../model/types';

const addWarehouse = (warehouse, errorCallback, resultCallback) => {
  const dbWarehouse = new DBWarehouse(warehouse);
  dbWarehouse.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchWarehouses = (errorCallback, resultCallback) => {
  return DBWarehouse.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateWarehouse = (warehouse, errorCallback, resultCallback) => {
  const query = { _id: warehouse._id };
  return DBWarehouse.findOneAndUpdate(query, warehouse, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteWarehouses = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBWarehouse.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addWarehouse, fetchWarehouses, updateWarehouse, deleteWarehouses };
