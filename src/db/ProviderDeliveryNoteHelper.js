/* eslint-disable no-underscore-dangle */
import { DBProviderDeliveryNote } from '../model/types';

const addProviderDeliveryNote = (
  providerDeliveryNote,
  errorCallback,
  resultCallback
) => {
  const dbProviderDeliveryNote = new DBProviderDeliveryNote(
    providerDeliveryNote
  );
  dbProviderDeliveryNote.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviderDeliveryNotes = (errorCallback, resultCallback) => {
  return DBProviderDeliveryNote.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateProviderDeliveryNote = (
  providerDeliveryNote,
  errorCallback,
  resultCallback
) => {
  const query = { _id: providerDeliveryNote._id };
  return DBProviderDeliveryNote.findOneAndUpdate(
    query,
    providerDeliveryNote,
    (err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    }
  );
};

const deleteProviderDeliveryNotes = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBProviderDeliveryNote.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export {
  addProviderDeliveryNote,
  fetchProviderDeliveryNotes,
  updateProviderDeliveryNote,
  deleteProviderDeliveryNotes,
};
