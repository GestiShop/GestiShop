/* eslint-disable no-underscore-dangle */
import { DBCategory } from '../model/types';

const addCategory = (category, errorCallback, resultCallback) => {
  const dbCategory = new DBCategory(category);
  dbCategory.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchCategories = (errorCallback, resultCallback) => {
  return DBCategory.find({})
    .populate('parent')
    .exec((err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    });
};

const updateCategory = (category, errorCallback, resultCallback) => {
  const query = { _id: category._id };
  return DBCategory.findOneAndUpdate(query, category, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteCategories = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return DBCategory.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addCategory, fetchCategories, updateCategory, deleteCategories };
