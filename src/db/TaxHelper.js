/* eslint-disable no-underscore-dangle */
import { DBTax } from '../model/types';

const addTax = (tax, errorCallback, resultCallback) => {
  const dbTax = new DBTax(tax);
  dbTax.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchTaxes = (errorCallback, resultCallback) => {
  return DBTax.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateTax = (tax, errorCallback, resultCallback) => {
  const query = { _id: tax._id };
  return DBTax.findOneAndUpdate(query, tax, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteTaxes = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBTax.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addTax, fetchTaxes, updateTax, deleteTaxes };
