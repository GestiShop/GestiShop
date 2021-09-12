/* eslint-disable no-underscore-dangle */
import { Product } from '../model/ProductModel';

const addProduct = (product, errorCallback, resultCallback) => {
  const dbProduct = new Product(product);
  dbProduct.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProducts = (errorCallback, resultCallback) => {
  return Product.find({})
    .populate('buyingInfo.taxPercentage')
    .populate('sellingInfo.taxPercentage')
    .populate('unitType')
    .populate('warehouse')
    .populate('categories')
    .exec((err, docs) => {
      if (err) {
        errorCallback(err);
      } else {
        resultCallback(docs);
      }
    });
};

const updateProduct = (product, errorCallback, resultCallback) => {
  const query = { _id: product._id };
  return Product.findOneAndUpdate(query, product, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteProducts = (ids, errorCallback, resultCallback) => {
  const query = { _id: ids };
  return Product.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const incrementStock = (id, quantity, errorCallback, resultCallback) => {
  const query = { _id: id };
  const incrementQuery = { $inc: { stock: quantity } };
  return Product.findOneAndUpdate(query, incrementQuery, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const decrementStock = (id, quantity, errorCallback, resultCallback) => {
  const query = { _id: id };
  const incrementQuery = { $inc: { stock: -1 * quantity } };
  return Product.findOneAndUpdate(query, incrementQuery, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

export {
  addProduct,
  fetchProducts,
  updateProduct,
  deleteProducts,
  incrementStock,
  decrementStock,
};
