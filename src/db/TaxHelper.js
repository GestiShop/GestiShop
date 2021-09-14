/* eslint-disable no-underscore-dangle */
import { Tax } from '../model/TaxModel';

const addTax = (tax, errorCallback, resultCallback) => {
  const dbTax = new Tax(tax);
  dbTax.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchTaxes = (errorCallback, resultCallback) => {
  return Tax.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateTax = (tax, errorCallback, resultCallback) => {
  const query = { _id: tax._id };
  return Tax.findOneAndUpdate(query, tax, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteTaxes = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return Tax.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addTax, fetchTaxes, updateTax, deleteTaxes };
