/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  DBHelperResponse,
  DBProduct,
  Product,
  decodeFullProduct,
} from '../../model';

export const upsertProduct = (
  product: Product
): Promise<DBHelperResponse<boolean>> => {
  let queryPromise;
  if (product.id == null) {
    // Insert
    const dbProduct = new DBProduct(product);
    queryPromise = dbProduct.save();
  } else {
    // Update
    queryPromise = DBProduct.findOneAndUpdate(
      { _id: product.id },
      product
    ).exec();
  }

  return queryPromise
    .then((_: any) => {
      return {
        error: null,
        result: true,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const fetchFullProducts = (): Promise<
  DBHelperResponse<Array<Product>>
> => {
  return DBProduct.find({})
    .populate('buyingInfo.taxPercentage')
    .populate('sellingInfo.taxPercentage')
    .populate('unitType')
    .populate('warehouse')
    .populate('categories')
    .exec()
    .then((data: any) => {
      const productList: Array<Product> = data.map((x: any) =>
        decodeFullProduct(x)
      );

      return {
        error: null,
        result: productList,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const deleteProducts = (
  productIds: Array<Types.ObjectId>
): Promise<DBHelperResponse<boolean>> => {
  return DBProduct.deleteMany({ _id: productIds })
    .exec()
    .then((_: any) => {
      return {
        error: null,
        result: true,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const updateStock = (
  id: Types.ObjectId,
  quantity: number,
  updateType: 'inc' | 'dec'
): Promise<DBHelperResponse<boolean>> => {
  return DBProduct.findOneAndUpdate(
    { _id: id },
    { $inc: { stock: quantity * (updateType === 'dec' ? -1 : 1) } }
  )
    .exec()
    .then((_: any) => {
      return {
        error: null,
        result: true,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};
