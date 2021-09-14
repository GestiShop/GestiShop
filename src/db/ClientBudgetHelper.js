/* eslint-disable no-underscore-dangle */
import { ClientBudget } from '../model/BudgetModel';

const addClientBudget = (clientBudget, errorCallback, resultCallback) => {
  const dbClientBudget = new ClientBudget(clientBudget);
  dbClientBudget.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchClientBudgets = (errorCallback, resultCallback) => {
  return ClientBudget.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateClientBudget = (clientBudget, errorCallback, resultCallback) => {
  const query = { _id: clientBudget._id };
  return ClientBudget.findOneAndUpdate(query, clientBudget, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteClientBudgets = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return ClientBudget.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export {
  addClientBudget,
  fetchClientBudgets,
  updateClientBudget,
  deleteClientBudgets,
};
