/* eslint-disable no-underscore-dangle */
import { DBClientDeliveryNote } from '../model';

const addClientDeliveryNote = (
  clientDeliveryNote,
  errorCallback,
  resultCallback
) => {
  const dbClientDeliveryNote = new DBClientDeliveryNote(clientDeliveryNote);
  dbClientDeliveryNote.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchClientDeliveryNotes = (errorCallback, resultCallback) => {
  return DBClientDeliveryNote.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateClientDeliveryNote = (
  clientDeliveryNote,
  errorCallback,
  resultCallback
) => {
  const query = { _id: clientDeliveryNote._id };
  return DBClientDeliveryNote.findOneAndUpdate(
    query,
    clientDeliveryNote,
    (err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    }
  );
};

const deleteClientDeliveryNotes = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBClientDeliveryNote.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export {
  addClientDeliveryNote,
  fetchClientDeliveryNotes,
  updateClientDeliveryNote,
  deleteClientDeliveryNotes,
};
