/* eslint-disable no-underscore-dangle */
import { Client } from '../model/ClientModel';

const addClient = (client, errorCallback, resultCallback) => {
  const dbClient = new Client(client);
  dbClient.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchClients = (errorCallback, resultCallback) => {
  return Client.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const fetchClientsWithBills = (errorCallback, resultCallback) => {
  return Client.find({})
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
  return Client.findOneAndUpdate(query, client, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const addBill = (clientId, billId, errorCallback, resultCallback) => {
  return Client.findOneAndUpdate(
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
  return Client.findOneAndUpdate(
    { _id: clientId },
    { $pullAll: { bills: billId } },
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
  return Client.deleteMany(query, (err) => {
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
