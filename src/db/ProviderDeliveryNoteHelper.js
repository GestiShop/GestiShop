/* eslint-disable no-underscore-dangle */
import { ProviderDeliveryNote } from '../model/DeliveryNoteModel';

const addProviderDeliveryNote = (
  providerDeliveryNote,
  errorCallback,
  resultCallback
) => {
  const dbProviderDeliveryNote = new ProviderDeliveryNote(providerDeliveryNote);
  dbProviderDeliveryNote.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviderDeliveryNotes = (errorCallback, resultCallback) => {
  return ProviderDeliveryNote.find({}, (err, docs) => {
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
  return ProviderDeliveryNote.findOneAndUpdate(
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
  return ProviderDeliveryNote.deleteMany(query, (err) => {
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
