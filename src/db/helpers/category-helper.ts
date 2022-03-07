/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  Category,
  DBCategory,
  DBHelperResponse,
  decodeCategory,
} from '../../model';

export const upsertCategory = (
  category: Category
): Promise<DBHelperResponse<boolean>> => {
  let queryPromise;
  if (category.id == null) {
    // Insert
    const dbCategory = new DBCategory(category);
    queryPromise = dbCategory.save();
  } else {
    // Update
    queryPromise = DBCategory.findOneAndUpdate(
      { _id: category.id },
      category
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

export const fetchCategories = (): Promise<
  DBHelperResponse<Array<Category>>
> => {
  return DBCategory.find({})
    .exec()
    .then((data: any) => {
      const categoryList: Array<Category> = data.map((x: any) =>
        decodeCategory(x)
      );

      return {
        error: null,
        result: categoryList,
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

export const fetchCategoryById = (
  id: Types.ObjectId
): Promise<DBHelperResponse<Category>> => {
  return DBCategory.findById(id)
    .exec()
    .then((data: any) => {
      const category: Category = decodeCategory(data);

      return {
        error: null,
        result: category,
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

export const deleteCategories = (
  categoryIds: Array<Types.ObjectId>
): Promise<DBHelperResponse<boolean>> => {
  return DBCategory.deleteMany({ _id: categoryIds })
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
