/* eslint-disable no-underscore-dangle */
import { DBClientBudget } from '../model/types';

const addClientBudget = (clientBudget, errorCallback, resultCallback) => {
  const dbClientBudget = new DBClientBudget(clientBudget);
  dbClientBudget.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchClientBudgets = (errorCallback, resultCallback) => {
  return DBClientBudget.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateClientBudget = (clientBudget, errorCallback, resultCallback) => {
  const query = { _id: clientBudget._id };
  return DBClientBudget.findOneAndUpdate(query, clientBudget, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteClientBudgets = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBClientBudget.deleteMany(query, (err) => {
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
