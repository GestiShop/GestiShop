/* eslint-disable no-underscore-dangle */
import { ClientBill } from '../model/BillModel';

const addClientBill = (clientBill, errorCallback, resultCallback) => {
  const dbClientBill = new ClientBill(clientBill);
  dbClientBill.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchClientBills = (errorCallback, resultCallback) => {
  return ClientBill.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateClientBill = (clientBill, errorCallback, resultCallback) => {
  const query = { _id: clientBill._id };
  return ClientBill.findOneAndUpdate(query, clientBill, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteClientBills = (clientBills, errorCallback, resultCallback) => {
  const query = { _id: clientBills.map((x) => x._id) };
  return ClientBill.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addClientBill, fetchClientBills, updateClientBill, deleteClientBills };
