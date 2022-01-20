/* eslint-disable no-underscore-dangle */
import { DBClient } from '../model/types';

const addClient = (client, errorCallback, resultCallback) => {
  const dbClient = new DBClient(client);
  dbClient.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchClients = (errorCallback, resultCallback) => {
  return DBClient.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const fetchClientsWithBills = (errorCallback, resultCallback) => {
  return DBClient.find({})
    .populate('bills')
    .exec((err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    });
};

const updateClient = (client, errorCallback, resultCallback) => {
  const query = { _id: client._id };
  return DBClient.findOneAndUpdate(query, client, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const addBill = (clientId, billId, errorCallback, resultCallback) => {
  return DBClient.findOneAndUpdate(
    { _id: clientId },
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

const removeBill = (clientId, billId, errorCallback, resultCallback) => {
  return DBClient.findOneAndUpdate(
    { _id: clientId },
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

const deleteClients = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBClient.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export {
  addClient,
  fetchClients,
  fetchClientsWithBills,
  updateClient,
  deleteClients,
  addBill,
  removeBill,
};
