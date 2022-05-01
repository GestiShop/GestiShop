import { Types } from 'mongoose';
import {
  DBHelperResponse,
  DBProduct,
  decodeFullProduct,
  decodeProduct,
  FullProduct,
  Product,
} from '../../model';

export const upsertProduct = (
  product: Product
): Promise<DBHelperResponse<boolean>> => {
  return DBProduct.findOneAndUpdate(
    product.id !== undefined ? { _id: product.id } : product,
    product,
    {
      new: true,
      upsert: true,
      useFindAndModify: false,
    }
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

export const fetchFullProducts = (): Promise<
  DBHelperResponse<Array<FullProduct>>
> => {
  return DBProduct.find({})
    .populate('buyingInfo.taxPercentage')
    .populate('sellingInfo.taxPercentage')
    .populate('unitType')
    .populate('warehouse')
    .populate('categories')
    .exec()
    .then((data: any) => {
      const productList: Array<FullProduct> = data.map(decodeFullProduct);

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

export const fetchProductById = (
  id: Types.ObjectId
): Promise<DBHelperResponse<Product>> => {
  return DBProduct.findById(id)
    .exec()
    .then((data: any) => {
      const product: Product = decodeProduct(data);

      return {
        error: null,
        result: product,
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
