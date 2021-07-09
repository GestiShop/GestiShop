import { Product } from '../model/ProductModel';

const addProduct = (
  product: any,
  errorCallback: (arg0: any) => void,
  resultCallback: () => void
) => {
  const dbProduct = new Product(product);
  dbProduct.save((err: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProducts = (
  errorCallback: (arg0: any) => void,
  resultCallback: (arg0: any) => void
) => {
  return Product.find({}, (err: any, docs: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

export { addProduct, fetchProducts };
