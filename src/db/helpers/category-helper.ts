import { mongo, Types } from 'mongoose';
import {
  Category,
  DBCategory,
  DBHelperResponse,
  decodeCategory,
} from '../../model';

export const upsertCategory = (
  category: Category
): Promise<DBHelperResponse<boolean>> => {
  return DBCategory.findByIdAndUpdate(
    category.id ?? new mongo.ObjectId(), //
    category,
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
          message: error.toString(),
        },
        result: null,
      };
    });
};

export const fetchCategories = (): Promise<
  DBHelperResponse<Array<Category>>
> => {
  return DBCategory.find({})
    .populate('parent')
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
          message: error.toString(),
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
          message: error.toString(),
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
          message: error.toString(),
        },
        result: null,
      };
    });
};
