/* eslint-disable no-underscore-dangle */
import { DBProviderBudget } from '../model/types';

const addProviderBudget = (providerBudget, errorCallback, resultCallback) => {
  const dbProviderBudget = new DBProviderBudget(providerBudget);
  dbProviderBudget.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviderBudgets = (errorCallback, resultCallback) => {
  return DBProviderBudget.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateProviderBudget = (
  providerBudget,
  errorCallback,
  resultCallback
) => {
  const query = { _id: providerBudget._id };
  return DBProviderBudget.findOneAndUpdate(
    query,
    providerBudget,
    (err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    }
  );
};

const deleteProviderBudgets = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBProviderBudget.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export {
  addProviderBudget,
  fetchProviderBudgets,
  updateProviderBudget,
  deleteProviderBudgets,
};
