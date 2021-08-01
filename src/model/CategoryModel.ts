import { Schema, Types, model } from 'mongoose';

const categorySchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
  parent: { type: Types.ObjectId, ref: 'Category' },
});

const Category = model('Category', categorySchema, 'categories');

export { categorySchema, Category };
