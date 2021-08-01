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

const deleteClients = (clients, errorCallback, resultCallback) => {
  const query = { _id: clients.map((x) => x._id) };
  return Client.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addClient, fetchClients, updateClient, deleteClients };
