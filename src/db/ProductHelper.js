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
  return Product.find({}, (err, docs) => {
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

const deleteProducts = (products, errorCallback, resultCallback) => {
  const query = { _id: products.map((x) => x._id) };
  return Product.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addProduct, fetchProducts, updateProduct, deleteProducts };
