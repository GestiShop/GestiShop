/* eslint-disable no-underscore-dangle */
import { Category } from '../model/CategoryModel';

const addCategory = (category, errorCallback, resultCallback) => {
  const dbCategory = new Category(category);
  dbCategory.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchCategories = (errorCallback, resultCallback) => {
  return Category.find({})
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
  return Category.findOneAndUpdate(query, category, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteCategories = (categories, errorCallback, resultCallback) => {
  const query = { _id: categories.map((x) => x._id) };
  return Category.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addCategory, fetchCategories, updateCategory, deleteCategories };
