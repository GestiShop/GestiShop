/* eslint-disable no-underscore-dangle */
import { Provider } from './model/Provider';

const addProvider = (provider, errorCallback, resultCallback) => {
  const dbProvider = new Provider(provider);
  dbProvider.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviders = (errorCallback, resultCallback) => {
  return Provider.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const fetchProvidersWithBills = (errorCallback, resultCallback) => {
  return Provider.find({})
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
  return Provider.findOneAndUpdate(query, provider, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const addBill = (providerId, billId, errorCallback, resultCallback) => {
  return Provider.findOneAndUpdate(
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
  return Provider.findOneAndUpdate(
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
  return Provider.deleteMany(query, (err) => {
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
