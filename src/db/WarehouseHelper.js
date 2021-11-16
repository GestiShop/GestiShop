/* eslint-disable no-underscore-dangle */
import { Warehouse } from './model/Warehouse';

const addWarehouse = (warehouse, errorCallback, resultCallback) => {
  const dbWarehouse = new Warehouse(warehouse);
  dbWarehouse.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchWarehouses = (errorCallback, resultCallback) => {
  return Warehouse.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateWarehouse = (warehouse, errorCallback, resultCallback) => {
  const query = { _id: warehouse._id };
  return Warehouse.findOneAndUpdate(query, warehouse, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteWarehouses = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return Warehouse.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addWarehouse, fetchWarehouses, updateWarehouse, deleteWarehouses };
