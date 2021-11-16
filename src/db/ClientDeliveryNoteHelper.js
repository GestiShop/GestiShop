/* eslint-disable no-underscore-dangle */
import { ClientDeliveryNote } from './mongoose-model/DeliveryNote';

const addClientDeliveryNote = (
  clientDeliveryNote,
  errorCallback,
  resultCallback
) => {
  const dbClientDeliveryNote = new ClientDeliveryNote(clientDeliveryNote);
  dbClientDeliveryNote.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchClientDeliveryNotes = (errorCallback, resultCallback) => {
  return ClientDeliveryNote.find({}, (err, docs) => {
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
  return ClientDeliveryNote.findOneAndUpdate(
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
  return ClientDeliveryNote.deleteMany(query, (err) => {
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
