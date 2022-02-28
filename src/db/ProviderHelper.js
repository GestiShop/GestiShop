/* eslint-disable no-underscore-dangle */
import { DBProvider } from '../model';

const addProvider = (provider, errorCallback, resultCallback) => {
  const dbProvider = new DBProvider(provider);
  dbProvider.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviders = (errorCallback, resultCallback) => {
  return DBProvider.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const fetchProvidersWithBills = (errorCallback, resultCallback) => {
  return DBProvider.find({})
    .populate('bills')
    .exec((err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    });
};

const updateProvider = (provider, errorCallback, resultCallback) => {
  const query = { _id: provider._id };
  return DBProvider.findOneAndUpdate(query, provider, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const addBill = (providerId, billId, errorCallback, resultCallback) => {
  return DBProvider.findOneAndUpdate(
    { _id: providerId },
    { $push: { bills: billId } },
    (err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    }
  );
};

const removeBill = (providerId, billId, errorCallback, resultCallback) => {
  return DBProvider.findOneAndUpdate(
    { _id: providerId },
    { $pullAll: { bills: [billId] } },
    (err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    }
  );
};

const deleteProviders = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBProvider.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export {
  addProvider,
  fetchProviders,
  fetchProvidersWithBills,
  updateProvider,
  deleteProviders,
  addBill,
  removeBill,
};
