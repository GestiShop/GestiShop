/* eslint-disable no-underscore-dangle */
import { ProviderBill } from '../model/BillModel';

const addProviderBill = (providerBill, errorCallback, resultCallback) => {
  const dbProviderBill = new ProviderBill(providerBill);
  dbProviderBill.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviderBills = (errorCallback, resultCallback) => {
  return ProviderBill.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateProviderBill = (providerBill, errorCallback, resultCallback) => {
  const query = { _id: providerBill._id };
  return ProviderBill.findOneAndUpdate(query, providerBill, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteProviderBills = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return ProviderBill.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export {
  addProviderBill,
  fetchProviderBills,
  updateProviderBill,
  deleteProviderBills,
};
