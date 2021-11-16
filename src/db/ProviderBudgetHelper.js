/* eslint-disable no-underscore-dangle */
import { ProviderBudget } from './model/Budget';

const addProviderBudget = (providerBudget, errorCallback, resultCallback) => {
  const dbProviderBudget = new ProviderBudget(providerBudget);
  dbProviderBudget.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviderBudgets = (errorCallback, resultCallback) => {
  return ProviderBudget.find({}, (err, docs) => {
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
  return ProviderBudget.findOneAndUpdate(query, providerBudget, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteProviderBudgets = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return ProviderBudget.deleteMany(query, (err) => {
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
