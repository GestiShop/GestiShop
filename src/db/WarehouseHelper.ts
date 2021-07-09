/* eslint-disable no-underscore-dangle */
import { Warehouse } from '../model/WarehouseModel';

const addWarehouse = (
  warehouse: any,
  errorCallback: (arg0: any) => void,
  resultCallback: () => void
) => {
  const dbWarehouse = new Warehouse(warehouse);
  dbWarehouse.save((err: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchWarehouses = (
  errorCallback: (arg0: any) => void,
  resultCallback: (arg0: any) => void
) => {
  return Warehouse.find({}, (err: any, docs: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateWarehouse = (
  warehouse: { _id: any },
  errorCallback: (arg0: any) => void,
  resultCallback: (arg0: any) => void
) => {
  const query = { _id: warehouse._id };
  return Warehouse.findOneAndUpdate(query, warehouse, (err: any, docs: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

export { addWarehouse, fetchWarehouses, updateWarehouse };
